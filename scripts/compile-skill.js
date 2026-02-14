import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const SKILL_DIR = path.join(ROOT_DIR, '.agent/skills/humanizer');
const ENTRY_POINT = path.join(ROOT_DIR, 'SKILL_PROFESSIONAL.md');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const OUTPUT_FILE = path.join(DIST_DIR, 'humanizer-pro.bundled.md');
const PACKAGE_JSON = path.join(ROOT_DIR, 'package.json');

// Ensure dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR);
}

// Read Package Version
const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
const VERSION = pkg.version;
const LAST_SYNCED = new Date().toISOString().split('T')[0];

console.log(`Building Humanizer Pro v${VERSION}...`);

/**
 * Remove only the first YAML frontmatter block.
 * @param {string} source
 * @returns {string}
 */
function stripLeadingFrontmatter(source) {
  if (!source.startsWith('---\n')) return source;
  const closingIndex = source.indexOf('\n---\n', 4);
  if (closingIndex === -1) return source;
  return source.slice(closingIndex + 5);
}

try {
  let content = fs.readFileSync(ENTRY_POINT, 'utf8');

  // 1. Inject Metadata
  content = content.replace(/skill_version: .*/, `skill_version: ${VERSION}`);
  content = content.replace(/last_synced: .*/, `last_synced: ${LAST_SYNCED}`);
  content = content.replace(/version: .*/, `version: ${VERSION}`);

  // 2. Inline Modules
  const MODULE_IMPORT_REGEX = /-\s+\[(.*?)\]\((modules\/.*?\.md)\)(.*)/g;

  content = content.replace(MODULE_IMPORT_REGEX, (match, label, activePath, description) => {
    const modulePath = path.join(SKILL_DIR, activePath);
    try {
      let moduleContent = fs.readFileSync(modulePath, 'utf8');
      // Remove frontmatter from modules if present
      moduleContent = moduleContent.replace(/^---[\s\S]*?---\n/, '');

      console.log(`  Included: ${label}`);
      return `### MODULE: ${label}\n> **Description:** ${description.trim()}\n\n${moduleContent}\n\n---`;
    } catch (e) {
      console.error(`  ERROR: Could not read module ${modulePath}`);
      console.error(e);
      return match;
    }
  });

  // 3. Add Bundle Header
  const bundleHeader = `---
adapter_metadata:
  skill_name: humanizer-pro-bundled
  skill_version: ${VERSION}
  last_synced: ${LAST_SYNCED}
  source_path: dist/humanizer-pro.bundled.md
  adapter_id: antigravity-skill-pro-bundled
  adapter_format: Antigravity skill
---

---
name: humanizer-pro-bundled
version: ${VERSION}
description: |
  Bundled professional Humanizer skill with module content inlined.
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion
---
`;

  // Remove the source frontmatter and prepend bundle header
  content = stripLeadingFrontmatter(content);
  content = `${bundleHeader}\n${content}`;

  fs.writeFileSync(OUTPUT_FILE, content);
  console.log(`Successfully bundled to ${OUTPUT_FILE}`);
} catch (e) {
  console.error('Build Failed:', e);
  process.exit(1);
}
