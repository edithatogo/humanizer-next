import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(REPO_ROOT, 'src');
const CORE_FM_PATH = path.join(SRC_DIR, 'core_frontmatter.yaml');
const CORE_PATTERNS_PATH = path.join(SRC_DIR, 'core_patterns.md');
const HUMAN_HEADER_PATH = path.join(SRC_DIR, 'human_header.md');
const PRO_HEADER_PATH = path.join(SRC_DIR, 'pro_header.md');
const RESEARCH_REF_PATH = path.join(SRC_DIR, 'research_references.md');
const PATTERN_MATRIX_PATH = path.join(SRC_DIR, 'pattern_matrix.md');

/**
 * Compile a skill from a header and core fragments
 * @param {string} headerPath
 * @returns {string}
 */
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

/**
 * Merge adapter metadata into existing frontmatter.
 * @param {string} source
 * @param {string} metadata
 * @returns {string}
 */
function mergeAdapterMetadata(source, metadata) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    return `---\n${metadata}\n---\n\n${source}`;
  }

  const frontmatter = match[1].replace(/(^|\n)adapter_metadata:\n(?:[ \t].*\n)*/m, '\n').trimEnd();
  const rest = source.slice(match[0].length);
  const mergedFrontmatter = `${frontmatter}\n${metadata}`.trimEnd();
  return `---\n${mergedFrontmatter}\n---\n\n${rest}`;
}

console.log('Compiling Standard Humanizer...');
const standardContent = compileSkill(HUMAN_HEADER_PATH);
fs.writeFileSync(path.join(REPO_ROOT, 'SKILL.md'), standardContent, 'utf8');

console.log('Compiling Humanizer Pro...');
const proContent = compileSkill(PRO_HEADER_PATH);
fs.writeFileSync(path.join(REPO_ROOT, 'SKILL_PROFESSIONAL.md'), proContent, 'utf8');

const vStandard = standardContent.match(/^version:\s*([\w.-]+)\s*$/m)?.[1];
const vPro = proContent.match(/^version:\s*([\w.-]+)\s*$/m)?.[1];
const today = new Date().toISOString().split('T')[0];

console.log(`Standard Version: ${vStandard}`);
console.log(`Pro Version: ${vPro}`);

const adapters = [
  {
    name: 'Internal Antigravity Skill Standard',
    path: path.join(REPO_ROOT, '.agent', 'skills', 'humanizer', 'SKILL.md'),
    source: standardContent,
    id: 'humanizer',
    format: 'Antigravity skill',
    base: 'SKILL.md',
  },
  {
    name: 'Internal Antigravity Skill Pro',
    path: path.join(REPO_ROOT, '.agent', 'skills', 'humanizer', 'SKILL_PROFESSIONAL.md'),
    source: proContent,
    id: 'humanizer-pro',
    format: 'Antigravity skill',
    base: 'SKILL_PROFESSIONAL.md',
  },
  {
    name: 'Antigravity Skill Standard',
    path: path.join(REPO_ROOT, 'adapters', 'antigravity-skill', 'SKILL.md'),
    source: standardContent,
    id: 'antigravity-skill',
    format: 'Antigravity skill',
    base: 'SKILL.md',
  },
  {
    name: 'Antigravity Skill Pro',
    path: path.join(REPO_ROOT, 'adapters', 'antigravity-skill', 'SKILL_PROFESSIONAL.md'),
    source: proContent,
    id: 'antigravity-skill-pro',
    format: 'Antigravity skill',
    base: 'SKILL_PROFESSIONAL.md',
  },
  {
    name: 'Gemini Extension Standard',
    path: path.join(REPO_ROOT, 'adapters', 'gemini-extension', 'GEMINI.md'),
    source: standardContent,
    id: 'gemini-extension',
    format: 'Gemini extension',
    base: 'SKILL.md',
  },
  {
    name: 'Gemini Extension Pro',
    path: path.join(REPO_ROOT, 'adapters', 'gemini-extension', 'GEMINI_PRO.md'),
    source: proContent,
    id: 'gemini-extension-pro',
    format: 'Gemini extension',
    base: 'SKILL_PROFESSIONAL.md',
  },
  {
    name: 'Rules Workflows Standard',
    path: path.join(REPO_ROOT, 'adapters', 'antigravity-rules-workflows', 'README.md'),
    source: standardContent,
    id: 'antigravity-rules-workflows',
    format: 'Antigravity rules/workflows',
    base: 'SKILL.md',
  },
  {
    name: 'Qwen CLI Standard',
    path: path.join(REPO_ROOT, 'adapters', 'qwen-cli', 'QWEN.md'),
    source: standardContent,
    id: 'qwen-cli',
    format: 'Qwen CLI context',
    base: 'SKILL.md',
  },
  {
    name: 'Copilot Standard',
    path: path.join(REPO_ROOT, 'adapters', 'copilot', 'COPILOT.md'),
    source: standardContent,
    id: 'copilot',
    format: 'Copilot instructions',
    base: 'SKILL.md',
  },
  {
    name: 'VSCode Standard',
    path: path.join(REPO_ROOT, 'adapters', 'vscode', 'HUMANIZER.md'),
    source: standardContent,
    id: 'vscode',
    format: 'VSCode markdown',
    base: 'SKILL.md',
  },
  {
    name: 'Claude Standard',
    path: path.join(REPO_ROOT, 'adapters', 'claude', 'SKILL.md'),
    source: standardContent,
    id: 'claude',
    format: 'Claude skill',
    base: 'SKILL.md',
  },
  {
    name: 'Cline Standard',
    path: path.join(REPO_ROOT, 'adapters', 'cline', 'SKILL.md'),
    source: standardContent,
    id: 'cline',
    format: 'Cline skill',
    base: 'SKILL.md',
  },
  {
    name: 'Kilo Standard',
    path: path.join(REPO_ROOT, 'adapters', 'kilo', 'SKILL.md'),
    source: standardContent,
    id: 'kilo',
    format: 'Kilo skill',
    base: 'SKILL.md',
  },
  {
    name: 'Amp Standard',
    path: path.join(REPO_ROOT, 'adapters', 'amp', 'SKILL.md'),
    source: standardContent,
    id: 'amp',
    format: 'Amp skill',
    base: 'SKILL.md',
  },
  {
    name: 'OpenCode Standard',
    path: path.join(REPO_ROOT, 'adapters', 'opencode', 'SKILL.md'),
    source: standardContent,
    id: 'opencode',
    format: 'OpenCode skill',
    base: 'SKILL.md',
  },
];

