import fs from 'fs';

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
  if (!fs.existsSync(adapter.path)) {
    console.error(`Missing: ${adapter.path}`);
    failed = true;
    return;
  }

  const content = fs.readFileSync(adapter.path, 'utf8');
  const metaMatch = content.match(/^---\s*adapter_metadata:([\s\S]*?)^---\s*/m);
  
  if (!metaMatch) {
    console.error(`No metadata found in ${adapter.path}`);
    failed = true;
    return;
  }

  const sourceContent = fs.readFileSync(adapter.base, 'utf8');
  const sourceName = sourceContent.match(/^name:\s*([\w.-]+)\s*$/m)?.[1];
  const sourceVersion = sourceContent.match(/^version:\s*([\w.-]+)\s*$/m)?.[1];

  const metaContent = metaMatch[1];
  const metaName = metaContent.match(/skill_name:\s*([\w.-]+)/)?.[1];
  const metaVersion = metaContent.match(/skill_version:\s*([\w.-]+)/)?.[1];
  const metaSource = metaContent.match(/source_path:\s*([\w.-]+)/)?.[1];

  if (metaName !== sourceName || metaVersion !== sourceVersion || metaSource !== adapter.base) {
    console.error(`Validation Failed for ${adapter.path}:`);
    console.error(`  Expected: ${sourceName} v${sourceVersion} (from ${adapter.base})`);
    console.error(`  Found:    ${metaName} v${metaVersion} (source: ${metaSource})`);
    failed = true;
  } else {
    console.log(`Valid: ${adapter.path}`);
  }
});

if (failed) process.exit(1);
console.log('\nValidation Complete.');
