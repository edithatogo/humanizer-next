# Plan: Repository quality tooling and multi-agent distribution hardening

## Phase 1: Conductor track and baseline wiring

- [x] Task: Create `repo-tooling-enhancements_20260214` track scaffold and metadata
- [x] Task: Register track in `conductor/tracks.md`
- [ ] Task: Conductor - Automated Verification 'Phase 1: Conductor track and baseline wiring' (Protocol in workflow.md)

## Phase 2: Quality tooling integration

- [x] Task: Add npm Vale scripts and wire into `lint:all`
- [x] Task: Verify CI workflow uses lint gate that now includes Vale
- [x] Task: Add `renovate.json` baseline configuration
- [ ] Task: Conductor - Automated Verification 'Phase 2: Quality tooling integration' (Protocol in workflow.md)

## Phase 3: Distribution docs expansion

- [x] Task: Add `npx skills` section to canonical install matrix with Install/Verify/Update/Uninstall
- [x] Task: Update `docs/skill-distribution.md` to include `npx skills` in distribution guidance
- [x] Task: Run `npm run lint` and `npm run validate`
- [ ] Task: Conductor - Automated Verification 'Phase 3: Distribution docs expansion' (Protocol in workflow.md)
