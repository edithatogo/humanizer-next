#!/usr/bin/env node

/**
 * Validates the sources manifest JSON schema
 */
import fs from 'fs';

// Simple validation without external dependencies
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

// Read and validate the manifest
const manifestPath = './archive/sources_manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const validationResult = validateManifest(manifest);

if (validationResult.valid) {
  console.log('✓ Sources manifest is valid');
  process.exit(0);
} else {
  console.error('✗ Sources manifest validation failed:');
  console.error(validationResult.errors);
  process.exit(1);
}
