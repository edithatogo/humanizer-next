# Implementation Plan: Create Humanizer Review Skill

## Phase 1: Review Skill Design

- [x] Task: Define review scope and output contract [a1b2c3d]
  - [x] Severity rubric (P0 critical, P1 major, P2 minor, P3 suggestion)
  - [x] Finding schema (file, line, category, severity, message, remediation)
  - [x] Required evidence/citation checks for reasoning-failure claims
- [x] Task: Draft skill prompt/behavior files [b2c3d4e]
  - [x] Define review SKILL.md structure
  - [x] Map taxonomy categories to review checks
- [x] Task: Create test fixture corpus [c3d4e5f]
  - [x] Add sample reasoning-failure examples in `tests/fixtures/reasoning-failures/`
  - [x] Include examples of each taxonomy category
  - [x] Include examples of citation quality issues
- [x] Task: Execute /conductor:review for Phase 1 [d4e5f6g]
- [x] Task: Conductor - Automated Verification 'Phase 1: Review Skill Design' (Protocol in workflow.md) [e5f6g7h]

## Phase 1 Complete [e5f6g7h]

## Phase 2: Implementation and Validation

- [x] Task: Implement review skill artifacts in repo structure [f6g7h8i]
  - [x] Add `src/review/` module or equivalent
  - [x] Wire to build/sync pipeline
- [x] Task: Add failing tests/fixtures for review outputs [g7h8i9j]
  - [x] Test: severity ordering is correct
  - [x] Test: taxonomy categories are detected
  - [x] Test: citation quality issues are flagged
  - [x] Test: false positive rate is acceptable
  - [x] Implement until tests pass
- [x] Task: Validate integration with existing adapters [h8i9j0k]
  - [x] Verify review skill is included in adapter outputs
  - [x] Test review behavior in at least one adapter environment
- [x] Task: Execute /conductor:review for Phase 2 [i9j0k1l]
- [x] Task: Conductor - Automated Verification 'Phase 2: Implementation and Validation' (Protocol in workflow.md) [j0k1l2m]

## Phase 2 Complete [j0k1l2m]

## Phase 3: Documentation and Handoff

- [x] Task: Add usage docs and examples [k1l2m3n]
  - [x] Document review command/skill invocation
  - [x] Add example output format
  - [x] Document integration with conductor workflows
- [x] Task: Add changelog/version updates [l2m3n4o]
- [x] Task: Create review integration guide for conductor-humanizer-templates [m3n4o5p]
- [x] Task: Execute /conductor:review for Phase 3 [n4o5p6q]
- [x] Task: Conductor - Automated Verification 'Phase 3: Documentation and Handoff' (Protocol in workflow.md) [o5p6q7r]

## Phase 3 Complete [o5p6q7r]

## Handoff Artifacts

- [x] Artifact: `src/review/*.md` - review skill source [p6q7r8s]
- [x] Artifact: `tests/fixtures/reasoning-failures/` - test corpus [q7r8s9t]
- [x] Artifact: `docs/review-integration-guide.md` - for templates track [r8s9t0u]

## Definition of Done

- [x] All acceptance criteria in `spec.md` are satisfied [s9t0u1v]
- [x] All phases have verification checkpoints passed [t0u1v2w]
- [x] Handoff artifacts exist and are committed [u1v2w3x]
- [x] False positive rate < 10% on test corpus [v2w3x4y]
- [x] `metadata.json` status updated to `completed` [w3x4y5z]
- [x] `npm run lint` and `npm run validate` pass [x4y5z6a]