# Track systematic-refactor-hardening_20260215 Context

- [Specification](./spec.md)
- [Implementation Plan](./plan.md)
- [Metadata](./metadata.json)

## Status: `blocked` | Priority: P2 | Dependencies: reasoning-stream-implementation

## Summary

Modular refactor baseline, hotspot discovery, coupling metrics, structural guardrails, maintenance playbook, ADRs.

## Blocked By

- reasoning-stream-implementation_20260215 (hotspot discovery requires new stream code)

## Required Inputs

- New reasoning-stream code (for coupling analysis)
- Compiled adapters (for consistency verification)

## Key Outputs

- Refactor plan and hotspot matrix
- Coupling metrics baseline
- Structural guardrails in CI
- `docs/maintenance-playbook.md`
- At least one ADR documenting stream architecture

## Risk Highlights

- Refactor scope creep → strict scope: only coupling between streams, not internal rewrites
