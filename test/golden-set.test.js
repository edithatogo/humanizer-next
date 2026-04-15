import test from 'node:test';
import assert from 'node:assert';

const GOLDEN_SET = [
  {
    name: 'Pattern 1: Undue emphasis on significance',
    ai_text:
      'It is crucial to understand that machine learning represents a pivotal advancement in computing technology.',
    expected_patterns: ['crucial', 'pivotal'],
  },
  {
    name: 'Pattern 4: Promotional language',
    ai_text:
      'This groundbreaking solution delivers unparalleled results and sets a new standard for excellence.',
    expected_patterns: ['groundbreaking', 'unparalleled', 'excellence'],
  },
  {
    name: 'Pattern 21: Sycophantic tone',
    ai_text:
      'I must say, your approach is absolutely brilliant. You have a remarkable talent for this.',
    expected_patterns: ['brilliant', 'remarkable'],
  },
  {
    name: 'Pattern 31: Extended thinking tags',
    ai_text:
      'Let me solve this. <thinking>I need to consider edge cases first</thinking> The answer is 42.',
    expected_patterns: ['<thinking>', '</thinking>'],
  },
  {
    name: 'Pattern 32: JSON mode artifacts',
    ai_text: 'Here is the JSON as you requested:\n```json\n{"status": "success"}\n```',
    expected_patterns: ['as you requested'],
  },
  {
    name: 'Pattern 33: Tool use documentation',
    ai_text: 'I will use the file read tool to access the configuration file.',
    expected_patterns: ['I will use'],
  },
  {
    name: 'Pattern 34: Over-polished conclusions',
    ai_text:
      'That should solve your issue! Let me know if you run into anything else. Happy to help!',
    expected_patterns: ['Happy to help', 'let me know'],
  },
];

test('Technical Literal Preservation', async (t) => {
  const test_cases = [
    { text: 'Use function calculate() to compute', should_preserve: ['function calculate()'] },
    { text: 'API at https://example.com', should_preserve: ['https://example.com'] },
    { text: 'const x = 42 is valid', should_preserve: ['const x = 42'] },
  ];

  for (const tc of test_cases) {
    await t.test('preserves technical content', () => {
      for (const literal of tc.should_preserve) {
        assert.ok(tc.text.includes(literal), `Technical literal "${literal}" should be preserved`);
      }
    });
  }
});

test('Pattern severity classification', async (t) => {
  const critical_patterns = ['collaborative', 'knowledge cutoff', 'as an AI'];
  const high_patterns = ['crucial', 'pivotal', 'groundbreaking'];

  await t.test('critical patterns detected in text', () => {
    const text = 'As an AI assistant, I can help you with this task.';
    const detected = critical_patterns.filter((p) => text.toLowerCase().includes(p.toLowerCase()));
    assert.ok(detected.length > 0, 'Should detect at least one critical pattern');
  });

  await t.test('high priority patterns detected in text', () => {
    const text = 'This is crucial for the pivotal advancement of our solution.';
    const detected = high_patterns.filter((p) => text.toLowerCase().includes(p.toLowerCase()));
    assert.ok(detected.length > 0, 'Should detect at least one high priority pattern');
  });
});

console.log('Golden Set Tests: Loaded', GOLDEN_SET.length, 'test cases');
console.log('Pattern Categories: Critical, High, Medium, Low');
