import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const adapters = [
  { path: 'adapters/antigravity-skill/SKILL.md', base: 'SKILL.md' },
  { path: 'adapters/antigravity-skill/SKILL_PROFESSIONAL.md', base: 'SKILL_PROFESSIONAL.md' },
  { path: 'adapters/gemini-extension/GEMINI.md', base: 'SKILL.md' },
  { path: 'adapters/gemini-extension/GEMINI_PRO.md', base: 'SKILL_PROFESSIONAL.md' },
  { path: 'adapters/antigravity-rules-workflows/README.md', base: 'SKILL.md' },
  { path: 'adapters/qwen-cli/QWEN.md', base: 'SKILL.md' },
  { path: 'adapters/copilot/COPILOT.md', base: 'SKILL.md' },
  { path: 'adapters/vscode/HUMANIZER.md', base: 'SKILL.md' }
];

let failed = false;

adapters.forEach(adapter => {
  const adapterPath = path.join(REPO_ROOT, adapter.path);
  if (!fs.existsSync(adapterPath)) {
    console.error(`Missing: ${adapter.path}`);
    failed = true;
    return;
  }

  const content = fs.readFileSync(adapterPath, 'utf8');
  const frontmatterMatch = content.match(/^---\s*([\s\S]*?)^---\s*/m);
  
  if (!frontmatterMatch) {
    console.error(`No frontmatter found in ${adapter.path}`);
    failed = true;
    return;
  }

  const sourceContent = fs.readFileSync(path.join(REPO_ROOT, adapter.base), 'utf8');
  const sourceName = sourceContent.match(/^name:\s*([\w.-]+)\s*$/m)?.[1];
  const sourceVersion = sourceContent.match(/^version:\s*([\w.-]+)\s*$/m)?.[1];

  const metaContent = frontmatterMatch[1];
  const metaName = metaContent.match(/^\s*skill_name:\s*([\w.-]+)\s*$/m)?.[1];
  const metaVersion = metaContent.match(/^\s*skill_version:\s*([\w.-]+)\s*$/m)?.[1];
  const metaSource = metaContent.match(/^\s*source_path:\s*([\w.-]+)\s*$/m)?.[1];
  const metaSynced = metaContent.match(/^\s*last_synced:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})\s*$/m)?.[1];

  if (metaName !== sourceName || metaVersion !== sourceVersion || metaSource !== adapter.base) {
    console.error(`Validation Failed for ${adapter.path}:`);
    console.error(`  Expected: ${sourceName} v${sourceVersion} (from ${adapter.base})`);
    console.error(`  Found:    ${metaName} v${metaVersion} (source: ${metaSource})`);
    failed = true;
  } else if (!metaSynced) {
    console.error(`Validation Failed for ${adapter.path}: invalid last_synced`);
    failed = true;
  } else {
    console.log(`Valid: ${adapter.path}`);
  }
});

if (failed) process.exit(1);
console.log('\nValidation Complete.');
