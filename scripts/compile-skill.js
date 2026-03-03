#!/usr/bin/env node

/**
 * Skill Compiler for Modular Architecture (ADR-001)
 * 
 * Assembles SKILL.md and SKILL_PROFESSIONAL.md from modular source files.
 * 
 * Usage: node scripts/compile-skill.js
 * 
 * Module Structure:
 * - src/modules/SKILL_CORE_PATTERNS.md (required)
 * - src/modules/SKILL_TECHNICAL.md (optional)
 * - src/modules/SKILL_ACADEMIC.md (optional)
 * - src/modules/SKILL_GOVERNANCE.md (optional)
 * - src/modules/SKILL_REASONING.md (optional, already exists)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

/**
 * Module configuration
 */
const MODULES = {
  core: 'src/modules/SKILL_CORE_PATTERNS.md',
  technical: 'src/modules/SKILL_TECHNICAL.md',
  academic: 'src/modules/SKILL_ACADEMIC.md',
  governance: 'src/modules/SKILL_GOVERNANCE.md',
  reasoning: 'src/modules/SKILL_REASONING.md'
};

/**
 * Output files
 */
const OUTPUT = {
  skill: 'SKILL.md',
  skillPro: 'SKILL_PROFESSIONAL.md'
};

/**
 * Read module file with error handling
 */
function readModule(modulePath) {
  const fullPath = path.join(ROOT_DIR, modulePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Module not found: ${modulePath} (optional)`);
    return null;
  }
  
  console.log(`✓ Reading module: ${modulePath}`);
  return fs.readFileSync(fullPath, 'utf-8');
}

/**
 * Extract frontmatter from module
 */
function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const frontmatter = {};
  const lines = match[1].split('\n');
  
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      frontmatter[key.trim()] = valueParts.join(':').trim();
    }
  }
  
  return frontmatter;
}

/**
 * Compile Standard SKILL.md
 * 
 * For now, this is a pass-through that copies SKILL.md from src/ if it exists,
 * or uses the root SKILL.md as the source of truth.
 * 
 * TODO: When modules are fully extracted, assemble from modules.
 */
function compileStandardSkill() {
  console.log('\n=== Compiling Standard Humanizer ===');
  
  // For Phase 1: Use existing SKILL.md as source
  // This maintains backward compatibility while we extract modules
  const skillPath = path.join(ROOT_DIR, OUTPUT.skill);
  
  if (!fs.existsSync(skillPath)) {
    throw new Error(`SKILL.md not found at ${skillPath}`);
  }
  
  console.log('✓ Standard SKILL.md exists (using as source of truth)');
  console.log('  Note: Module extraction in progress - see ADR-001');
  
  return fs.readFileSync(skillPath, 'utf-8');
}

/**
 * Compile Professional SKILL_PROFESSIONAL.md
 * 
 * Assembles from:
 * - Frontmatter (version, description, allowed-tools)
 * - Introduction & routing logic
 * - Core patterns module (always included)
 * - Specialized modules (technical, academic, governance, reasoning)
 * - Voice and craft section
 */
function compileProfessionalSkill() {
  console.log('\n=== Compiling Humanizer Pro ===');
  
  // Read existing SKILL_PROFESSIONAL.md as template
  const proPath = path.join(ROOT_DIR, OUTPUT.skillPro);
  
  if (!fs.existsSync(proPath)) {
    throw new Error(`SKILL_PROFESSIONAL.md not found at ${proPath}`);
  }
  
  console.log('✓ SKILL_PROFESSIONAL.md exists');
  
  // Read available modules
  const modules = {};
  for (const [key, modulePath] of Object.entries(MODULES)) {
    modules[key] = readModule(modulePath);
  }
  
  // Check which modules are available
  const availableModules = Object.entries(modules)
    .filter(([_, content]) => content !== null)
    .map(([key, _]) => key);
  
  console.log(`✓ Available modules: ${availableModules.join(', ')}`);
  
  // For Phase 1: Use existing SKILL_PROFESSIONAL.md
  // Update module references to point to actual files
  let content = fs.readFileSync(proPath, 'utf-8');
  
  // Update version from core module if available
  if (modules.core) {
    const frontmatter = extractFrontmatter(modules.core);
    if (frontmatter && frontmatter.version) {
      console.log(`✓ Updating version to ${frontmatter.version}`);
      content = content.replace(/version: [\d.]+/, `version: ${frontmatter.version}`);
    }
  }
  
  // Verify module references
  const expectedModules = [
    'modules/SKILL_CORE_PATTERNS.md',
    'modules/SKILL_TECHNICAL.md',
    'modules/SKILL_ACADEMIC.md',
    'modules/SKILL_GOVERNANCE.md',
    'modules/SKILL_REASONING.md'
  ];
  
  console.log('\n⚠️  Module references in SKILL_PROFESSIONAL.md:');
  for (const moduleRef of expectedModules) {
    const moduleExists = fs.existsSync(path.join(ROOT_DIR, 'src', moduleRef));
    console.log(`  ${moduleExists ? '✓' : '⚠️  Missing'}: ${moduleRef}`);
  }
  
  return content;
}

/**
 * Update adapter frontmatter with new version
 */
function updateAdapterMetadata(version) {
  console.log('\n=== Updating Adapter Metadata ===');
  
  const adapters = [
    '.agent/skills/humanizer/SKILL.md',
    '.agent/skills/humanizer/SKILL_PROFESSIONAL.md',
    'adapters/antigravity-skill/SKILL.md',
    'adapters/antigravity-skill/SKILL_PROFESSIONAL.md',
    'adapters/gemini-extension/GEMINI.md',
    'adapters/gemini-extension/GEMINI_PRO.md'
  ];
  
  for (const adapterPath of adapters) {
    const fullPath = path.join(ROOT_DIR, adapterPath);
    
    if (!fs.existsSync(fullPath)) {
      continue;
    }
    
    let content = fs.readFileSync(fullPath, 'utf-8');
    const oldVersion = content.match(/skill_version: ([\d.]+)/);
    
    if (oldVersion && oldVersion[1] !== version) {
      content = content.replace(/skill_version: [\d.]+/, `skill_version: ${version}`);
      fs.writeFileSync(fullPath, content, 'utf-8');
      console.log(`✓ Updated ${adapterPath}: ${oldVersion[1]} → ${version}`);
    }
  }
}

/**
 * Main compilation process
 */
function compile() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║  Humanizer Skill Compiler (ADR-001)   ║');
  console.log('╚════════════════════════════════════════╝');
  
  try {
    // Compile Standard
    compileStandardSkill();
    
    // Compile Professional
    const proContent = compileProfessionalSkill();
    
    // Extract version for adapter updates
    const versionMatch = proContent.match(/version: ([\d.]+)/);
    const version = versionMatch ? versionMatch[1] : '3.0.0';
    
    // Update adapter metadata
    updateAdapterMetadata(version);
    
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║  ✓ Compilation Complete              ║');
    console.log('╚════════════════════════════════════════╝');
    console.log(`\nVersion: ${version}`);
    console.log('Status: Phase 1 - Backward Compatible');
    console.log('Next: Extract modules from SKILL.md');
    
  } catch (error) {
    console.error('\n❌ Compilation failed:');
    console.error(error.message);
    process.exit(1);
  }
}

// Run compilation
compile();
