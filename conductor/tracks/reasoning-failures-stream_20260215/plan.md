# Implementation Plan: LLM Reasoning Failures Stream (Track 1)

## Phase 1: Source Acquisition and Provenance Baseline

- [x] Task: Create archive structure for reasoning-failure sources [a1b2c3d]
  - [x] Add folders/files for paper assets and metadata under `archive/`
  - [x] Define deterministic naming convention for archived assets
- [x] Task: Download and archive arXiv 2602.06176 artifacts [e2f3a4b]
  - [x] Save paper PDF and canonical metadata snapshot
  - [x] Record retrieval date, source URL, and checksum/hash
- [x] Task: Add provenance manifest [f3g4b5c]
  - [x] Create `archive/sources_manifest.json` with schema fields (id, type, url, fetched_at, hash, status)
  - [x] Register initial source entries (paper + provided repo)
- [x] Task: Add/extend validation checks for source manifest integrity
  - [x] Write failing tests for manifest schema and required fields
  - [x] Implement validation code/scripts to satisfy tests
- [x] Task: Add pre-commit hook for manifest validation [g4h5c6d]
  - [x] Add `.pre-commit-config.yaml` entry for `archive/sources_manifest.json` schema validation
  - [x] Add `scripts/validate-manifest.sh` to run schema check
  - [x] Test hook triggers on manifest changes
- [x] Task: Add reproducible command block for source refresh [h5i6d7e]
  - [x] Document one-shot commands to re-fetch/validate archived sources
  - [x] Ensure commands are non-interactive and CI-safe
- [x] Task: Conductor - Automated Verification 'Phase 1: Source Acquisition and Provenance Baseline' (Protocol in workflow.md) [i6j7e8f]

## Phase 1 Complete [e8d4e12]

## Phase 2: Evidence Expansion, Quality, and Taxonomy

- [x] Task: Research and catalog additional reasoning-failure sources [j7k8f9g]
  - [x] Search and collect primary sources (papers/repos/articles) linked to the claim set
  - [x] Add confidence/quality labels and claim summaries
- [x] Task: Add deferred/unverified claims section [k8l9g0h]
  - [x] Capture social-only or weakly supported claims as deferred
  - [x] Mark verification gaps and required follow-up evidence
- [x] Task: Add conflict-of-sources resolution rules [l9m0h1i]
  - [x] Define tie-break policy when sources disagree (recency, authority, empirical strength)
  - [x] Record conflict outcomes in evidence log
- [x] Task: Define canonical reasoning-failure taxonomy/schema [m0n1i2j]
  - [x] Propose category schema and mapping rules
  - [x] Encode minimal evidence threshold rule for new categories
  - [x] Add `docs/TAXONOMY_CHANGELOG.md` for tracking category additions/changes over time
- [x] Task: Add citation normalization helper [n1o2j3k]
  - [x] Create lightweight helper under `scripts/research/` to standardize citation entries
  - [x] Use helper to normalize existing/new evidence-log citations
- [x] Task: Test taxonomy and evidence-threshold enforcement [o2p3k4l]
  - [x] Write failing tests for taxonomy consistency and threshold constraints
  - [x] Implement logic/docs updates to satisfy tests
- [ ] Task: Execute /conductor:review for Phase 2
- [ ] Task: Conductor - Automated Verification 'Phase 2: Evidence Expansion, Quality, and Taxonomy' (Protocol in workflow.md)

## Phase 3: Repo Documentation and Skill-Stream Integration

- [ ] Task: Add dedicated LLM reasoning failures documentation page(s)
  - [ ] Create/update docs with citations mapped to claims
  - [ ] Ensure consistency with repository style and structure
- [ ] Task: Add editorial policy boundary
  - [ ] Document distinction between humanization patterns and reasoning diagnostics
  - [ ] Reference policy from relevant docs/skill entry points
