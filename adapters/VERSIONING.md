# Adapter Versioning

## Principles
- `SKILL.md` is the canonical source of truth.
- Adapter pack version tracks `SKILL.md` version (e.g., `2.1.1`).
- Each adapter includes metadata fields:
  - `skill_version` (must match `SKILL.md`)
  - `last_synced` (date the adapter was aligned)

## Release Guidance
- When `SKILL.md` changes, update all adapter metadata and set a new `last_synced` date.
- Run `scripts/validate-adapters.ps1` (or `scripts/validate-adapters.cmd`) before release.

## Adapter-Specific Versions
- Gemini extension manifest version can be incremented independently when packaging changes.
- Metadata must always match `SKILL.md` regardless of adapter package version.