// Optional: Global Home Directory Sync (SOTA approach)
const SYNC_GLOBAL = process.env.HUMANIZER_SYNC_GLOBAL === '1';
if (SYNC_GLOBAL) {
  const home = os.homedir();
  [
    { tool: 'cline', dir: '.cline/skills' },
    { tool: 'kilo', dir: '.kilo/skills' },
    { tool: 'amp', dir: '.amp/skills' },
    { tool: 'opencode', dir: '.opencode/skills' },
    { tool: 'claude', dir: '.claude/skills' },
    { tool: 'qwen', dir: '.qwen/skills' },
    { tool: 'codex', dir: '.codex/skills' },
  ].forEach(({ tool, dir }) => {
    adapters.push({
      name: `${tool.charAt(0).toUpperCase() + tool.slice(1)} (Global)`,
      path: path.join(home, dir, 'humanizer', 'SKILL.md'),
      source: standardContent,
      id: `${tool}-global`,
      format: `${tool} skill`,
      base: 'SKILL.md',
    });
  });
}

adapters.forEach((adapter) => {
  console.log(`Syncing ${adapter.name}...`);
  const name = adapter.source.match(/^name:\s*([\w.-]+)\s*$/m)?.[1];
  const version = adapter.source.match(/^version:\s*([\w.-]+)\s*$/m)?.[1];

  if (!name) throw new Error(`Could not find name for ${adapter.path}`);

  const metaBlock = `adapter_metadata:
  skill_name: ${name}
  skill_version: ${version}
  last_synced: ${today}
  source_path: ${adapter.base}
  adapter_id: ${adapter.id}
  adapter_format: ${adapter.format}`;
  const newContent = mergeAdapterMetadata(adapter.source, metaBlock);
  const dir = path.dirname(adapter.path);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(adapter.path, newContent, 'utf8');
});

// Update root manifests that only need metadata sync
const rootManifests = [
  { name: 'Agents manifest', path: path.join(REPO_ROOT, 'AGENTS.md') },
  { name: 'README manifest', path: path.join(REPO_ROOT, 'README.md') },
];

rootManifests.forEach((manifest) => {
  if (fs.existsSync(manifest.path)) {
    console.log(`Updating metadata in ${manifest.name}...`);
    let content = fs.readFileSync(manifest.path, 'utf8');
    content = content.replace(/^( {2}skill_version:).*/m, `$1 ${vStandard}`);
    content = content.replace(/^( {2}last_synced:).*/m, `$1 ${today}`);
    fs.writeFileSync(manifest.path, content, 'utf8');
  }
});

console.log('\nSync Complete. All adapters updated from local source fragments.');
