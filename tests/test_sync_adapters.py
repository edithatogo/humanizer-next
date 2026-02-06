# ruff: noqa: S101, PLR2004
"""Tests for the sync_adapters script."""

from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

from scripts.sync_adapters import (
    get_skill_metadata,
    main,
    sync_antigravity_skill,
    update_metadata,
)


@pytest.fixture
def temp_skill_file(tmp_path: Path) -> Path:
    """Create a temporary SKILL.md file with name/version metadata."""
    skill_file = tmp_path / "SKILL.md"
    skill_file.write_text("name: humanizer\nversion: 1.2.3\nSome content", encoding="utf-8")
    return skill_file


def test_get_skill_metadata_success(temp_skill_file: Path) -> None:
    """Verify that name/version are correctly extracted from the skill file."""
    assert get_skill_metadata(temp_skill_file) == ("humanizer", "1.2.3")


def test_get_skill_metadata_not_found() -> None:
    """Verify that FileNotFoundError is raised when the skill file is missing."""
    with pytest.raises(FileNotFoundError, match=r"Source file .* not found!"):
        get_skill_metadata(Path("nonexistent.md"))


def test_get_skill_metadata_invalid_format(tmp_path: Path) -> None:
    """Verify that ValueError is raised when the metadata format is invalid."""
    skill_file = tmp_path / "SKILL_invalid.md"
    skill_file.write_text("no version here", encoding="utf-8")
    with pytest.raises(ValueError, match="Could not parse name/version from"):
        get_skill_metadata(skill_file)


def test_sync_antigravity_skill(tmp_path: Path) -> None:
    """Verify that the Antigravity skill adapter is synced correctly."""
    source = tmp_path / "SKILL.md"
    source.write_text(
        "---\nname: humanizer\nversion: 1.2.3\n---\noriginal content",
        encoding="utf-8",
    )
    dest = tmp_path / "dest" / "SKILL.md"

    sync_antigravity_skill(
        source, dest, "humanizer", "1.2.3", "2026-01-31", "antigravity-skill"
    )

    assert dest.exists()
    content = dest.read_text(encoding="utf-8")
    assert "adapter_metadata:" in content
    assert "skill_version: 1.2.3" in content
    assert "last_synced: 2026-01-31" in content
    assert "original content" in content


def test_update_metadata_success(tmp_path: Path) -> None:
    """Verify that metadata is updated in an existing adapter file."""
    dest = tmp_path / "ADAPTER.md"
    dest.write_text(
        "skill_version: 0.0.0\nlast_synced: 2000-01-01\nOther text", encoding="utf-8"
    )

    update_metadata(dest, "1.2.3", "2026-01-31")

    content = dest.read_text(encoding="utf-8")
    assert "skill_version: 1.2.3" in content
    assert "last_synced: 2026-01-31" in content
    assert "Other text" in content


def test_update_metadata_not_found(caplog: pytest.LogCaptureFixture) -> None:
    """Verify that a warning is logged when the adapter file to update is missing."""
    caplog.set_level("WARNING")
    update_metadata(Path("nonexistent.md"), "1.2.3", "2026-01-31")
    assert "Warning: nonexistent.md not found." in caplog.text


@patch("scripts.sync_adapters.argparse.ArgumentParser.parse_args")
@patch("scripts.sync_adapters.get_skill_metadata")
@patch("scripts.sync_adapters.sync_antigravity_skill")
@patch("scripts.sync_adapters.update_metadata")
def test_main_success(
    mock_update: MagicMock,
    mock_sync: MagicMock,
    mock_get_metadata: MagicMock,
    mock_parse_args: MagicMock,
) -> None:
    """Verify the main sync flow."""
    mock_parse_args.return_value = MagicMock(source=Path("SKILL.md"))
    mock_get_metadata.side_effect = [("humanizer", "1.2.3"), ("humanizer-pro", "2.3.4")]

    main()

    mock_get_metadata.assert_called()
    assert mock_sync.call_count == 2
    assert mock_update.call_count == 6


@patch("scripts.sync_adapters.argparse.ArgumentParser.parse_args")
@patch("scripts.sync_adapters.get_skill_metadata")
def test_main_error(
    mock_get_metadata: MagicMock,
    mock_parse_args: MagicMock,
    caplog: pytest.LogCaptureFixture,
) -> None:
    """Verify that errors during version extraction are logged."""
    caplog.set_level("ERROR")
    mock_parse_args.return_value = MagicMock(source=Path("SKILL.md"))
    mock_get_metadata.side_effect = ValueError("Test Error")

    with pytest.raises(SystemExit) as excinfo:
        main()
    assert excinfo.value.code == 1
    assert "Error: Test Error" in caplog.text
