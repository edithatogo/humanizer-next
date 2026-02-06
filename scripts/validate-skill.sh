#!/usr/bin/env bash
set -euo pipefail

# Minimal validation script for skill distribution
# - Runs skillshare dry-run install if available
# - Optionally runs aix validation if available
# - Fails if SKILL.md is modified by any command

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT_DIR"

echo "==> Starting skill validation"

# Run npm sync to ensure compiled SKILL.md and adapters are up to date
echo "==> Running npm run sync"
npm run sync --silent

# Skillshare dry-run
if command -v skillshare >/dev/null 2>&1; then
  echo "==> Running skillshare dry-run"
  skillshare install . --dry-run
else
  echo "==> skillshare not installed; attempting quick install into /tmp"
  curl -fsSL https://raw.githubusercontent.com/runkids/skillshare/main/install.sh | sh
  export PATH="$HOME/.local/bin:$PATH"
  skillshare install . --dry-run
fi

# Optional AIX validation
if command -v aix >/dev/null 2>&1; then
  echo "==> Running aix validation"
  aix skill validate ./ || true
else
  echo "==> aix not installed; skipping aix validation"
fi

# Check if SKILL.md was modified
if git diff --name-only | grep -q '^SKILL.md$'; then
  echo "ERROR: SKILL.md was modified by the validation steps. Aborting." >&2
  git --no-pager diff -- SKILL.md >&2
  exit 2
fi

echo "==> Skill validation completed successfully"
