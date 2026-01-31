# Adapter Metadata Contract

## Purpose
Provide a consistent, machine-checkable metadata block for every adapter artifact derived from `SKILL.md`.

## Required Fields
- `skill_name`: Must match the `name` field in `SKILL.md`.
- `skill_version`: Must match the `version` field in `SKILL.md`.
- `last_synced`: ISO 8601 date (`YYYY-MM-DD`) indicating when the adapter was last aligned to `SKILL.md`.
- `source_path`: Relative path to the canonical `SKILL.md` used.

## Optional Fields
- `source_sha`: Git commit SHA where `SKILL.md` was last verified.
- `adapter_id`: Short identifier for the adapter (e.g., `codex-cli`, `gemini-extension`).
- `adapter_format`: Human-readable format label (e.g., `AGENTS.md`, `Gemini extension`, `Antigravity skill`).

## Example (YAML)
```yaml
adapter_metadata:
  skill_name: humanizer
  skill_version: 2.1.1
  last_synced: 2026-01-31
  source_path: SKILL.md
  source_sha: <git-sha>
  adapter_id: gemini-extension
  adapter_format: Gemini extension
```

## Validation Rules
- `skill_name` and `skill_version` must match the values in `SKILL.md`.
- `last_synced` must be a valid date.
- `source_path` must resolve to the repository `SKILL.md`.
