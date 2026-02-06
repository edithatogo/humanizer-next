# Skill distribution and validation (Skillshare + AIX)

This document explains how to install and validate the Humanizer skill using Skillshare (primary distribution) and AIX (developer validation). It also documents the CI checks that run on pull requests to ensure changes do not break installs or modify the canonical `SKILL.md` file.

## Quick start — Skillshare

Install Skillshare and do a dry-run install:

```bash
# Install skillshare (Linux/macOS)
curl -fsSL https://raw.githubusercontent.com/runkids/skillshare/main/install.sh | sh

# Run a dry-run install to verify the current repository
skillshare install . --dry-run
# or to sync
skillshare sync --dry-run
```

Notes:
- `--dry-run` does not write into system targets and is safe for CI.
- Skillshare uses the `SKILL.md` format and preserves the canonical file.

## Quick start — AIX (optional validation)

Install AIX and validate the skill against a target platform:

```bash
# Install via Homebrew (macOS/Linux)
brew install thoreinstein/tap/aix

# Validate locally (if AIX supports validation for the platform)
aix skill validate ./
# or try a dry install for a platform
aix skill install ./ --platform codex --dry-run
```

Notes:
- AIX is useful for per-platform verification when you need to see how a specific target will render the skill.
- This step is optional in CI for speed; included as an additional verification when available.

## CI Integration

We add a GitHub Actions workflow that runs on PRs and pushes to `main` which:
- Attempts a `skillshare install . --dry-run` (fails if the command returns non-zero)
- Optionally runs `aix skill validate ./` when available
- Fails if the run modifies `SKILL.md`

This gives rapid feedback to contributors and preserves the canonical source of truth.

## Submitting to discovery lists

We maintain Issue #25 to track submission to VoltAgent/awesome-agent-skills. The process is documented in the track plan. Preparing a PR to the listing requires only a short entry with a one-line description and link back to this repository.

## Troubleshooting

If a CI job fails:
- Inspect the workflow logs to see which step failed (Skillshare install or AIX validation)
- Run the same commands locally (see Quick Start) and fix issues locally
- Ensure `npm run sync` and `npm run validate` pass before opening a PR

## References

- Skillshare: https://github.com/runkids/skillshare
- AIX: https://thoreinstein.github.io/aix
- VoltAgent / awesome-agent-skills: https://github.com/VoltAgent/awesome-agent-skills
