const assert = require('assert');
const { StructureChecker } = require('../lib/index');

console.log("Running humanizer-structure stub tests...");
const sc = new StructureChecker();
const result = sc.assess("# Heading\nSome paragraph.");
assert.strictEqual(result.status, 'stub');
assert.strictEqual(sc.fix("hello"), "hello");
console.log("humanizer-structure stub tests passed!");
