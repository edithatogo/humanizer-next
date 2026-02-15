/**
 * Tests for taxonomy consistency and threshold constraints
 * These tests verify that the reasoning-failure taxonomy is properly implemented
 */

import fs from 'fs';

// Test 1: Verify taxonomy schema exists and is properly formatted
console.log("Test 1: Verifying taxonomy schema exists and is properly formatted");

try {
  const taxonomyPath = './docs/reasoning-failures-taxonomy.md';
  const taxonomyContent = fs.readFileSync(taxonomyPath, 'utf8');
  
  // Check if key sections exist
  const hasCategories = taxonomyContent.includes('## Taxonomy Schema');
  const hasEvidenceThreshold = taxonomyContent.includes('Evidence Threshold Rules');
  const hasMappingRules = taxonomyContent.includes('Mapping Rules');
  
  if (hasCategories && hasEvidenceThreshold && hasMappingRules) {
    console.log("✓ PASS: Taxonomy schema contains all required sections");
  } else {
    console.log("✗ FAIL: Taxonomy schema missing required sections");
    console.log(`  Has categories section: ${hasCategories}`);
    console.log(`  Has evidence threshold section: ${hasEvidenceThreshold}`);
    console.log(`  Has mapping rules section: ${hasMappingRules}`);
  }
} catch (error) {
  console.log("✗ FAIL: Could not read taxonomy file:", error.message);
}

// Test 2: Verify evidence threshold rules are properly defined
console.log("\nTest 2: Verifying evidence threshold rules are properly defined");

try {
  const taxonomyContent = fs.readFileSync('./docs/reasoning-failures-taxonomy.md', 'utf8');
  
  const hasMinimalThreshold = taxonomyContent.includes('Minimal Evidence Threshold for New Categories');
  const hasQualityRequirements = taxonomyContent.includes('Evidence Quality Requirements');
  
  if (hasMinimalThreshold && hasQualityRequirements) {
    console.log("✓ PASS: Evidence threshold rules are properly defined");
  } else {
    console.log("✗ FAIL: Evidence threshold rules are not properly defined");
    console.log(`  Has minimal threshold section: ${hasMinimalThreshold}`);
    console.log(`  Has quality requirements section: ${hasQualityRequirements}`);
  }
} catch (error) {
  console.log("✗ FAIL: Could not read taxonomy file:", error.message);
}

// Test 3: Verify changelog exists and is properly formatted
console.log("\nTest 3: Verifying taxonomy changelog exists and is properly formatted");

try {
  const changelogPath = './docs/TAXONOMY_CHANGELOG.md';
  const changelogContent = fs.readFileSync(changelogPath, 'utf8');
  
  const hasVersionHistory = changelogContent.includes('## Version History');
  const hasChangeProcess = changelogContent.includes('Change Request Process');
  const hasReviewCadence = changelogContent.includes('Review Cadence');
  
  if (hasVersionHistory && hasChangeProcess && hasReviewCadence) {
    console.log("✓ PASS: Taxonomy changelog contains all required sections");
  } else {
    console.log("✗ FAIL: Taxonomy changelog missing required sections");
    console.log(`  Has version history: ${hasVersionHistory}`);
    console.log(`  Has change process: ${hasChangeProcess}`);
    console.log(`  Has review cadence: ${hasReviewCadence}`);
  }
} catch (error) {
  console.log("✗ FAIL: Could not read changelog file:", error.message);
}

// Test 4: Verify research log exists and follows expected format
console.log("\nTest 4: Verifying research log exists and follows expected format");

try {
  const researchLogPath = './docs/reasoning-failures-research-log.md';
  const researchLogContent = fs.readFileSync(researchLogPath, 'utf8');
  
  const hasPrimarySources = researchLogContent.includes('## Primary Sources');
  const hasPapersSection = researchLogContent.includes('### Papers');
  const hasRepositoriesSection = researchLogContent.includes('### Repositories');
  const hasConfidenceScale = researchLogContent.includes('## Confidence Scale');
  
  if (hasPrimarySources && hasPapersSection && hasRepositoriesSection && hasConfidenceScale) {
    console.log("✓ PASS: Research log contains all required sections");
  } else {
    console.log("✗ FAIL: Research log missing required sections");
    console.log(`  Has primary sources: ${hasPrimarySources}`);
    console.log(`  Has papers section: ${hasPapersSection}`);
    console.log(`  Has repositories section: ${hasRepositoriesSection}`);
    console.log(`  Has confidence scale: ${hasConfidenceScale}`);
  }
} catch (error) {
  console.log("✗ FAIL: Could not read research log file:", error.message);
}

// Test 5: Verify deferred claims document exists
console.log("\nTest 5: Verifying deferred claims document exists");

try {
  const deferredClaimsPath = './docs/deferred-claims-reasoning-failures.md';
  const deferredClaimsContent = fs.readFileSync(deferredClaimsPath, 'utf8');
  
  const hasDeferredSection = deferredClaimsContent.includes('## Claims Requiring Verification');
  const hasPrioritiesSection = deferredClaimsContent.includes('## Verification Priorities');
  const hasFollowUpSection = deferredClaimsContent.includes('## Follow-up Actions');
  
  if (hasDeferredSection && hasPrioritiesSection && hasFollowUpSection) {
    console.log("✓ PASS: Deferred claims document contains all required sections");
  } else {
    console.log("✗ FAIL: Deferred claims document missing required sections");
    console.log(`  Has deferred section: ${hasDeferredSection}`);
    console.log(`  Has priorities section: ${hasPrioritiesSection}`);
    console.log(`  Has follow-up section: ${hasFollowUpSection}`);
  }
} catch (error) {
  console.log("✗ FAIL: Could not read deferred claims file:", error.message);
}

// Test 6: Verify conflict resolution rules exist
console.log("\nTest 6: Verifying conflict resolution rules exist");

try {
  const conflictRulesPath = './docs/conflict-resolution-rules.md';
  const conflictRulesContent = fs.readFileSync(conflictRulesPath, 'utf8');
  
  const hasTieBreakPolicy = conflictRulesContent.includes('## Tie-Break Policy');
  const hasAuthorityRanking = conflictRulesContent.includes('Authority Ranking');
  const hasResolutionProcess = conflictRulesContent.includes('Resolution Process');
  
  if (hasTieBreakPolicy && hasAuthorityRanking && hasResolutionProcess) {
    console.log("✓ PASS: Conflict resolution rules contain all required sections");
  } else {
    console.log("✗ FAIL: Conflict resolution rules missing required sections");
    console.log(`  Has tie-break policy: ${hasTieBreakPolicy}`);
    console.log(`  Has authority ranking: ${hasAuthorityRanking}`);
    console.log(`  Has resolution process: ${hasResolutionProcess}`);
  }
} catch (error) {
  console.log("✗ FAIL: Could not read conflict resolution rules file:", error.message);
}

console.log("\nAll taxonomy and evidence threshold tests completed.");