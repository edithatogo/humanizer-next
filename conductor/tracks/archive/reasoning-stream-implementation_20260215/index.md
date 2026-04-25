# Track reasoning-stream-implementation_20260215 Context

- [Specification](./spec.md)
- [Implementation Plan](./plan.md)
- [Metadata](./metadata.json)

## Status: `blocked` | Priority: P0 | Dependencies: reasoning-failures-stream

## Summary

Productize reasoning stream - source fragments to adapters, regression safety, build integration, adapter validation.

## Blocked By

- reasoning-failures-stream_20260215 (requires: taxonomy, evidence schema, source fragments)

## Unblocks

- conductor-humanizer-templates_20260215 (stream must exist)
- systematic-refactor-hardening_20260215 (hotspot discovery needs new code)

## Required Inputs (from reasoning-failures-stream)

- `archive/sources_manifest.json`
- `docs/reasoning-failures-taxonomy.md`
- `src/reasoning-stream/*.md` source fragments
- `scripts/research/citation-normalize.js`

## Key Outputs

- Compiled adapters with reasoning stream included (all 6 adapters)
- `docs/operator-guide-streams.md` - usage guidance
- Updated `CHANGELOG.md` with stream introduction
- `scripts/validate-adapters.sh` - CI adapter validation (new)
- `.github/workflows/` adapter validation job (new)

## Risk Highlights

- Adapter inconsistency → explicit adapter validation task in plan
