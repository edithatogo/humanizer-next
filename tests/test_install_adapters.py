# ruff: noqa: S101, PLR2004, PLR0913
"""Tests for the install_adapters script."""

from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

from scripts.install_adapters import (
    install_file,
    main,
)


def test_install_file_success(tmp_path: Path) -> None:
    """Verify that a file is correctly copied to the destination."""
    source = tmp_path / "source.txt"
    source.write_text("content", encoding="utf-8")
    dest_dir = tmp_path / "dest"

    install_file(source, dest_dir, "installed.txt")

    dest_file = dest_dir / "installed.txt"
    assert dest_file.exists()
    assert dest_file.read_text(encoding="utf-8") == "content"


def test_install_file_source_missing(
    caplog: pytest.LogCaptureFixture, tmp_path: Path
) -> None:
    """Verify that a warning is logged when the source file is missing."""
    caplog.set_level("WARNING")
    install_file(Path("missing.txt"), tmp_path / "dest", "dest.txt")
    assert "Source not found: missing.txt" in caplog.text


@patch("scripts.install_adapters.subprocess.run")
@patch("scripts.install_adapters.shutil.copytree")
@patch("scripts.install_adapters.shutil.rmtree")
@patch("scripts.install_adapters.install_file")
@patch("scripts.install_adapters.Path.home")
@patch("scripts.install_adapters.Path.exists")
def test_main_success(
    mock_exists: MagicMock,
    mock_home: MagicMock,
    mock_install: MagicMock,
    mock_rmtree: MagicMock,
    mock_copytree: MagicMock,
    mock_run: MagicMock,
    tmp_path: Path,
) -> None:
    """Verify the main installation flow with successful validation."""
    mock_home.return_value = tmp_path / "home"
    mock_run.return_value = MagicMock(returncode=0)

    # 1. First run: all exist (covers rmtree call)
    mock_exists.return_value = True
    with patch("sys.argv", ["install_adapters.py", "--skip-validation"]):
        main()

    assert mock_install.call_count == 7
    mock_copytree.assert_called_once()
    mock_rmtree.assert_called_once()

    # 2. Second run: gemini_extensions doesn't exist (covers NO rmtree call)
    mock_rmtree.reset_mock()
    mock_copytree.reset_mock()
    mock_install.reset_mock()

    # source_gemini.exists() -> True, gemini_extensions.exists() -> False,
    # then 7 calls to install_file (each calling source.exists())
    mock_exists.side_effect = [True, False, True, True, True, True, True, True, True]
    with patch("sys.argv", ["install_adapters.py", "--skip-validation"]):
        main()

    assert mock_install.call_count == 7
    mock_copytree.assert_called_once()
    mock_rmtree.assert_not_called()


@patch("scripts.install_adapters.subprocess.run")
@patch("scripts.install_adapters.shutil.copytree")
@patch("scripts.install_adapters.shutil.rmtree")
@patch("scripts.install_adapters.install_file")
@patch("scripts.install_adapters.Path.home")
@patch("scripts.install_adapters.Path.exists")
def test_main_validation_success(
    mock_exists: MagicMock,
    mock_home: MagicMock,
    mock_install: MagicMock,
    mock_rmtree: MagicMock,
    mock_copytree: MagicMock,
    mock_run: MagicMock,
    tmp_path: Path,
) -> None:
    """Verify that validation runs and succeeds before installation."""
    mock_home.return_value = tmp_path / "home"
    mock_run.return_value = MagicMock(returncode=0)
    mock_exists.return_value = True

    with patch("sys.argv", ["install_adapters.py"]):
        main()

    assert mock_run.call_count == 1
    assert mock_install.call_count == 7
    mock_rmtree.assert_called_once()
    mock_copytree.assert_called_once()


@patch("scripts.install_adapters.Path.exists")
@patch("scripts.install_adapters.Path.home")
def test_main_gemini_missing(
    mock_home: MagicMock,
    mock_exists: MagicMock,
    caplog: pytest.LogCaptureFixture,
    tmp_path: Path,
) -> None:
    """Verify that a warning is logged if the Gemini source adapter is missing."""
    caplog.set_level("WARNING")
    mock_home.return_value = tmp_path / "home"
    # Return False for source_gemini.exists()
    mock_exists.return_value = False

    with (
        patch("sys.argv", ["install_adapters.py", "--skip-validation"]),
        patch("scripts.install_adapters.install_file"),
    ):
        main()

    assert "Source not found" in caplog.text


@patch("scripts.install_adapters.subprocess.run")
def test_main_validation_fails(
    mock_run: MagicMock, caplog: pytest.LogCaptureFixture
) -> None:
    """Verify that installation aborts if validation fails."""
    mock_run.return_value = MagicMock(returncode=1, stderr="Some error")

    with patch("sys.argv", ["install_adapters.py"]):
        with pytest.raises(SystemExit) as excinfo:
            main()
        assert excinfo.value.code == 1

    assert "Validation failed" in caplog.text
