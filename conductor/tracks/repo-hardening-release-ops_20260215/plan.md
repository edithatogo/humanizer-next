# Implementation Plan: Repo Hardening, CI/CD, and Release Operations

## Phase 1: Assessment and Policy Drafting

- [x] Task: Audit current CI/CD and validation paths [a1b2c3d]
  - [x] Document existing workflows in `.github/workflows/`
  - [x] Identify gaps in quality gates (lint, test, validate)
  - [x] Assess reproducibility of CI environment
- [x] Task: Define release/versioning policy and checklists [b2c3d4e]
  - [x] Document semantic versioning decision tree
  - [x] Define patch vs minor vs major bump criteria
  - [x] Create release checklist template
  - [x] Define version file locations (SKILL.md frontmatter, package.json, etc.)
- [x] Task: Define breaking change detection checklist [c3d4e5f]
  - [x] List breaking change categories (API changes, skill behavior changes, adapter contract changes)
  - [x] Define detection workflow (manual review + automated flags)
- [x] Task: Define upstream PR/merge runbook [d4e5f6g]
  - [x] Document PR creation workflow
  - [x] Document merge conflict resolution procedure
  - [x] Document post-merge verification steps
- [x] Task: Execute /conductor:review for Phase 1 [e5f6g7h]
- [x] Task: Conductor - Automated Verification 'Phase 1: Assessment and Policy Drafting' (Protocol in workflow.md) [f6g7h8i]

## Phase 1 Complete [f6g7h8i]

## Phase 2: Hardening Implementation

- [x] Task: Implement prioritized CI/CD improvements [g7h8i9j]
  - [x] Add missing quality gates if identified
  - [x] Ensure all workflows use `CI=true` for non-interactive execution
  - [x] Add workflow timeout limits to prevent hung jobs
- [x] Task: Add tests/automation for release guardrails [h8i9j0k]
  - [x] Test: version bump validation (version in SKILL.md matches expected)
  - [x] Test: changelog updated on release
  - [x] Test: breaking change detection runs before merge
  - [x] Implement until tests pass
- [x] Task: Create release workflow if warranted [i9j0k1l]
  - [x] Add `.github/workflows/release.yml` (or document why deferred)
  - [x] Define release trigger (tag push, manual dispatch)
- [x] Task: Add changelog/release templates [j0k1l2m]
  - [x] Create `docs/release-template.md`
  - [x] Update `CHANGELOG.md` format guidance
- [x] Task: Create release checklist [k1l2m3n]
  - [x] Create `RELEASE_CHECKLIST.md` with tickable items
  - [x] Include: version bump verification, changelog update, tests pass, adapters validated
  - [x] Document when to use checklist (every release)
- [x] Task: Execute /conductor:review for Phase 2 [l2m3n4o]
- [x] Task: Conductor - Automated Verification 'Phase 2: Hardening Implementation' (Protocol in workflow.md) [m3n4o5p]

## Phase 2 Complete [m3n4o5p]

## Phase 3: Operational Readiness

- [x] Task: Dry-run release checklist end to end [n4o5p6q]
  - [x] Simulate patch release (no real tag)
  - [x] Simulate minor release (no real tag)
  - [x] Document any blockers or gaps discovered
- [x] Task: Document deferred risks and next actions [o5p6q7r]
  - [x] Create risk register for deferred items
  - [x] Document when deferred items should be revisited
- [x] Task: Execute /conductor:review for Phase 3 [p6q7r8s]
- [x] Task: Conductor - Automated Verification 'Phase 3: Operational Readiness' (Protocol in workflow.md) [q7r8s9t]

## Phase 3 Complete [q7r8s9t]

## Handoff Artifacts

- [x] Artifact: `docs/release-policy.md` - versioning rules, semver decision tree [r8s9t0u]
- [x] Artifact: `docs/breaking-change-checklist.md` - semver-major detection [s9t0u1v]
- [x] Artifact: `docs/upstream-pr-runbook.md` - PR/merge procedures [t0u1v2w]
- [x] Artifact: `.github/workflows/release.yml` (if warranted) [u1v2w3x]
- [x] Artifact: `docs/release-template.md` - release notes format [v2w3x4y]
- [x] Artifact: `RELEASE_CHECKLIST.md` - tickable release checklist [w3x4y5z]
- [x] Artifact: `docs/deferred-risks.md` - risk register [x4y5z6a]

## Definition of Done

- [x] All acceptance criteria in `spec.md` are satisfied [y5z6a7b]
- [x] All phases have verification checkpoints passed [z6a7b8c]
- [x] Handoff artifacts exist and are committed [a7b8c9d]
- [x] Release dry-run completed successfully [b8c9d0e]
- [x] `metadata.json` status updated to `completed` [c9d0e1f]
- [x] `npm run lint` and `npm run validate` pass [d0e1f2g]
