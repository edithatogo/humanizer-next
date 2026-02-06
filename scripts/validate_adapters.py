#!/usr/bin/env python3
"""Validate Humanizer adapters against the canonical SKILL.md."""

import argparse
import logging
import re
import sys
from datetime import datetime
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

    if not re.search(
        rf"(?m)^\s*skill_name:\s*{re.escape(skill_name)}\s*$", content
    ):
        errors.append(f"{adapter_path}: skill_name mismatch (expected {skill_name})")

    if not re.search(
        rf"(?m)^\s*skill_version:\s*{re.escape(skill_version)}\s*$", content
    ):
        errors.append(
            f"{adapter_path}: skill_version mismatch (expected {skill_version})"
        )

    last_synced_match = re.search(
        r"(?m)^\s*last_synced:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})\s*$", content
    )
    if not last_synced_match:
        errors.append(f"{adapter_path}: missing or invalid last_synced")
    else:
        try:
            datetime.strptime(last_synced_match.group(1), "%Y-%m-%d")
        except ValueError:
            errors.append(f"{adapter_path}: invalid last_synced date")

    if not re.search(
        rf"(?m)^\s*source_path:\s*{re.escape(source_path)}\s*$", content
    ):
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

    root = Path(__file__).parent.parent
    source_path = args.source
    if not source_path.is_absolute():
        source_path = root / source_path
    try:
        skill_name, skill_version = get_skill_metadata(source_path)
    except (FileNotFoundError, ValueError) as e:
        logger.error("Error: %s", e)  # noqa: TRY400
        sys.exit(1)

    pro_path = root / "SKILL_PROFESSIONAL.md"
    try:
        pro_name, pro_version = get_skill_metadata(pro_path)
    except (FileNotFoundError, ValueError) as e:
        logger.error("Error: %s", e)  # noqa: TRY400
        sys.exit(1)

    adapters = [
        {"path": "AGENTS.md", "meta": (skill_name, skill_version), "source": source_path.name},
        {
            "path": "adapters/antigravity-skill/SKILL.md",
            "meta": (skill_name, skill_version),
            "source": source_path.name,
        },
        {
            "path": "adapters/antigravity-skill/SKILL_PROFESSIONAL.md",
            "meta": (pro_name, pro_version),
            "source": pro_path.name,
        },
        {
            "path": "adapters/gemini-extension/GEMINI.md",
            "meta": (skill_name, skill_version),
            "source": source_path.name,
        },
        {
            "path": "adapters/gemini-extension/GEMINI_PRO.md",
            "meta": (pro_name, pro_version),
            "source": pro_path.name,
        },
        {
            "path": "adapters/vscode/HUMANIZER.md",
            "meta": (skill_name, skill_version),
            "source": source_path.name,
        },
        {
            "path": "adapters/antigravity-rules-workflows/README.md",
            "meta": (skill_name, skill_version),
            "source": source_path.name,
        },
        {
            "path": "adapters/qwen-cli/QWEN.md",
            "meta": (skill_name, skill_version),
            "source": source_path.name,
        },
        {
            "path": "adapters/copilot/COPILOT.md",
            "meta": (skill_name, skill_version),
            "source": source_path.name,
        },
    ]

    all_errors = []
    for adapter in adapters:
        adapter_path = root / adapter["path"]
        name, version = adapter["meta"]
        all_errors.extend(
            validate_adapter(adapter_path, name, version, adapter["source"])
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
