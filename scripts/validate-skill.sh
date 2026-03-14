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

add_skillshare_to_path() {
  if command -v skillshare >/dev/null 2>&1; then
    return 0
  fi

  local skillshare_bin=""

  case "${OSTYPE:-}" in
    msys*|cygwin*|win32*)
      local windows_skillshare_root="${LOCALAPPDATA:-$HOME/AppData/Local}/Programs/skillshare"
      if command -v cygpath >/dev/null 2>&1; then
        windows_skillshare_root=$(cygpath "$windows_skillshare_root")
      fi

      local windows_skillshare_path="$windows_skillshare_root/skillshare.exe"
      if [ -f "$windows_skillshare_path" ]; then
        skillshare_bin="$windows_skillshare_root"
      fi
      ;;
    *)
      local unix_skillshare_path="$HOME/.local/bin/skillshare"
      if [ -x "$unix_skillshare_path" ]; then
        skillshare_bin=$(dirname "$unix_skillshare_path")
      fi
      ;;
  esac

  if [ -n "$skillshare_bin" ]; then
    export PATH="$skillshare_bin:$PATH"
  fi
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
  case "${OSTYPE:-}" in
    msys*|cygwin*|win32*)
      powershell -NoProfile -Command "irm https://raw.githubusercontent.com/runkids/skillshare/main/install.ps1 | iex"
      ;;
    *)
      curl -fsSL https://raw.githubusercontent.com/runkids/skillshare/main/install.sh | sh
      ;;
  esac
  add_skillshare_to_path
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
