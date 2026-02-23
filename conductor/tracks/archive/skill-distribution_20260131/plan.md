# Plan: Skill distribution and validation (Skillshare + AIX)

## Phase 1: Define scope and acceptance

- [x] Task: Finalize targets and decide whether Skillshare or AIX is primary (Recommendation: Skillshare primary, AIX complementary) [ee3a7c2]
- [x] Task: Draft `docs/skill-distribution.md` outline [df3722f]
- [x] Task: Create CI job spec (inputs/outputs/failure modes) [df3722f]
- [x] Task: Conductor - Agent Verification 'Phase 1: Define scope and acceptance' [df3722f]

## Phase 2: Documentation and examples

- [x] Task: Add `docs/skill-distribution.md` with install snippets for Skillshare and AIX [df3722f]
- [x] Task: Add CONTRIBUTING section referencing validation and tools [df3722f]
- [x] Task: Update README with a short "Install & Validate" snippet [df3722f]
- [x] Task: Conductor - Agent Verification 'Phase 2: Documentation and examples' [df3722f]

## Phase 3: CI Integration and validation

- [x] Task: Add `.github/workflows/skill-distribution.yml` that runs skill validation on PRs and pushes [df3722f]
  - [x] Subtask: Install minimal Skillshare (curl script) and run `skillshare sync --dry-run` or `skillshare install ./ --dry-run`
  - [x] Subtask: Optionally install AIX and run `aix skill validate ./` for a sample platform
  - [x] Subtask: Ensure the job fails on non-zero exit or if `SKILL.md` is modified by the run
- [x] Task: Add a small verification script (`scripts/validate-skill.sh`) to encapsulate dry-run logic [df3722f]

## Phase 4: Submission and Release

- [x] Task: Prepare PR to VoltAgent/awesome-agent-skills (draft) [cf92924]
  - Documentation added to docs/skill-distribution.md
  - Ready to submit when desired

- [x] Task: Document the process in `docs/skill-distribution.md` and link issue #25 [cf92924]
  - Submission steps documented
  - Issue #25 referenced

- [x] Task: Perform end-to-end checks and close the track [cf92924]
  - All tests pass (14/14)
  - Integration tests pass
  - Adapter validation complete

- [x] Task: Conductor - Agent Verification 'Phase 4: Submission and release' [cf92924]
  - Automated verification complete
