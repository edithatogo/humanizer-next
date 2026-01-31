#!/usr/bin/env python3
"""Validate Humanizer adapters against the canonical SKILL.md."""

import argparse
import logging
import re
import sys
from pathlib import Path

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger(__name__)


def get_skill_metadata(source_path: Path) -> tuple[str, str]:
    """Extract name and version from the SKILL.md file."""
    if not source_path.exists():
        msg = f"Source file {source_path} not found!"
        raise FileNotFoundError(msg)

    content = source_path.read_text(encoding="utf-8")
    name_match = re.search(r"(?m)^name:\s*([\w.-]+)\s*$", content)
    version_match = re.search(r"(?m)^version:\s*([\w.-]+)\s*$", content)

    if not name_match or not version_match:
        msg = f"Failed to read name/version from {source_path}"
        raise ValueError(msg)

    return name_match.group(1), version_match.group(1)


def validate_adapter(
    adapter_path: Path, skill_name: str, skill_version: str, source_path: str
) -> list[str]:
    """Validate a single adapter file's metadata."""
    if not adapter_path.exists():
        return [f"Missing adapter file: {adapter_path}"]

    errors = []
    content = adapter_path.read_text(encoding="utf-8")

    if not re.search(rf"skill_name:\s*{re.escape(skill_name)}", content):
        errors.append(f"{adapter_path}: skill_name mismatch (expected {skill_name})")

    if not re.search(rf"skill_version:\s*{re.escape(skill_version)}", content):
        errors.append(
            f"{adapter_path}: skill_version mismatch (expected {skill_version})"
        )

    if "last_synced:" not in content:
        errors.append(f"{adapter_path}: missing last_synced")

    if not re.search(rf"source_path:\s*{re.escape(source_path)}", content):
        errors.append(f"{adapter_path}: source_path mismatch (expected {source_path})")

    return errors


def main() -> None:
    """Run the validation script."""
    parser = argparse.ArgumentParser(description="Validate Humanizer adapters.")
    parser.add_argument(
        "--source",
        type=Path,
        default=Path("SKILL.md"),
        help="Path to the canonical SKILL.md",
    )
    args = parser.parse_args()

    source_path = args.source
    try:
        skill_name, skill_version = get_skill_metadata(source_path)
    except (FileNotFoundError, ValueError) as e:
        logger.error("Error: %s", e)  # noqa: TRY400
        sys.exit(1)

    adapters = [
        "AGENTS.md",
        "adapters/gemini-extension/GEMINI.md",
        "adapters/vscode/HUMANIZER.md",
        "adapters/antigravity-skill/SKILL.md",
        "adapters/antigravity-rules-workflows/README.md",
        "adapters/qwen-cli/QWEN.md",
        "adapters/copilot/COPILOT.md",
    ]

    all_errors = []
    root = Path(__file__).parent.parent
    for adapter_rel_path in adapters:
        adapter_path = root / adapter_rel_path
        all_errors.extend(
            validate_adapter(adapter_path, skill_name, skill_version, str(source_path))
        )

    if all_errors:
        for error in all_errors:
            logger.error("%s", error)
        sys.exit(1)

    logger.info(
        "Adapter metadata validated against %s (%s %s).",
        source_path,
        skill_name,
        skill_version,
    )
    sys.exit(0)


if __name__ == "__main__":
    main()
