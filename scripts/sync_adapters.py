#!/usr/bin/env python3
"""Sync Humanizer adapters with the canonical SKILL.md."""

import argparse
import logging
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger(__name__)


def get_skill_metadata(source_path: Path) -> tuple[str, str]:
    """Extract name and version from a skill file."""
    if not source_path.exists():
        msg = f"Source file {source_path} not found!"
        raise FileNotFoundError(msg)

    content = source_path.read_text(encoding="utf-8")
    name_match = re.search(r"(?m)^name:\s*([\w.-]+)\s*$", content)
    version_match = re.search(r"(?m)^version:\s*([\w.-]+)\s*$", content)
    if not name_match or not version_match:
        msg = f"Could not parse name/version from {source_path}"
        raise ValueError(msg)

    return name_match.group(1), version_match.group(1)


def merge_adapter_metadata(source_content: str, metadata_block: str) -> str:
    """Merge adapter metadata into the source frontmatter if present."""
    match = re.match(r"(?s)^---\n(.*?)\n---\n?", source_content)
    if not match:
        return f"---\n{metadata_block}\n---\n\n{source_content}"

    frontmatter = match.group(1)
    frontmatter = re.sub(
        r"(?ms)^adapter_metadata:\n(?:[ \t].*\n)*",
        "",
        frontmatter,
    ).strip()
    rest = source_content[match.end() :]
    merged = f"---\n{frontmatter}\n{metadata_block}\n---\n\n{rest}"
    return merged


def sync_antigravity_skill(
    source_path: Path,
    dest_path: Path,
    skill_name: str,
    version: str,
    today: str,
    adapter_id: str,
) -> None:
    """Sync Antigravity Skill (Full Content Copy + Metadata Injection)."""
    logger.info("Syncing Antigravity Skill to %s...", dest_path)
    source_content = source_path.read_text(encoding="utf-8")

    metadata_block = f"""adapter_metadata:
  skill_name: {skill_name}
  skill_version: {version}
  last_synced: {today}
  source_path: {source_path.name}
  adapter_id: {adapter_id}
  adapter_format: Antigravity skill"""
    new_content = merge_adapter_metadata(source_content, metadata_block)
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
    content, version_updates = re.subn(
        r"(?m)^\s*skill_version:\s*.*$",
        f"skill_version: {version}",
        content,
    )
    content, synced_updates = re.subn(
        r"(?m)^\s*last_synced:\s*.*$",
        f"last_synced: {today}",
        content,
    )
    if version_updates == 0 or synced_updates == 0:
        logger.warning("Metadata keys not found in %s", dest_path)
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

    root = Path(__file__).parent.parent
    source_path = args.source
    if not source_path.is_absolute():
        source_path = root / source_path
    pro_path = root / "SKILL_PROFESSIONAL.md"
    try:
        skill_name, version = get_skill_metadata(source_path)
        pro_name, pro_version = get_skill_metadata(pro_path)
    except (FileNotFoundError, ValueError) as e:
        logger.error("Error: %s", e)  # noqa: TRY400
        sys.exit(1)

    today = datetime.now(tz=timezone.utc).date().isoformat()

    logger.info("Detected Version: %s", version)
    logger.info("Sync Date: %s", today)

    # Define paths
    adapters = root / "adapters"

    # 1. Antigravity Skill
    sync_antigravity_skill(
        source_path,
        adapters / "antigravity-skill" / "SKILL.md",
        skill_name,
        version,
        today,
        "antigravity-skill",
    )
    sync_antigravity_skill(
        pro_path,
        adapters / "antigravity-skill" / "SKILL_PROFESSIONAL.md",
        pro_name,
        pro_version,
        today,
        "antigravity-skill-pro",
    )

    # 2. Gemini Extension
    update_metadata(adapters / "gemini-extension" / "GEMINI.md", version, today)
    update_metadata(
        adapters / "gemini-extension" / "GEMINI_PRO.md", pro_version, today
    )

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