- [ ] Task: Implement separate reasoning-focused module/skill stream
  - [ ] Add new source fragments/files under `src/` (or equivalent modular location)
  - [ ] Wire output generation so existing workflow remains stable
- [ ] Task: Update compiled outputs/adapters as required
  - [ ] Run sync/build workflow
  - [ ] Verify adapters include intended reasoning stream references
- [ ] Task: Add regression and compatibility tests
  - [ ] Write failing tests for no-regression behavior in existing humanizer outputs
  - [ ] Implement fixes until tests pass
- [ ] Task: Execute /conductor:review for Phase 3
- [ ] Task: Conductor - Automated Verification 'Phase 3: Repo Documentation and Skill-Stream Integration' (Protocol in workflow.md)

## Phase 4: Wikipedia Edit Workflow Execution

- [ ] Task: Prepare in-repo Wikipedia edit draft
  - [ ] Produce proposed edit text and citation mapping
  - [ ] Validate neutrality and no-original-synthesis constraints
- [ ] Task: Execute headful browser login-assisted flow
  - [ ] Launch headful browser and navigate to target page
  - [ ] Pause for user login and confirm authenticated state
- [ ] Task: Apply and submit Wikipedia updates
  - [ ] Apply approved draft changes on target page
  - [ ] Save edit and capture revision/permalink
- [ ] Task: Persist audit trail in repository
  - [ ] Record pre-publish draft, post-publish revision ID, timestamp, and summary
- [ ] Task: Monitor and handle edit reversion (fallback)
  - [ ] Check edit status at 24h and 48h intervals
  - [ ] If reverted: document in `docs/wikipedia-edit-history.md` with reversion reason
  - [ ] If reverted: draft revised edit addressing objections for retry decision
- [ ] Task: Execute /conductor:review for Phase 4
- [ ] Task: Conductor - Automated Verification 'Phase 4: Wikipedia Edit Workflow Execution' (Protocol in workflow.md)

## Phase 5: Recommendations, Release Gate, and Handoff

- [ ] Task: Produce follow-on track recommendations
  - [ ] Define track boundaries for review skill, conductor templates/workflows, and CI/release hardening
  - [ ] Document revisit points for architecture decisions
- [ ] Task: Release decision gate
  - [ ] Decide patch vs minor bump based on surface-area change
  - [ ] Decide whether package/release artifact updates are warranted now
- [ ] Task: Validate repo quality gates after Track 1 changes
  - [ ] Run tests, lint/static checks, and relevant build/sync commands
  - [ ] Document any residual risks and deferred work
- [ ] Task: Finalize changelog/version notes for this track's outputs
  - [ ] Update changelog entries and version rationale for introduced stream
  - [ ] Ensure release/readme notes are internally consistent
- [ ] Task: Execute /conductor:review for Phase 5
- [ ] Task: Conductor - Automated Verification 'Phase 5: Recommendations, Release Gate, and Handoff' (Protocol in workflow.md)

## Handoff Artifacts (Unblocks Downstream Tracks)

- [ ] Artifact: `archive/sources_manifest.json` - source provenance for reasoning-failure claims
- [ ] Artifact: `docs/reasoning-failures-taxonomy.md` - canonical category schema
- [ ] Artifact: `docs/TAXONOMY_CHANGELOG.md` - taxonomy evolution tracking
- [ ] Artifact: `src/reasoning-stream/*.md` - source fragments for reasoning module
- [ ] Artifact: `scripts/research/citation-normalize.js` - citation helper utility
- [ ] Artifact: `docs/wikipedia-edit-history.md` - edit audit trail (success or fallback)

## Definition of Done

- [ ] All acceptance criteria in `spec.md` are satisfied
- [ ] All phases have verification checkpoints passed
- [ ] Handoff artifacts exist and are committed
- [ ] Downstream tracks' Required Inputs are available
- [ ] `metadata.json` status updated to `completed`
- [ ] `npm run lint` and `npm run validate` pass
- [ ] No regressions in existing humanizer behavior
