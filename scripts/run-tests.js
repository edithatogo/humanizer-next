import { spawnSync } from 'child_process';

console.log('--- Integration Testing Start ---');

/**
 * Run a Node script and inherit stdio
 * @param {string} scriptPath
 * @returns {boolean}
 */
function run(scriptPath) {
  console.log(`Running: ${scriptPath}`);
  const result = spawnSync(process.execPath, [scriptPath], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    console.error(`Command failed: ${scriptPath}`);
    return false;
  }

  return true;
}

let success = true;

// 1. Build and sync check
console.log('\n[1/2] Verifying core sync logic...');
if (!run('scripts/check-sync-clean.js')) success = false;

// 2. Docs validation
console.log('\n[2/2] Verifying documentation validation...');
if (!run('scripts/validate-docs.js')) success = false;

if (!success) {
  console.error('\n--- INTEGRATION TESTS FAILED ---');
  process.exit(1);
}

console.log('\n--- ALL INTEGRATION TESTS PASSED ---');
