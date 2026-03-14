"""Install generated Humanizer adapter files into local tool locations."""

from __future__ import annotations

import argparse
import logging
import shutil
import subprocess
import sys
from pathlib import Path

LOGGER = logging.getLogger(__name__)
ROOT_DIR = Path(__file__).resolve().parent.parent


def install_file(source: Path, destination_dir: Path, destination_name: str) -> None:
    """Copy a source file into a destination directory."""
    if not source.exists():
        LOGGER.warning("Source not found: %s", source)
        return

    destination_dir.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, destination_dir / destination_name)


def parse_args() -> argparse.Namespace:
    """Parse CLI arguments."""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--skip-validation",
        action="store_true",
        help="Skip adapter validation before installation.",
    )
    return parser.parse_args()


def run_validation() -> None:
    """Validate adapters before installation."""
    result = subprocess.run(  # noqa: S603
        [sys.executable, "-m", "scripts.validate_adapters"],
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        LOGGER.error("Validation failed: %s", result.stderr.strip() or "unknown error")
        raise SystemExit(1)


def main() -> None:
    """Install adapter files into local tool directories."""
    logging.basicConfig(level=logging.INFO)
    args = parse_args()

    if not args.skip_validation:
        run_validation()

    home = Path.home()
    source_gemini = ROOT_DIR / "adapters" / "gemini-extension"
    gemini_extensions = home / ".gemini" / "extensions" / "humanizer"

    if not source_gemini.exists():
        LOGGER.warning("Source not found: %s", source_gemini)
    else:
        if gemini_extensions.exists():
            shutil.rmtree(gemini_extensions)
        shutil.copytree(source_gemini, gemini_extensions)

    installs = [
        (
            ROOT_DIR / "adapters" / "antigravity-skill" / "SKILL.md",
            ROOT_DIR / ".agent" / "skills" / "humanizer",
            "SKILL.md",
        ),
        (
            ROOT_DIR / "adapters" / "antigravity-skill" / "SKILL_PROFESSIONAL.md",
            ROOT_DIR / ".agent" / "skills" / "humanizer",
            "SKILL_PROFESSIONAL.md",
        ),
        (
            ROOT_DIR / "adapters" / "qwen-cli" / "QWEN.md",
            home / ".qwen" / "extensions" / "humanizer",
            "QWEN.md",
        ),
        (
            ROOT_DIR / "adapters" / "codex" / "CODEX.md",
            home / ".codex" / "extensions" / "humanizer",
            "CODEX.md",
        ),
        (
            ROOT_DIR / "adapters" / "copilot" / "COPILOT.md",
            home / ".copilot" / "extensions" / "humanizer",
            "COPILOT.md",
        ),
        (ROOT_DIR / "adapters" / "vscode" / "HUMANIZER.md", ROOT_DIR / ".vscode", "HUMANIZER.md"),
        (
            ROOT_DIR / "adapters" / "opencode" / "SKILL.md",
            home / ".opencode" / "extensions" / "humanizer",
            "SKILL.md",
        ),
    ]

    for source, destination_dir, destination_name in installs:
        install_file(source, destination_dir, destination_name)


if __name__ == "__main__":
    main()
