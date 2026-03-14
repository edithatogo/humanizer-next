import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const require = createRequire(import.meta.url);

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

// `lint:all` intentionally focuses on canonical skill sources and agent guidance.
// Wider markdown surfaces like repo notes and historical track docs are still checked
// in pre-commit paths, but the maintainer gate stays scoped to actively maintained docs.
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

const relativeTargets = targets.map((target) =>
  path.relative(REPO_ROOT, target).replaceAll('\\', '/')
);
console.log(`Linting markdown from ${REPO_ROOT}`);
console.log(relativeTargets.join('\n'));

function runMarkdownlint() {
  try {
    const markdownlintEntry = require.resolve('markdownlint-cli/markdownlint.js');
    execFileSync(process.execPath, [markdownlintEntry, ...targets], {
      cwd: REPO_ROOT,
      stdio: 'inherit',
    });
    return;
  } catch (error) {
    console.warn(`Falling back to npx markdownlint: ${error.message}`);
  }

  try {
    const localMarkdownlint = path.join(
      REPO_ROOT,
      'node_modules',
      '.bin',
      process.platform === 'win32' ? 'markdownlint.cmd' : 'markdownlint'
    );

    if (fs.existsSync(localMarkdownlint)) {
      execFileSync(localMarkdownlint, targets, {
        cwd: REPO_ROOT,
        stdio: 'inherit',
      });
      return;
    }

    if (process.platform === 'win32') {
      const escapedTargets = targets.map((target) => `"${target.replaceAll('"', '\\"')}"`);
      execFileSync(
        process.env.comspec || 'cmd.exe',
        [
          '/d',
          '/s',
          '/c',
          `npm exec --yes --package=markdownlint-cli -- markdownlint ${escapedTargets.join(' ')}`,
        ],
        {
          cwd: REPO_ROOT,
          stdio: 'inherit',
        }
      );
      return;
    }

    execFileSync(
      'npm',
      ['exec', '--yes', '--package=markdownlint-cli', '--', 'markdownlint', ...targets],
      {
        cwd: REPO_ROOT,
        stdio: 'inherit',
      }
    );
  } catch (error) {
    console.error(`Failed to run markdownlint via npx: ${error.message}`);
    process.exit(error.status || 1);
  }
}

runMarkdownlint();
