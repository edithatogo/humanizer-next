import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const REQUIRED_DOCS = ['README.md', 'docs/install-matrix.md', 'docs/skill-distribution.md'];
const REQUIRED_REFERENCE_DOCS = [
  'README.md',
  'docs/skill-distribution.md',
  'adapters/antigravity-skill/README.md',
];
const TOOL_SECTIONS = [
  '## Codex CLI',
  '## Gemini CLI',
  '## VS Code',
  '## Qwen CLI',
  '## GitHub Copilot',
  '## Antigravity (skill)',
  '## Antigravity (rules/workflows)',
  '## Skillshare',
  '## npx skills',
  '## AIX validation',
];
const REQUIRED_SUBSECTIONS = ['### Install', '### Verify', '### Update', '### Uninstall'];

let failed = false;

/**
 * Track and print validation failures.
 * @param {string} message
 */
function fail(message) {
  failed = true;
  console.error(message);
}

/**
 * @param {string} relPath
 * @returns {boolean}
 */
function fileExists(relPath) {
  return fs.existsSync(path.join(REPO_ROOT, relPath));
}

/**
 * @param {string} relPath
 * @returns {string}
 */
function readFile(relPath) {
  return fs.readFileSync(path.join(REPO_ROOT, relPath), 'utf8');
}

/**
 * Validate markdown local links resolve from the source file.
 * @param {string} relPath
 */
function checkInternalLinks(relPath) {
  const content = readFile(relPath);
  const linkRegex = /\[[^\]]+\]\(([^)]+)\)/g;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const href = match[1].trim();
    if (
      !href ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('#') ||
      href.startsWith('mailto:')
    ) {
      continue;
    }

    const cleanHref = href.split('#')[0];
    const resolved = path.resolve(path.dirname(path.join(REPO_ROOT, relPath)), cleanHref);

    if (!fs.existsSync(resolved)) {
      fail(`Broken internal link in ${relPath}: ${href}`);
    }
  }
}

for (const doc of REQUIRED_DOCS) {
  if (!fileExists(doc)) {
    fail(`Missing required doc: ${doc}`);
  }
}

if (fileExists('docs/install-matrix.md')) {
  const matrix = readFile('docs/install-matrix.md');

  for (const section of TOOL_SECTIONS) {
    if (!matrix.includes(section)) {
      fail(`Missing tool section in docs/install-matrix.md: ${section}`);
    }
  }

  for (const subsection of REQUIRED_SUBSECTIONS) {
    const count = (
      matrix.match(new RegExp(subsection.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g')) || []
    ).length;
    if (count < TOOL_SECTIONS.length) {
      fail(
        `Expected at least ${TOOL_SECTIONS.length} occurrences of '${subsection}', found ${count}`
      );
    }
  }
}

for (const doc of REQUIRED_REFERENCE_DOCS) {
  if (!fileExists(doc)) {
    continue;
  }
  const content = readFile(doc);
  if (!content.includes('docs/install-matrix.md')) {
    fail(`Missing canonical install-matrix reference in ${doc}`);
  }
}

for (const doc of REQUIRED_DOCS.concat(['adapters/antigravity-skill/README.md'])) {
  if (fileExists(doc)) {
    checkInternalLinks(doc);
  }
}

if (failed) {
  process.exit(1);
}

console.log('Documentation validation passed.');
