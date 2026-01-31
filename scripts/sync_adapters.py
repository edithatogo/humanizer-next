#!/usr/bin/env python3
"""Sync Humanizer adapters with the canonical SKILL.md."""

import argparse
import logging
import re
from datetime import datetime, timezone
from pathlib import Path

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger(__name__)


def get_skill_version(source_path: Path) -> str:
    """Extract the version from the SKILL.md file."""
    if not source_path.exists():
        msg = f"Source file {source_path} not found!"
        raise FileNotFoundError(msg)

    content = source_path.read_text(encoding="utf-8")
    match = re.search(r"(?m)^version:\s*([\w.-]+)\s*$", content)
    if not match:
        msg = f"Could not parse version from {source_path}"
        raise ValueError(msg)

    return match.group(1)


def sync_antigravity_skill(
    source_path: Path, dest_path: Path, version: str, today: str
) -> None:
    """Sync Antigravity Skill (Full Content Copy + Metadata Injection)."""
    logger.info("Syncing Antigravity Skill to %s...", dest_path)
    source_content = source_path.read_text(encoding="utf-8")

    frontmatter = f"""---
adapter_metadata:
  skill_name: humanizer
  skill_version: {version}
  last_synced: {today}
  source_path: {source_path.name}
  adapter_id: antigravity-skill
  adapter_format: Antigravity skill
---

"""
    new_content = frontmatter + source_content
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    dest_path.write_text(new_content, encoding="utf-8", newline="\n")
    logger.info("Updated %s", dest_path)


def update_metadata(dest_path: Path, version: str, today: str) -> None:
    """Update metadata (Version/Date only) in an adapter file."""
    if not dest_path.exists():
        logger.warning("Warning: %s not found.", dest_path)
        return

    logger.info("Updating metadata in %s...", dest_path)
    content = dest_path.read_text(encoding="utf-8")
    content = re.sub(r"skill_version:.*", f"skill_version: {version}", content)
    content = re.sub(r"last_synced:.*", f"last_synced: {today}", content)
    dest_path.write_text(content, encoding="utf-8", newline="\n")
    logger.info("Updated %s", dest_path)


def main() -> None:
    """Run the sync script."""
    parser = argparse.ArgumentParser(description="Sync Humanizer adapters.")
    parser.add_argument(
        "--source",
        type=Path,
        default=Path("SKILL.md"),
        help="Path to the canonical SKILL.md",
    )
    args = parser.parse_args()

    source_path = args.source
    try:
        version = get_skill_version(source_path)
    except (FileNotFoundError, ValueError) as e:
        logger.error("Error: %s", e)  # noqa: TRY400
        return

    today = datetime.now(tz=timezone.utc).strftime("%Y-%m-%d")

    logger.info("Detected Version: %s", version)
    logger.info("Sync Date: %s", today)

    # Define paths
    root = Path(__file__).parent.parent
    adapters = root / "adapters"

    # 1. Antigravity Skill
    sync_antigravity_skill(
        source_path, adapters / "antigravity-skill" / "SKILL.md", version, today
    )

    # 2. Gemini Extension
    update_metadata(adapters / "gemini-extension" / "GEMINI.md", version, today)

    # 3. Antigravity Rules Metadata
    update_metadata(
        adapters / "antigravity-rules-workflows" / "README.md", version, today
    )

    # 4. Qwen CLI Metadata
    update_metadata(adapters / "qwen-cli" / "QWEN.md", version, today)

    # 5. Copilot Metadata
    update_metadata(adapters / "copilot" / "COPILOT.md", version, today)

    # 6. VS Code Metadata
    update_metadata(adapters / "vscode" / "HUMANIZER.md", version, today)

    logger.info("Sync Complete.")


if __name__ == "__main__":
    main()
