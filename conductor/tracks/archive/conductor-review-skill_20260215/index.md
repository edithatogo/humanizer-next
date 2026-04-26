# Track conductor-review-skill_20260215 Context

- [Specification](./spec.md)
- [Implementation Plan](./plan.md)
- [Metadata](./metadata.json)

## Status: `blocked` | Priority: P1 | Dependencies: reasoning-failures-stream

## Summary

Humanizer review skill - severity-ordered findings (P0-P3), citation/taxonomy checks, quick/deep review modes.

## Blocked By

- reasoning-failures-stream_20260215 (requires: taxonomy schema, citation model)

## Unblocks

- conductor-humanizer-templates_20260215 (review integration)

## Required Inputs (from reasoning-failures-stream)

- `docs/reasoning-failures-taxonomy.md` (category schema for checks)
- `docs/editorial-policy.md` (boundary rules)
- `scripts/research/citation-normalize.js` (citation validation)

## Key Outputs

- `src/review/*.md` - review skill source
- `tests/fixtures/reasoning-failures/` - test corpus covering all taxonomy categories
- `docs/review-integration-guide.md` - for templates track

## Risk Highlights

- High false positive rate → test fixture corpus with known-good/bad examples; < 10% FP target
