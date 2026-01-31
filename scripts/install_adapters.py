#!/usr/bin/env python3
"""Install Humanizer adapters into their respective locations."""

import argparse
import logging
import shutil
import subprocess
import sys
from pathlib import Path

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger(__name__)


def install_file(source: Path, dest_dir: Path, dest_name: str) -> None:
    """Create directories if needed and copy a file."""
    if not source.exists():
        logger.warning("Source not found: %s", source)
        return

    dest_dir.mkdir(parents=True, exist_ok=True)
    dest_path = dest_dir / dest_name
    shutil.copy2(source, dest_path)
    logger.info("Installed: %s", dest_path)


def main() -> None:
    """Run the installation script."""
    parser = argparse.ArgumentParser(description="Install Humanizer adapters.")
    parser.add_argument(
        "--skip-validation",
        action="store_true",
        help="Skip validation before installation",
    )
    args = parser.parse_args()

    root = Path(__file__).parent.parent
    scripts_dir = root / "scripts"

    # 1. Validate first (unless skipped)
    if not args.skip_validation:
        logger.info("Running validation before installation...")
        validate_script = scripts_dir / "validate_adapters.py"
        result = subprocess.run(  # noqa: S603
            [sys.executable, str(validate_script)],
            check=False,
            capture_output=True,
            text=True,
        )
        if result.returncode != 0:
            logger.error("Validation failed. Aborting installation.")
            logger.error(result.stderr)
            sys.exit(1)

    logger.info("Starting Universal Installation...")

    # 2. Gemini CLI Extension (User Dir)
    gemini_extensions = Path.home() / ".gemini" / "extensions" / "humanizer"
    logger.info("Installing Gemini CLI Extension...")
    source_gemini = root / "adapters" / "gemini-extension"
    if source_gemini.exists():
        if gemini_extensions.exists():
            shutil.rmtree(gemini_extensions)
        shutil.copytree(source_gemini, gemini_extensions)
        logger.info("Installed to: %s", gemini_extensions)
    else:
        logger.warning("Source not found: %s", source_gemini)

    # 3. Google Antigravity (Workspace)
    adapters = root / "adapters"
    install_file(
        adapters / "antigravity-skill" / "SKILL.md",
        root / ".agent" / "skills" / "humanizer",
        "SKILL.md",
    )
    install_file(
        adapters / "antigravity-skill" / "README.md",
        root / ".agent" / "skills" / "humanizer",
        "README.md",
    )
    install_file(
        adapters / "antigravity-rules-workflows" / "rules" / "humanizer.md",
        root / ".agent" / "rules",
        "humanizer.md",
    )
    install_file(
        adapters / "antigravity-rules-workflows" / "workflows" / "humanize.md",
        root / ".agent" / "workflows",
        "humanize.md",
    )

    # 4. VS Code (Workspace)
    install_file(
        adapters / "vscode" / "humanizer.code-snippets",
        root / ".vscode",
        "humanizer.code-snippets",
    )

    # 5. Qwen CLI (Root)
    install_file(adapters / "qwen-cli" / "QWEN.md", root, "QWEN.md")

    # 6. GitHub Copilot (Root .github)
    install_file(
        adapters / "copilot" / "COPILOT.md", root / ".github", "copilot-instructions.md"
    )

    logger.info("\nUniversal Installation Complete.")


if __name__ == "__main__":
    main()
