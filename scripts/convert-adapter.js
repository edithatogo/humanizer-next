#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const SKILL_PATH = path.join(REPO_ROOT, 'SKILL.md');
const ADAPTERS_DIR = path.join(REPO_ROOT, 'adapters');

const PLATFORM_CONFIGS = {
  opencode: {
    file: 'SKILL.md',
    metadata: { adapter_id: 'opencode', adapter_format: 'OpenCode skill' },
  },
  claude: {
    file: 'SKILL.md',
    metadata: { adapter_id: 'claude', adapter_format: 'Claude skill' },
  },
  cursor: {
    file: 'SKILL.md',
    metadata: { adapter_id: 'cursor', adapter_format: 'Cursor skill' },
  },
  windsurf: {
    file: 'SKILL.md',
    metadata: { adapter_id: 'windsurf', adapter_format: 'Windsurf skill' },
  },
  zed: {
    file: 'SKILL.md',
    metadata: { adapter_id: 'zed', adapter_format: 'Zed skill' },
  },
  cline: {
    file: 'SKILL.md',
    metadata: { adapter_id: 'cline', adapter_format: 'Cline skill' },
  },
  kilo: {
    file: 'SKILL.md',
    metadata: { adapter_id: 'kilo', adapter_format: 'Kilo skill' },
  },
  amp: {
    file: 'SKILL.md',
    metadata: { adapter_id: 'amp', adapter_format: 'Amp skill' },
  },
  'antigravity-skill': {
    file: 'SKILL.md',
    proFile: 'SKILL_PROFESSIONAL.md',
    metadata: { adapter_id: 'antigravity-skill', adapter_format: 'Antigravity skill' },
  },
  'antigravity-rules-workflows': {
    file: 'README.md',
    metadata: { adapter_id: 'antigravity-rules-workflows', adapter_format: 'Antigravity workflow' },
  },
  copilot: {
    file: 'SKILL.md',
    metadata: { adapter_id: 'copilot', adapter_format: 'GitHub Copilot custom instructions' },
  },
  'gemini-extension': {
    file: 'SKILL.md',
    metadata: { adapter_id: 'gemini-extension', adapter_format: 'Gemini extension' },
  },
};

function updateMetadata(content, adapterId, format) {
  const today = new Date().toISOString().split('T')[0];
  const adapterMetadataBlock = `adapter_metadata:
  skill_name: humanizer
  skill_version: 2.3.0
  last_synced: ${today}
  source_path: SKILL.md
  adapter_id: ${adapterId}
  adapter_format: ${format}`;

  if (content.includes('adapter_metadata:')) {
    return content.replace(/adapter_metadata:[\s\S]*?adapter_format:.*$/m, adapterMetadataBlock);
  }

  const yamlEnd = content.indexOf('---', content.indexOf('---') + 3);
  if (yamlEnd !== -1) {
    return (
      content.slice(0, yamlEnd + 3) +
      '\n' +
      adapterMetadataBlock +
      '\n' +
      content.slice(yamlEnd + 3)
    );
  }

  return content;
}

function convertAdapter(platform, targetDir = null) {
  if (!PLATFORM_CONFIGS[platform]) {
    console.error(`Unknown platform: ${platform}`);
    console.error(`Available platforms: ${Object.keys(PLATFORM_CONFIGS).join(', ')}`);
    process.exit(1);
  }

  const config = PLATFORM_CONFIGS[platform];
  const adapterDir = targetDir || path.join(ADAPTERS_DIR, platform);

  if (!fs.existsSync(adapterDir)) {
    fs.mkdirSync(adapterDir, { recursive: true });
  }

  if (!fs.existsSync(SKILL_PATH)) {
    console.error('SKILL.md not found. Run sync-adapters.js first.');
    process.exit(1);
  }

  const skillContent = fs.readFileSync(SKILL_PATH, 'utf8');
  const convertedContent = updateMetadata(
    skillContent,
    config.metadata.adapter_id,
    config.metadata.adapter_format
  );

  const outputPath = path.join(adapterDir, config.file);
  fs.writeFileSync(outputPath, convertedContent);
  console.log(`✓ Converted ${platform} → ${outputPath}`);

  if (config.proFile) {
    const proPath = path.join(REPO_ROOT, 'SKILL_PROFESSIONAL.md');
    if (fs.existsSync(proPath)) {
      const proContent = fs.readFileSync(proPath, 'utf8');
      const proConverted = updateMetadata(
        proContent,
        `${config.metadata.adapter_id}-pro`,
        `${config.metadata.adapter_format} Pro`
      );
      fs.writeFileSync(path.join(adapterDir, config.proFile), proConverted);
      console.log(`✓ Converted ${platform} → ${path.join(adapterDir, config.proFile)}`);
    }
  }
}

function convertAll(targetDir = null) {
  console.log('Converting all adapters to standard format...\n');
  for (const platform of Object.keys(PLATFORM_CONFIGS)) {
    convertAdapter(platform, targetDir);
  }
  console.log('\n✓ All adapters converted');
}

const args = process.argv.slice(2);
let targetDir = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--target' && args[i + 1]) {
    targetDir = args[i + 1];
    i++;
  }
}

if (args.includes('--help')) {
  console.log('Usage:');
  console.log('  node convert-adapter.js                           Convert all adapters locally');
  console.log(
    '  node convert-adapter.js --platform <name>         Convert specific platform locally'
  );
  console.log(
    '  node convert-adapter.js --target <path>           Convert all to target directory'
  );
  console.log(
    '  node convert-adapter.js --platform <name> --target <path>  Convert specific to target'
  );
  console.log('\nAvailable platforms:', Object.keys(PLATFORM_CONFIGS).join(', '));
  console.log('\nExample:');
  console.log('  node convert-adapter.js --platform claude --target ~/.claude/skills/');
  process.exit(0);
}

if (args.includes('--platform') && args[args.indexOf('--platform') + 1]) {
  const platform = args[args.indexOf('--platform') + 1];
  convertAdapter(platform, targetDir);
} else {
  convertAll(targetDir);
}
