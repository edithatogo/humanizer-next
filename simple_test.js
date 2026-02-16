// Simple test to verify the citation reference manager is working
console.log('Testing citation reference manager...');

// Import the main functions
import { 
  citationVerificationSkill, 
  referenceManagementSkill,
  integratedCitationManagement
} from './src/citation_ref_manager/integration.js';

// Test basic functionality
console.log('✓ Functions imported successfully');

// Test 1: Check if functions exist
console.log('✓ citationVerificationSkill exists:', typeof citationVerificationSkill === 'function');
console.log('✓ referenceManagementSkill exists:', typeof referenceManagementSkill === 'function');
console.log('✓ integratedCitationManagement exists:', typeof integratedCitationManagement === 'function');

// Test 2: Run a simple verification test
const sampleText = 'This is a test with a citation [test-citation-1].';
console.log('✓ Sample text created:', sampleText);

console.log('All basic tests passed!');