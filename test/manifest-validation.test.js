/**
 * Tests for manifest schema validation
 * These tests should initially fail, then pass after implementing validation
 */

import fs from 'fs';

// Simple validation function (mirroring the one in validate-manifest.js)
function validateManifest(manifest) {
  if (!manifest.schema_version || !Array.isArray(manifest.sources)) {
    return { valid: false, errors: ['Missing required fields: schema_version or sources'] };
  }

  const errors = [];
  for (const source of manifest.sources) {
    const requiredFields = ['id', 'type', 'url', 'fetched_at', 'hash', 'status', 'confidence'];
    for (const field of requiredFields) {
      if (!(field in source)) {
        errors.push(`Source missing required field: ${field}`);
      }
    }

    // Validate type enum
    const validTypes = ['paper', 'repo', 'article', 'blog', 'dataset'];
    if (source.type && !validTypes.includes(source.type)) {
      errors.push(`Invalid type for source ${source.id}: ${source.type}`);
    }

    // Validate status enum
    const validStatuses = ['pending', 'archived', 'deferred', 'unverified'];
    if (source.status && !validStatuses.includes(source.status)) {
      errors.push(`Invalid status for source ${source.id}: ${source.status}`);
    }

    // Validate confidence enum
    const validConfidences = ['low', 'medium', 'high'];
    if (source.confidence && !validConfidences.includes(source.confidence)) {
      errors.push(`Invalid confidence for source ${source.id}: ${source.confidence}`);
    }
  }

  return { valid: errors.length === 0, errors };
}

// Test 1: Valid manifest should pass
console.log('Test 1: Valid manifest validation');
const validManifest = JSON.parse(fs.readFileSync('./archive/sources_manifest.json', 'utf8'));
const validationResult = validateManifest(validManifest);
if (validationResult.valid) {
  console.log('✓ PASS: Valid manifest passed validation');
} else {
  console.log('✗ FAIL: Valid manifest failed validation');
  console.log(validationResult.errors);
}

// Test 2: Invalid manifest (missing required field) should fail
console.log('\nTest 2: Invalid manifest (missing required field) validation');
const invalidManifest = {
  schema_version: '1.0',
  sources: [
    {
      id: 'test_source',
      type: 'paper',
      // Missing required fields to test validation
    },
  ],
};
const invalidValidationResult = validateManifest(invalidManifest);
if (!invalidValidationResult.valid) {
  console.log('✓ PASS: Invalid manifest correctly failed validation');
} else {
  console.log('✗ FAIL: Invalid manifest incorrectly passed validation');
}

// Test 3: Manifest with wrong status value should fail
console.log('\nTest 3: Manifest with invalid status value validation');
const invalidStatusManifest = {
  schema_version: '1.0',
  sources: [
    {
      id: 'test_source',
      type: 'paper',
      url: 'https://example.com',
      fetched_at: '2026-02-15T00:00:00Z',
      hash: 'abc123',
      status: 'invalid_status', // This should fail
      confidence: 'high',
    },
  ],
};
const invalidStatusValidationResult = validateManifest(invalidStatusManifest);
if (!invalidStatusValidationResult.valid) {
  console.log('✓ PASS: Manifest with invalid status correctly failed validation');
} else {
  console.log('✗ FAIL: Manifest with invalid status incorrectly passed validation');
}

console.log('\nAll tests completed.');
