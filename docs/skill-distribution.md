# Skill distribution and validation (Skillshare + npx skills + AIX)

This document covers optional distribution and validation flows. For all primary installation paths across supported tools, use the canonical guide:

- [docs/install-matrix.md](./install-matrix.md)

## Quick start - Skillshare

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

- `--dry-run` doesn't write into system targets and is safe for CI.
- Skillshare uses the `SKILL.md` format and preserves the canonical file.

## Quick start - npx skills

Use `npx skills` when you want a quick cross-agent installer flow from a repository URL:

```bash
npx skills install https://github.com/edithatogo/humanizer-next
npx skills list
npx skills update humanizer
```

Notes:

- `npx skills` is useful for rapid install/update workflows across agent ecosystems.
- Refer to [docs/install-matrix.md](./install-matrix.md) for the canonical per-tool mapping and support status.

## Quick start - AIX (optional validation)

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

## CI integration

CI should validate docs and adapters without adding new mandatory third-party CLIs:

- Run `npm run validate` (adapters + docs checks)
- Optionally run Skillshare, `npx skills`, and AIX checks in local or dedicated CI jobs
- Fail if any step modifies canonical files unexpectedly

## Troubleshooting

If a CI job fails:

- Inspect logs to see which validation step failed
- Run the same commands locally
- Ensure `npm run sync` and `npm run validate` pass before opening a PR

## References

- Skillshare: https://github.com/runkids/skillshare
- npx skills: https://github.com/vercel-labs/skills
- AIX: https://thoreinstein.github.io/aix
- VoltAgent / awesome-agent-skills: https://github.com/VoltAgent/awesome-agent-skills
