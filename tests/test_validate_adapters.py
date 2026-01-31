# ruff: noqa: S101, PLR2004
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

from scripts.validate_adapters import (
    get_skill_metadata,
    main,
    validate_adapter,
)


@pytest.fixture
def mock_skill_file(tmp_path: Path) -> Path:
    skill_file = tmp_path / "SKILL.md"
    skill_file.write_text("name: humanizer\nversion: 1.2.3\n", encoding="utf-8")
    return skill_file


def test_get_skill_metadata_success(mock_skill_file: Path) -> None:
    name, version = get_skill_metadata(mock_skill_file)
    assert name == "humanizer"
    assert version == "1.2.3"


def test_get_skill_metadata_not_found() -> None:
    with pytest.raises(FileNotFoundError, match=r"Source file .* not found!"):
        get_skill_metadata(Path("nonexistent.md"))


def test_get_skill_metadata_missing_fields(tmp_path: Path) -> None:
    skill_file = tmp_path / "SKILL_bad.md"
    skill_file.write_text("nothing here", encoding="utf-8")
    with pytest.raises(ValueError, match="Failed to read name/version from"):
        get_skill_metadata(skill_file)


def test_validate_adapter_success(tmp_path: Path) -> None:
    adapter = tmp_path / "ADAPTER.md"
    adapter_content = (
        "skill_name: humanizer\n"
        "skill_version: 1.2.3\n"
        "last_synced: 2026-01-31\n"
        "source_path: SKILL.md"
    )
    adapter.write_text(adapter_content, encoding="utf-8")
    errors = validate_adapter(adapter, "humanizer", "1.2.3", "SKILL.md")
    assert not errors


def test_validate_adapter_failures(tmp_path: Path) -> None:
    adapter = tmp_path / "ADAPTER.md"
    adapter.write_text(
        "skill_name: wrong\nskill_version: 0.0.0\nsource_path: WRONG.md",
        encoding="utf-8",
    )
    errors = validate_adapter(adapter, "humanizer", "1.2.3", "SKILL.md")
    assert len(errors) == 4
    assert any("skill_name mismatch" in e for e in errors)
    assert any("skill_version mismatch" in e for e in errors)
    assert any("missing last_synced" in e for e in errors)
    assert any("source_path mismatch" in e for e in errors)


def test_validate_adapter_missing() -> None:
    errors = validate_adapter(Path("missing.md"), "n", "v", "s")
    assert errors == ["Missing adapter file: missing.md"]


@patch("scripts.validate_adapters.get_skill_metadata")
@patch("scripts.validate_adapters.validate_adapter")
def test_main_success(
    mock_validate: MagicMock,
    mock_get_meta: MagicMock,
    caplog: pytest.LogCaptureFixture,
) -> None:
    caplog.set_level("INFO")
    mock_get_meta.return_value = ("humanizer", "1.2.3")
    mock_validate.return_value = []

    with patch(
        "scripts.validate_adapters.argparse.ArgumentParser.parse_args"
    ) as mock_args:
        mock_args.return_value = MagicMock(source=Path("SKILL.md"))
        with pytest.raises(SystemExit) as excinfo:
            main()
        assert excinfo.value.code == 0

    assert "Adapter metadata validated" in caplog.text


@patch("scripts.validate_adapters.get_skill_metadata")
@patch("scripts.validate_adapters.validate_adapter")
def test_main_failure(
    mock_validate: MagicMock,
    mock_get_meta: MagicMock,
    caplog: pytest.LogCaptureFixture,
) -> None:
    mock_get_meta.return_value = ("humanizer", "1.2.3")
    mock_validate.return_value = ["Error 1", "Error 2"]

    with patch(
        "scripts.validate_adapters.argparse.ArgumentParser.parse_args"
    ) as mock_args:
        mock_args.return_value = MagicMock(source=Path("SKILL.md"))
        with pytest.raises(SystemExit) as excinfo:
            main()
        assert excinfo.value.code == 1

    assert "Error 1" in caplog.text
    assert "Error 2" in caplog.text


@patch("scripts.validate_adapters.get_skill_metadata")
def test_main_source_not_found(
    mock_get_meta: MagicMock,
    caplog: pytest.LogCaptureFixture,
) -> None:
    mock_get_meta.side_effect = FileNotFoundError("Missing file")

    with patch(
        "scripts.validate_adapters.argparse.ArgumentParser.parse_args"
    ) as mock_args:
        mock_args.return_value = MagicMock(source=Path("SKILL.md"))
        with pytest.raises(SystemExit) as excinfo:
            main()
        assert excinfo.value.code == 1

    assert "Error: Missing file" in caplog.text

