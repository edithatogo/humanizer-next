# Spec: Create a Google Antigravity skill adapter for Humanizer

## Overview
Create a Google Antigravity skill package that references the existing Humanizer SKILL.md as canonical guidance, without modifying it. The skill should be installable at the workspace level and documented for users.

## References
- https://codelabs.developers.google.com/getting-started-with-antigravity-skills#9

## Requirements
- Keep SKILL.md unchanged and canonical.
- Add an Antigravity skill directory with required files and optional supporting assets/scripts.
- Provide adapter metadata: SKILL.md version reference and last synced date.
- Include instructions for workspace installation location.
- Preserve technical literals in adapter guidance.

## Acceptance Criteria
- Repository includes an Antigravity skill package that can be copied into a workspace skill directory.
- Documentation shows how to enable and use the skill.
- Adapter metadata references the SKILL.md version and last synced date.

## Out of Scope
- Changing SKILL.md contents.
- Publishing outside the repo.
