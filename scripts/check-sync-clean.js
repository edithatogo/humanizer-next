import { execSync } from 'child_process';

function run(command) {
  return execSync(command, { encoding: 'utf8' }).trim();
}

function main() {
  const targetPaths = 'SKILL.md SKILL_PROFESSIONAL.md AGENTS.md README.md adapters .agent/skills';
  const before = run(`git diff --name-only -- ${targetPaths}`);

  run('node scripts/sync-adapters.js');

  const after = run(`git diff --name-only -- ${targetPaths}`);
  if (after === before) {
    console.log('Sync outputs are up to date.');
    return;
  }

  console.error('Sync drift detected in generated skill artifacts:');
  console.error(after);
  process.exit(1);
}

main();
