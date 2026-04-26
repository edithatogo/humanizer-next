#!/usr/bin/env node
/**
 * install-copilot.js
 *
 * Installs the Humanizer skill as GitHub Copilot custom instructions.
 *
 * Copilot reads custom instructions from:
 *   <repo-root>/.github/copilot-instructions.md
 *
 * Run: npm run install:copilot
 * Or for a manual repo: node scripts/install-copilot.js --target <repo-path>
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const targetIdx = args.indexOf('--target');
const targetRepo = targetIdx !== -1 ? args[targetIdx + 1] : process.cwd();

const sourceAdapter = path.join(REPO_ROOT, 'adapters', 'copilot', 'SKILL.md');
const destDir = path.join(targetRepo, '.github');
const destFile = path.join(destDir, 'copilot-instructions.md');

if (!fs.existsSync(sourceAdapter)) {
  console.error('Copilot adapter not found. Run `npm run sync` first.');
  process.exit(1);
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(sourceAdapter, destFile);
console.log(`✓ Humanizer installed as Copilot instructions → ${destFile}`);
console.log(
  `\nTo activate: open VS Code with GitHub Copilot and the instructions will be auto-loaded.`
);
console.log(`Docs: https://code.visualstudio.com/docs/copilot/copilot-customization`);
