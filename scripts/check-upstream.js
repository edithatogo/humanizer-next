#!/usr/bin/env node

import { execSync } from 'child_process';

const UPSTREAM_OWNER = 'blader';
const UPSTREAM_REPO = 'humanizer';
const UPSTREAM_URL = `https://github.com/${UPSTREAM_OWNER}/${UPSTREAM_REPO}`;

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: 'pipe' });
  } catch {
    return '';
  }
}

console.log('=== Humanizer Upstream Check ===\n');

const upstreamCommit = run(`git ls-remote ${UPSTREAM_URL} main | cut -f1`);
const localCommit = run('git rev-parse HEAD').trim();

console.log(`Upstream: ${UPSTREAM_URL}`);
console.log(`Upstream HEAD: ${upstreamCommit.slice(0, 7)}`);
console.log(`Local HEAD:    ${localCommit.slice(0, 7)}`);

if (!upstreamCommit) {
  console.log('\n⚠️  Could not fetch upstream. Skipping comparison.');
  process.exit(0);
}

if (upstreamCommit === localCommit) {
  console.log('\n✓ Local matches upstream - no action needed');
} else {
  console.log('\n⚠️  Local differs from upstream!');
  console.log('\nFetching upstream changes...');
  run(`git fetch ${UPSTREAM_URL} main`);

  const upstreamFiles = run(`git diff ${localCommit}..${UPSTREAM_URL}/main --name-only`).trim();
  const localFiles = run('git diff --name-only').trim();

  console.log('\nUpstream changes:');
  console.log(upstreamFiles || '(none)');

  if (localFiles) {
    console.log('\nLocal changes (uncommitted):');
    console.log(localFiles);
  }

  console.log('\n=== Recommendations ===');
  console.log('1. Review upstream changes:');
  console.log(`   git log ${UPSTREAM_URL}/main --oneline -10`);
  console.log('2. If changes are significant, consider syncing');
}

console.log('\n=== Self-Improvement Cycle ===');
console.log('To run the full weekly cycle manually:');
console.log('  npm run sync && npm test');
console.log('\nThis will:');
console.log('  - Sync adapters from canonical SKILL.md');
console.log('  - Run pattern drift detection');
console.log('  - Validate all adapters');
console.log('  - Check for upstream additions');
