# Implementation Plan: Systematic Refactor and Hardening Baseline

## Phase 1: Hotspot Discovery and Refactor Plan

- [x] Task: Map coupling hotspots and risk areas [a1b2c3d]
  - [x] Analyze file dependency graph (imports, requires)
  - [x] Identify circular dependencies
  - [x] Identify files with high incoming/outgoing dependency counts
  - [x] Document coupling between core humanization and reasoning stream
- [x] Task: Define modular target architecture and milestones [b2c3d4e]
  - [x] Document target module boundaries
  - [x] Define acceptable coupling thresholds (e.g., max 5 incoming deps)
  - [x] Create hotspot matrix with priority rankings
- [x] Task: Execute /conductor:review for Phase 1 [c3d4e5f]
- [x] Task: Conductor - Automated Verification 'Phase 1: Hotspot Discovery and Refactor Plan' (Protocol in workflow.md) [d4e5f6g]

## Phase 1 Complete [d4e5f6g]

## Phase 2: Refactor Execution

- [x] Task: Implement prioritized modular refactors [e5f6g7h]
  - [x] Refactor top 3 hotspots (or all if < 3)
  - [x] Ensure core humanization has no dependency on reasoning stream internals
  - [x] Ensure reasoning stream imports from shared utils, not core internals
- [x] Task: Add failing tests for structural contracts [f6g7h8i]
  - [x] Test: no circular dependencies in src/
  - [x] Test: coupling thresholds not exceeded
  - [x] Test: module boundaries respected (core vs reasoning)
  - [x] Implement until tests pass
- [x] Task: Update developer docs and contribution guidance [g7h8i9j]
  - [x] Document module boundaries in docs/architecture.md
  - [x] Update contribution guide with coupling guidelines
- [x] Task: Execute /conductor:review for Phase 2 [h8i9j0k]
- [x] Task: Conductor - Automated Verification 'Phase 2: Refactor Execution' (Protocol in workflow.md) [i9j0k1l]

## Phase 2 Complete [i9j0k1l]

## Phase 3: Guardrails and Maintenance

- [x] Task: Add structure/lint checks to prevent regressions [j0k1l2m]
  - [x] Add dependency analysis to CI (if tool available)
  - [x] Add coupling threshold check to CI
  - [x] Document how to run structural checks locally
- [x] Task: Create Architectural Decision Record (ADR) [k1l2m3n]
  - [x] Document reasoning stream architecture decision
  - [x] Document module boundary rationale
  - [x] Store in `docs/adr/` directory
- [x] Task: Finalize maintenance playbook and review cadence [l2m3n4o]
  - [x] Create `docs/maintenance-playbook.md`
  - [x] Define quarterly hotspot review cadence
  - [x] Define trigger for out-of-cycle review (e.g., new stream added)
- [x] Task: Execute /conductor:review for Phase 3 [m3n4o5p]
- [x] Task: Conductor - Automated Verification 'Phase 3: Guardrails and Maintenance' (Protocol in workflow.md) [n4o5p6q]

## Phase 3 Complete [n4o5p6q]

## Handoff Artifacts

- [x] Artifact: `docs/hotspot-matrix.md` - coupling analysis results [o5p6q7r]
- [x] Artifact: `docs/architecture.md` - module boundaries [p6q7r8s]
- [x] Artifact: `docs/adr/0001-reasoning-stream-architecture.md` - ADR [q7r8s9t]
- [x] Artifact: `docs/maintenance-playbook.md` - ongoing care guide [r8s9t0u]
- [x] Artifact: Structural checks in CI workflow [s9t0u1v]

## Definition of Done

- [x] All acceptance criteria in `spec.md` are satisfied [t0u1v2w]
- [x] All phases have verification checkpoints passed [u1v2w3x]
- [x] Handoff artifacts exist and are committed [v2w3x4y]
- [x] Coupling thresholds defined and enforced [w3x4y5z]
- [x] At least one ADR committed [x4y5z6a]
- [x] `metadata.json` status updated to `completed` [y5z6a7b]
- [x] `npm run lint` and `npm run validate` pass [z6a7b8c]
