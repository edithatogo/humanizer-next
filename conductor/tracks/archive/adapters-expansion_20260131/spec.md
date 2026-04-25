# Spec: Expand Humanizer adapters to Qwen CLI and Copilot

## Overview

Add adapters for Qwen CLI and GitHub Copilot to allow Humanizer usage in those environments. These adapters will follow the existing abstraction pattern, referencing the canonical `SKILL.md`.

## Requirements

- Create `adapters/qwen-cli/QWEN.md` with appropriate instructions and metadata.
- Create `adapters/copilot/COPILOT.md` with appropriate instructions and metadata.
- Update `scripts/sync-adapters.ps1` to auto-sync content/metadata to these new adapters.
- Update `scripts/validate-adapters.ps1` to include these new adapters in validation.
- Update `README.md` with usage instructions for Qwen and Copilot.

## Acceptance Criteria

- New adapter files exist and contain valid metadata pointing to `SKILL.md`.
- `sync-adapters` script successfully updates these files.
- `validate-adapters` script passes when run.
- `README.md` documents the new adapters.
