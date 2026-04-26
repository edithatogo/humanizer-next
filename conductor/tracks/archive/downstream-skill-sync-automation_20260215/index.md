# Track downstream-skill-sync-automation_20260215 Context

- [Specification](./spec.md)
- [Implementation Plan](./plan.md)
- [Metadata](./metadata.json)

## Status: `blocked` | Priority: P2 | Dependencies: repo-hardening-release-ops

## Summary

Auto-sync downstream repos after version updates - inventory, trigger model, dry-run support, rollback capability.

## Blocked By

- repo-hardening-release-ops_20260215 (requires: release policy, version tags, breaking change checklist)

## Required Inputs

- `docs/release-policy.md` (trigger strategy)
- `docs/breaking-change-checklist.md` (halt on semver-major)
- Version tag schema (from release ops)

## Key Outputs

- `docs/downstream-inventory.md` - target catalog
- `.github/workflows/sync-downstream.yml` - automation with failure notification
- `docs/sync-rollback.md` - rollback procedure
- `scripts/validate-sync-targets.sh` - target health check (new)

## Risk Highlights

- Sync fails mid-way → per-target rollback; dry-run first
- Breaking change propagated → breaking change detection halts sync
