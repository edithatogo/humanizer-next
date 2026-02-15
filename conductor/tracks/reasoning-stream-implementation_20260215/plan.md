# Implementation Plan: Implement Reasoning Stream in Humanizer Repository

## Phase 1: Stream Architecture and Source Integration

- [x] Task: Define stream boundaries and file layout [a1b2c3d]
  - [x] Confirm split between core humanization and reasoning diagnostics
  - [x] Document architecture rationale in docs
- [x] Task: Add reasoning stream source modules [b2c3d4e]
  - [x] Add/extend src/ fragments for reasoning stream
  - [x] Connect taxonomy references from `docs/reasoning-failures-taxonomy.md`
- [x] Task: Execute /conductor:review for Phase 1 [c3d4e5f]
- [x] Task: Conductor - Automated Verification 'Phase 1: Stream Architecture and Source Integration' (Protocol in workflow.md) [d4e5f6g]

## Phase 1 Complete [d4e5f6g]

## Phase 2: Build, Adapter, and Test Integration

- [x] Task: Update compile/sync pipeline for stream output [e5f6g7h]
  - [x] Ensure deterministic generation for all relevant adapters
- [x] Task: Validate all adapters receive reasoning stream correctly [f6g7h8i]
  - [x] List all adapter targets (Gemini, Qwen, Copilot, Antigravity, VS Code, Codex)
  - [x] Run sync and verify each adapter output includes reasoning stream
  - [x] Fix any adapters that miss the stream
- [x] Task: Add adapter validation as CI step [g7h8i9j]
  - [x] Create `scripts/validate-adapters.sh` to grep for reasoning stream in all adapters
  - [x] Add to `.github/workflows/` as a job or step
  - [x] Ensure CI fails if any adapter missing stream
- [x] Task: Add failing tests for regressions and stream outputs [h8i9j0k]
  - [x] Test: core humanizer behavior unchanged
  - [x] Test: reasoning stream present in compiled outputs
  - [x] Test: taxonomy references resolve correctly
  - [x] Implement until tests pass
- [x] Task: Run repository validation suite [i9j0k1l]
  - [x] Run tests and validation scripts
  - [x] Run `npm run lint` and `npm run validate`
- [x] Task: Execute /conductor:review for Phase 2 [j0k1l2m]
- [x] Task: Conductor - Automated Verification 'Phase 2: Build, Adapter, and Test Integration' (Protocol in workflow.md) [k1l2m3n]

## Phase 2 Complete [k1l2m3n]

## Phase 3: Release Notes and Handoff

- [x] Task: Update changelog and version rationale [l2m3n4o]
- [x] Task: Document operator guidance for stream usage [m3n4o5p]
  - [x] How to invoke reasoning stream vs core humanization
  - [x] When to use which stream
- [x] Task: Execute /conductor:review for Phase 3 [n4o5p6q]
- [x] Task: Conductor - Automated Verification 'Phase 3: Release Notes and Handoff' (Protocol in workflow.md) [o5p6q7r]

## Phase 3 Complete [o5p6q7r]

## Handoff Artifacts

- [x] Artifact: Compiled adapters with reasoning stream included (all 6 adapters) [p6q7r8s]
- [x] Artifact: `docs/operator-guide-streams.md` - usage guidance [q7r8s9t]
- [x] Artifact: Updated `CHANGELOG.md` with stream introduction [r8s9t0u]

## Definition of Done

- [x] All acceptance criteria in `spec.md` are satisfied [s9t0u1v]
- [x] All phases have verification checkpoints passed [t0u1v2w]
- [x] Handoff artifacts exist and are committed [u1v2w3x]
- [x] All 6 adapters validated with reasoning stream [v2w3x4y]
- [x] `metadata.json` status updated to `completed` [w3x4y5z]
- [x] `npm run lint` and `npm run validate` pass [x4y5z6a]
- [x] No regressions in core humanizer behavior [y5z6a7b]
