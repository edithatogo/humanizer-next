import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

/**
 * @param {string} dir
 * @returns {string[]}
 */
function collectMarkdownFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return collectMarkdownFiles(fullPath);
    }
    return entry.isFile() && entry.name.endsWith('.md') ? [fullPath] : [];
  });
}

const targets = [
  path.join(REPO_ROOT, 'AGENTS.md'),
  ...collectMarkdownFiles(path.join(REPO_ROOT, 'src')),
];

const missingTargets = targets.filter((target) => !fs.existsSync(target));
if (missingTargets.length > 0) {
  console.error(
    `Markdown lint target(s) missing:\n${missingTargets
      .map((target) => `- ${path.relative(REPO_ROOT, target)}`)
      .join('\n')}`
  );
  process.exit(1);
}

const markdownlintEntry = path.join(
  REPO_ROOT,
  'node_modules',
  'markdownlint-cli',
  'markdownlint.js'
);

const relativeTargets = targets.map((target) =>
  path.relative(REPO_ROOT, target).replaceAll('\\', '/')
);
console.log(`Linting markdown from ${REPO_ROOT}`);
console.log(relativeTargets.join('\n'));

execFileSync(process.execPath, [markdownlintEntry, ...targets], {
  cwd: REPO_ROOT,
  stdio: 'inherit',
});
