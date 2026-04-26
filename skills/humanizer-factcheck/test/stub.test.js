const assert = require('assert');
const { FactChecker } = require('../lib/index');

console.log("Running humanizer-factcheck stub tests...");
const fc = new FactChecker();
const result = fc.assess("The earth is flat.");
assert.strictEqual(result.status, 'stub');
assert.strictEqual(fc.fix("hello"), "hello");
console.log("humanizer-factcheck stub tests passed!");
