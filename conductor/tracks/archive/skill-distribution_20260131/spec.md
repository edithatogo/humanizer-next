# Spec: Skill distribution and validation (Skillshare + AIX)

## Overview

This feature adds a repeatable distribution and verification workflow for the Humanizer skill using Skillshare as the primary distribution/sync mechanism and AIX for per-platform validation. It also adds a CI job to validate installs on pull requests and documents how maintainers can publish and verify the skill across platforms.

## Goals

- Provide clear README examples for installing and verifying the skill with Skillshare and AIX.
- Add CI to validate that changes to the repository do not break Skillshare/AIX installs (dry-run/validate).
- Automate the submission workflow to discovery repositories (e.g., VoltAgent/awesome-agent-skills) and document the process.
- Preserve `SKILL.md` as the canonical source of truth—no automated modifications to the canonical file.

## Functional requirements

1. Add a new documentation section `docs/skill-distribution.md` with examples for:
   - Installing Skillshare and running `skillshare install`/`skillshare sync --dry-run`
   - Installing AIX and running `aix skill validate` or `aix skill install --platform <platform> --dry-run`
2. Add a GitHub Actions workflow `.github/workflows/skill-distribution.yml` that runs on PRs and pushes to `main`. The job will:
   - Run `skillshare sync --dry-run` (or `skillshare install ./ --dry-run`)
   - Optionally run `aix skill validate ./` for one or two example platforms (if AIX is available in CI environment)
   - Fail if install/validate returns non-zero, or if SKILL.md is modified by the process
3. Add a short doc about how to submit the skill to VoltAgent/awesome-agent-skills (link to issue #25)
4. Add tests or script that assert the SKILL.md compiles and adapters sync (may reuse `npm run sync` and `node scripts/run-tests.js`)

## Non-functional requirements

- CI must run quickly (target < 3 minutes for the skill validation job in dry-run mode)
- The verification step must be non-destructive (dry-run or validate-only)
- Tooling must be optional for contributors; failures should be actionable with clear messages

## Acceptance Criteria

- `docs/skill-distribution.md` exists and contains install and validation examples for both Skillshare and AIX
- `.github/workflows/skill-distribution.yml` runs on PRs and returns success for the current `main` branch baseline
- A CONTRIBUTING section references the new validation checks and how to resolve failures
- Issue #25 is referenced and a PR to VoltAgent/awesome-agent-skills is prepared (draft OK)

## Out of scope

- Creating platform-specific adapters (we only verify installs, not publish per-target adapters)
- Packaging skill into OS-level installers

## Stakeholders

- Maintainers
- Contributors submitting SKILL.md changes
- Community integrators that install the skill via Skillshare/AIX

## Risks

- CI environment may not support Skillshare/AIX binaries without setup; we use dry-run installs to minimize risk
- Toolchain changes upstream may require updates to the CI steps

## Timeline

- Estimated 3 phases; target completion within 2 weeks given small scope.
