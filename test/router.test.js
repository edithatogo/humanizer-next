import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PACKAGE_JSON = path.join(ROOT_DIR, 'package.json');
const DIST_FILE = path.join(ROOT_DIR, 'dist', 'humanizer-pro.bundled.md');

// Only run if dist file exists (it should be built before test)
if (!fs.existsSync(DIST_FILE)) {
  console.warn('SKIPPING: dist/humanizer-pro.bundled.md not found. Run "npm run build" first.');
  process.exit(0);
}

const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
const content = fs.readFileSync(DIST_FILE, 'utf8');

test('Skill Bundle Integrity Check', async (t) => {
  // 1. Verify Header Injection
  await t.test('Header Injection', () => {
    assert.ok(content.startsWith('---'), 'Should start with YAML frontmatter');
    assert.ok(content.includes('name: humanizer-pro-bundled'), 'Should have bundled name');
  });

  // 2. Verify Version Injection
  await t.test('Version Sync', () => {
    console.log('Checking Version Sync...');
    assert.ok(
      content.includes(`skill_version: ${pkg.version}`),
      `YAML frontmatter should match ${pkg.version}`
    );
    assert.ok(
      content.includes(`version: ${pkg.version}`),
      `Skill metadata should match ${pkg.version}`
    );
  });

  // 3. Verify Module Inlining (Router Logic Availability)
  await t.test('Module Bundling', () => {
    console.log('Checking Module Bundling...');
    assert.ok(content.includes('### MODULE: Core Patterns'), 'Core Patterns should be bundled');
    assert.ok(
      content.includes('### MODULE: Technical Module'),
      'Technical Module should be bundled'
    );
    assert.ok(content.includes('### MODULE: Academic Module'), 'Academic Module should be bundled');
    assert.ok(
      content.includes('### MODULE: Governance Module'),
      'Governance Module should be bundled'
    );
  });

  // 4. Verify Routing Logic Keys exist
  await t.test('Routing Logic Triggers', () => {
    console.log('Checking Routing Logic...');
    assert.ok(content.includes('Is it code?'), 'Router should check for code');
    assert.ok(content.includes('Is it a paper?'), 'Router should check for academic papers');
    assert.ok(content.includes('Is it policy/risk?'), 'Router should check for governance');
  });
});
