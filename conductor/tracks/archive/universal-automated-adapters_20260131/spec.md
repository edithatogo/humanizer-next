# Spec: Universal Automated Adapters

## Overview

Ensure all Humanizer adapters align with tool-specific requirements and automate their synchronization and local installation. Specifically, extend automation to Qwen CLI and GitHub Copilot.

## Requirements

- **Alignment:**
  - Gemini CLI: `gemini-extension.json`, `GEMINI.md`.
  - Antigravity: `.agent/skills/`, `.agent/rules/`, `.agent/workflows/`.
  - VS Code: `.vscode/*.code-snippets`.
  - Qwen CLI: `QWEN.md` in root.
  - Copilot: `.github/copilot-instructions.md`.
- **Automation:**
  - `scripts/sync-adapters.ps1`: Propagate version/date to ALL adapters.
  - `scripts/install-adapters.ps1`: Install ALL adapters to their respective local/workspace locations.
  - `scripts/validate-adapters.ps1`: Verify metadata alignment across ALL adapters.

## Acceptance Criteria

- Running `sync-adapters` updates all 6+ adapter metadata blocks.
- Running `install-adapters` correctly places files in the workspace (Antigravity, VS Code, Qwen, Copilot) and user directory (Gemini).
- `validate-adapters` passes for all adapters.
