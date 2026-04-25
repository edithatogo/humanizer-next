# Track conductor-humanizer-templates_20260215 Context

- [Specification](./spec.md)
- [Implementation Plan](./plan.md)
- [Metadata](./metadata.json)

## Status: `blocked` | Priority: P1 | Dependencies: reasoning-stream-implementation, conductor-review-skill

## Summary

Conductor-compatible templates - style toggles (standard/pro), stream switches, review integration.

## Blocked By

- reasoning-stream-implementation_20260215 (stream must exist)
- conductor-review-skill_20260215 (review integration)

## Required Inputs

- Reasoning stream compiled outputs (from reasoning-stream-implementation)
- Review skill artifacts (from conductor-review-skill)
- `docs/operator-guide-streams.md` (from reasoning-stream-implementation)
- `docs/review-integration-guide.md` (from conductor-review-skill)

## Key Outputs

- Template files with configurable options
- Conductor adoption/runbook documentation
- Worked examples for common configurations
