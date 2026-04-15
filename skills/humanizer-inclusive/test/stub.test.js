const assert = require('assert');
const { InclusiveChecker } = require('../lib/index');

console.log("Running humanizer-inclusive stub tests...");
const ic = new InclusiveChecker();
const result = ic.assess("Some text to check.");
assert.strictEqual(result.status, 'stub');
assert.strictEqual(ic.fix("hello"), "hello");
console.log("humanizer-inclusive stub tests passed!");
