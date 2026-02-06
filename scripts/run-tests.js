import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('--- Integration Testing Start ---');

/**
 * Run a shell command and inherit stdio
 * @param {string} cmd
 * @returns {boolean}
 */
function run(cmd) {
  console.log(`Running: ${cmd}`);
  try {
    execSync(cmd, { stdio: 'inherit' });
    return true;
  } catch (e) {
    console.error(`Command failed: ${cmd}`);
    return false;
  }
}

let success = true;

// 1. Build Test
console.log('\n[1/3] Verifying sync logic...');
if (!run('node scripts/sync-adapters.js')) success = false;

// 2. Validation Test
console.log('\n[2/3] Verifying metadata validation...');
if (!run('node scripts/validate-adapters.js')) success = false;

// 3. Artifact verification
console.log('\n[3/3] Verifying generated artifacts...');
const expectedAdapters = [
  'adapters/antigravity-skill/SKILL.md',
  'adapters/gemini-extension/GEMINI_PRO.md',
  'adapters/vscode/HUMANIZER.md',
];

expectedAdapters.forEach((p) => {
  if (fs.existsSync(p)) {
    console.log(`  OK: ${p}`);
  } else {
    console.error(`  MISSING: ${p}`);
    success = false;
  }
});

if (!success) {
  console.error('\n--- INTEGRATION TESTS FAILED ---');
  process.exit(1);
}

console.log('\n--- ALL INTEGRATION TESTS PASSED ---');
