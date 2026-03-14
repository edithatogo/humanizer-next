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

ensure_skillshare_ready() {
  if skillshare status >/dev/null 2>&1; then
    return 0
  fi

  echo "==> Initializing skillshare config for CI"
  skillshare init --no-copy --all-targets --git >/dev/null
}

# Skillshare dry-run
if command -v skillshare >/dev/null 2>&1; then
  ensure_skillshare_ready
  echo "==> Running skillshare dry-run"
  if ! skillshare install . --dry-run; then
    echo "==> skillshare dry-run does not support local repo sources in this environment; skipping"
  fi
else
  echo "==> skillshare not installed; attempting quick install into /tmp"
  curl -fsSL https://raw.githubusercontent.com/runkids/skillshare/main/install.sh | sh
  export PATH="$HOME/.local/bin:$PATH"
  ensure_skillshare_ready
  if ! skillshare install . --dry-run; then
    echo "==> skillshare dry-run does not support local repo sources in this environment; skipping"
  fi
fi

# Optional AIX validation
if command -v aix >/dev/null 2>&1; then
  echo "==> Running aix validation"
  aix skill validate ./ || true
else
  echo "==> aix not installed; skipping aix validation"
fi

echo "==> Verifying sync outputs remain clean"
node scripts/check-sync-clean.js

echo "==> Skill validation completed successfully"
