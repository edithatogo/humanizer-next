#!/usr/bin/env node
/**
 * Unified V4 Skill Test Runner
 * Runs all skill test suites from a single entrypoint.
 */

const { execSync } = require('child_process');
const path = require('path');

const SKILL_TESTS = [
    // humanizer-next (Phase 3)
    'skills/humanizer-next/test/cli.test.js',
    'skills/humanizer-next/test/fixes.test.js',
    'skills/humanizer-next/test/isolation.test.js',
    'skills/humanizer-next/test/tone.test.js',
    // humanizer-orchestrate (Phase 4)
    'skills/humanizer-orchestrate/test/mcp-server.test.js',
    'skills/humanizer-orchestrate/test/swarmer.test.js',
    'skills/humanizer-orchestrate/test/formatter.test.js',
    // humanizer-logic (Phase 5)
    'skills/humanizer-logic/test/critique.test.js',
    'skills/humanizer-logic/test/glossary.test.js',
    'skills/humanizer-logic/test/telemetry.test.js',
    'skills/humanizer-logic/test/reasoning.test.js',
    // humanizer-read (Phase 6)
    'skills/humanizer-read/test/bench.test.js',
    'skills/humanizer-read/test/similarity.test.js',
    // Stub skills
    'skills/humanizer-cite/test/stub.test.js',
    'skills/humanizer-cite/test/formatting.test.js',
    'skills/humanizer-factcheck/test/stub.test.js',
    'skills/humanizer-inclusive/test/stub.test.js',
    'skills/humanizer-structure/test/stub.test.js',
];

let passed = 0;
let failed = 0;

console.log(`\n=== Humanizer V4 Skill Test Runner ===`);
console.log(`Running ${SKILL_TESTS.length} test suites...\n`);

for (const testFile of SKILL_TESTS) {
    const label = testFile.replace('skills/', '');
    try {
        execSync(`node ${testFile}`, { cwd: process.cwd(), stdio: 'pipe' });
        console.log(`  ✓ ${label}`);
        passed++;
    } catch (err) {
        console.error(`  ✗ ${label}`);
        if (err.stderr) console.error(`    ${err.stderr.toString().trim()}`);
        if (err.stdout) console.error(`    ${err.stdout.toString().trim()}`);
        failed++;
    }
}

console.log(`\n--- Results: ${passed} passed, ${failed} failed, ${SKILL_TESTS.length} total ---\n`);

if (failed > 0) {
    process.exit(1);
}
