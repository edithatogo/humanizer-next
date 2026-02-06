# Plan: Skill distribution and validation (Skillshare + AIX)

## Phase 1: Define scope and acceptance

- [ ] Task: Finalize targets and decide whether Skillshare or AIX is primary (Recommendation: Skillshare primary, AIX complementary)
- [ ] Task: Draft `docs/skill-distribution.md` outline
- [ ] Task: Create CI job spec (inputs/outputs/failure modes)
- [ ] Task: Conductor - Agent Verification 'Phase 1: Define scope and acceptance' (Protocol in workflow.md)

## Phase 2: Documentation and examples

- [x] Task: Add `docs/skill-distribution.md` with install snippets for Skillshare and AIX
- [x] Task: Add CONTRIBUTING section referencing validation and tools
- [x] Task: Update README with a short "Install & Validate" snippet
- [ ] Task: Conductor - Agent Verification 'Phase 2: Documentation and examples' (Protocol in workflow.md)

## Phase 3: CI Integration and validation

- [x] Task: Add `.github/workflows/skill-distribution.yml` that runs skill validation on PRs and pushes
    - [x] Subtask: Install minimal Skillshare (curl script) and run `skillshare sync --dry-run` or `skillshare install ./ --dry-run`
    - [ ] Subtask: Optionally install AIX and run `aix skill validate ./` for a sample platform
    - [x] Subtask: Ensure the job fails on non-zero exit or if `SKILL.md` is modified by the run
- [x] Task: Add a small verification script (`scripts/validate-skill.sh`) to encapsulate dry-run logic
## Phase 4: Submission and Release

- [ ] Task: Prepare PR to VoltAgent/awesome-agent-skills (draft)
- [ ] Task: Document the process in `docs/skill-distribution.md` and link issue #25
- [ ] Task: Perform end-to-end checks and close the track
- [ ] Task: Conductor - Agent Verification 'Phase 4: Submission and release' (Protocol in workflow.md)
