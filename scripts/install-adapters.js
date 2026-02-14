import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const BUNDLED_SKILL = path.join(ROOT_DIR, 'dist', 'humanizer-pro.bundled.md');
const USER_HOME = os.homedir();

/**
 * Copy bundled adapter content to a destination.
 * @param {string} name
 * @param {string} destDir
 * @param {string} [destFilename='GEMINI.md']
 */
function installTo(name, destDir, destFilename = 'GEMINI.md') {
  console.log(`Installing ${name}...`);
  try {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const destPath = path.join(destDir, destFilename);

    // Use bundled skill if available, otherwise check for source adapter
    if (fs.existsSync(BUNDLED_SKILL)) {
      fs.copyFileSync(BUNDLED_SKILL, destPath);
      console.log(`  [OK] Installed bundled skill to: ${destPath}`);
    } else {
      console.error(`  [FAIL] Bundled skill not found. Run 'npm run build' first.`);
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error(`  [FAIL] Could not install ${name}: ${message}`);
  }
}

console.log('--- Universal Humanizer Installer ---');

// 1. Gemini CLI
installTo('Gemini CLI', path.join(USER_HOME, '.gemini', 'extensions', 'humanizer'), 'GEMINI.md');

// 2. Qwen CLI
installTo('Qwen CLI', path.join(USER_HOME, '.qwen', 'extensions', 'humanizer'), 'QWEN.md');

// 3. Codex CLI
installTo('Codex CLI', path.join(USER_HOME, '.codex', 'extensions', 'humanizer'), 'CODEX.md');

// 4. Google Antigravity (Workspace)
installTo('Antigravity Skill', path.join(ROOT_DIR, '.agent', 'skills', 'humanizer'), 'SKILL.md');

// 5. VS Code (Workspace - typically requires global snippet install but copying to local for now as per previous pattern)
// Note: VS Code snippets are JSON, this markdown file is for context.
installTo('VS Code Context', path.join(ROOT_DIR, '.vscode'), 'HUMANIZER.md');

console.log('--- Installation Complete ---');
