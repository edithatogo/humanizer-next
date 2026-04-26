import fs from 'fs';
import { spawnSync } from 'child_process';

const TARGET_FILES = ['SKILL.md', 'SKILL_PROFESSIONAL.md', 'AGENTS.md', 'README.md'];

function readTargets() {
  const snapshot = new Map();
  for (const file of TARGET_FILES) {
    snapshot.set(file, fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null);
  }
  return snapshot;
}

function runNode(scriptPath) {
  const result = spawnSync(process.execPath, [scriptPath], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function main() {
  const before = readTargets();

  runNode('scripts/compile-skill.js');

  const after = readTargets();
  const drifted = TARGET_FILES.filter((file) => before.get(file) !== after.get(file));

  if (drifted.length === 0) {
    console.log('Sync outputs are up to date.');
    return;
  }

  console.error('Sync drift detected in generated skill artifacts:');
  console.error(drifted.join('\n'));
  process.exit(1);
}

main();
