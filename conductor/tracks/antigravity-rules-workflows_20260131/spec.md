# Spec: Create Google Antigravity rules/workflows adapter guidance for Humanizer

## Overview
Provide Antigravity rule and workflow scaffolding so Humanizer guidance can be applied via always-on rules and user-triggered workflows, without altering the canonical SKILL.md.

## References
- http://codelabs.developers.google.com/getting-started-google-antigravity#8

## Requirements
- Keep SKILL.md unchanged and canonical.
- Add rule/workflow guidance and example files aligned with Antigravity locations.
- Provide adapter metadata: SKILL.md version reference and last synced date.
- Include instructions for global vs workspace rule/workflow placement.
- Preserve technical literals in adapter guidance.

## Acceptance Criteria
- Repository includes example rule/workflow files or templates ready to copy into Antigravity locations.
- Documentation explains how to enable rules and workflows in workspace and global contexts.
- Adapter metadata references the SKILL.md version and last synced date.

## Out of Scope
- Changing SKILL.md contents.
- Automatic installation scripts.
