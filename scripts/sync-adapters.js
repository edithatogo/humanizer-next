import fs from 'fs';
import path from 'path';

const SRC_DIR = 'src';
const CORE_FM_PATH = path.join(SRC_DIR, 'core_frontmatter.yaml');
const CORE_PATTERNS_PATH = path.join(SRC_DIR, 'core_patterns.md');
const HUMAN_HEADER_PATH = path.join(SRC_DIR, 'human_header.md');
const PRO_HEADER_PATH = path.join(SRC_DIR, 'pro_header.md');
const RESEARCH_REF_PATH = path.join(SRC_DIR, 'research_references.md');
const PATTERN_MATRIX_PATH = path.join(SRC_DIR, 'pattern_matrix.md');

function compileSkill(headerPath) {
  if (!fs.existsSync(headerPath)) throw new Error(`Header not found: ${headerPath}`);
  const header = fs.readFileSync(headerPath, 'utf8');
  const coreFM = fs.readFileSync(CORE_FM_PATH, 'utf8');
  const corePatterns = fs.readFileSync(CORE_PATTERNS_PATH, 'utf8');
  const researchRefs = fs.readFileSync(RESEARCH_REF_PATH, 'utf8');
  const patternMatrix = fs.readFileSync(PATTERN_MATRIX_PATH, 'utf8');

  let full = header.replace('<<<<[CORE_FRONTMATTER]>>>>', coreFM);
  full = full + '\n' + corePatterns + '\n' + researchRefs + '\n' + patternMatrix;
  return full;
}

console.log('Compiling Standard Humanizer...');
const standardContent = compileSkill(HUMAN_HEADER_PATH);
fs.writeFileSync('SKILL.md', standardContent, 'utf8');

console.log('Compiling Humanizer Pro...');
const proContent = compileSkill(PRO_HEADER_PATH);
fs.writeFileSync('SKILL_PROFESSIONAL.md', proContent, 'utf8');

const vStandard = standardContent.match(/^version:\s*([\w.-]+)\s*$/m)?.[1];
const vPro = proContent.match(/^version:\s*([\w.-]+)\s*$/m)?.[1];
const today = new Date().toISOString().split('T')[0];

console.log(`Standard Version: ${vStandard}`);
console.log(`Pro Version: ${vPro}`);

const adapters = [
  { name: 'Antigravity Skill Standard', path: 'adapters/antigravity-skill/SKILL.md', source: standardContent, id: 'antigravity-skill', format: 'Antigravity skill', base: 'SKILL.md' },
  { name: 'Antigravity Skill Pro', path: 'adapters/antigravity-skill/SKILL_PROFESSIONAL.md', source: proContent, id: 'antigravity-skill-pro', format: 'Antigravity skill', base: 'SKILL_PROFESSIONAL.md' },
  { name: 'Gemini Extension Standard', path: 'adapters/gemini-extension/GEMINI.md', source: standardContent, id: 'gemini-extension', format: 'Gemini extension', base: 'SKILL.md' },
  { name: 'Gemini Extension Pro', path: 'adapters/gemini-extension/GEMINI_PRO.md', source: proContent, id: 'gemini-extension-pro', format: 'Gemini extension', base: 'SKILL_PROFESSIONAL.md' },
  { name: 'Rules Workflows Standard', path: 'adapters/antigravity-rules-workflows/README.md', source: standardContent, id: 'antigravity-rules-workflows', format: 'Antigravity rules/workflows', base: 'SKILL.md' },
  { name: 'Qwen CLI Standard', path: 'adapters/qwen-cli/QWEN.md', source: standardContent, id: 'qwen-cli', format: 'Qwen CLI context', base: 'SKILL.md' },
  { name: 'Copilot Standard', path: 'adapters/copilot/COPILOT.md', source: standardContent, id: 'copilot', format: 'Copilot instructions', base: 'SKILL.md' },
  { name: 'VSCode Standard', path: 'adapters/vscode/HUMANIZER.md', source: standardContent, id: 'vscode', format: 'VSCode markdown', base: 'SKILL.md' }
];

adapters.forEach(adapter => {
  console.log(`Syncing ${adapter.name}...`);
  const name = adapter.source.match(/^name:\s*([\w.-]+)\s*$/m)?.[1];
  const version = adapter.source.match(/^version:\s*([\w.-]+)\s*$/m)?.[1];

  if (!name) throw new Error(`Could not find name for ${adapter.path}`);

  const metaBlock = `---
adapter_metadata:
  skill_name: ${name}
  skill_version: ${version}
  last_synced: ${today}
  source_path: ${adapter.base}
  adapter_id: ${adapter.id}
  adapter_format: ${adapter.format}
---

`;
  const newContent = metaBlock + '\n' + adapter.source;
  const dir = path.dirname(adapter.path);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(adapter.path, newContent, 'utf8');
});

console.log('\nSync Complete. All adapters updated from local source fragments.');
