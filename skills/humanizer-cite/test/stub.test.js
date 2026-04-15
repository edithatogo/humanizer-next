const assert = require('assert');
const { CitationNormalizer } = require('../lib/index');

console.log("Running humanizer-cite stub tests...");
const cn = new CitationNormalizer();
const result = cn.assess("Some text with a citation.");
assert.strictEqual(result.status, 'stub');
assert.strictEqual(cn.fix("hello"), "hello");
console.log("humanizer-cite stub tests passed!");
