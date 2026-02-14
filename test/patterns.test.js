import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';

const SKILL_CORE_PATH = '.agent/skills/humanizer/modules/SKILL_CORE.md';
const SKILL_PRO_PATH = '.agent/skills/humanizer/SKILL_PROFESSIONAL.md';

test('SKILL_CORE.md integrity', async (t) => {
  assert.ok(fs.existsSync(SKILL_CORE_PATH), 'SKILL_CORE.md should exist');
  const content = fs.readFileSync(SKILL_CORE_PATH, 'utf8');

  await t.test('contains all 24 patterns', () => {
    // Check for the presence of headings for patterns 1 through 24 (General Patterns)
    for (let i = 1; i <= 24; i++) {
      const patternHeading = new RegExp(`### ${i}\\. `, 'm');
      assert.ok(patternHeading.test(content), `Pattern #${i} heading missing in SKILL_CORE.md`);
    }
  });

  await t.test('does not contain placeholders', () => {
    assert.ok(!content.includes('<<<<['), 'Found unreplaced template placeholders');
  });
});

test('Professional SKILL_PROFESSIONAL.md integrity', async (t) => {
  assert.ok(fs.existsSync(SKILL_PRO_PATH), 'SKILL_PROFESSIONAL.md should exist');
  const content = fs.readFileSync(SKILL_PRO_PATH, 'utf8');

  await t.test('contains Router Logic', () => {
    assert.ok(content.includes('Humanizer Pro'), 'Pro header identity missing');
    assert.ok(content.includes('ROUTING LOGIC'), 'Routing logic missing');
  });

  await t.test('includes module links', () => {
    assert.ok(content.includes('SKILL_CORE.md'), 'Link to Core missing');
    assert.ok(content.includes('SKILL_TECHNICAL.md'), 'Link to Technical missing');
    assert.ok(content.includes('SKILL_ACADEMIC.md'), 'Link to Academic missing');
    assert.ok(content.includes('SKILL_GOVERNANCE.md'), 'Link to Governance missing');
  });
});
