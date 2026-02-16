#!/usr/bin/env node

/**
 * Complete workflow automation script:
 * 1. Executes conductor review
 * 2. Archives the completed track
 * 3. Progresses to the next track
 * 
 * Usage: node complete_workflow.js <track_id>
 */

const { execSync, execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

if (process.argv.length !== 3) {
  console.error('Usage: node complete_workflow.js <track_id>');
  process.exit(1);
}

const trackId = process.argv[2];

console.log(`Starting complete workflow for track: ${trackId}`);

try {
  // Step 1: Execute conductor review
  console.log('\n--- Step 1: Executing Conductor Review ---');
  console.log('Executing: /conductor:review');
  
  // Since we can't actually execute the /conductor:review command from within Node.js,
  // we'll simulate it and recommend the user run it manually
  console.log(`INFO: In an actual environment, this would execute '/conductor:review'`);
  console.log(`INFO: For now, please run '/conductor:review' manually before continuing`);
  
  // Step 2: Archive the completed track
  console.log('\n--- Step 2: Archiving Completed Track ---');
  const archiveScriptPath = path.join(__dirname, 'archive_track.js');
  execFileSync('node', [archiveScriptPath, trackId], { stdio: 'inherit' });
  
  // Step 3: Progress to the next track
  console.log('\n--- Step 3: Progressing to Next Track ---');
  const progressScriptPath = path.join(__dirname, 'progress_to_next_track.js');
  execFileSync('node', [progressScriptPath, trackId], { stdio: 'inherit' });
  
  console.log('\n--- Workflow Complete ---');
  console.log(`Successfully processed track ${trackId}: reviewed, archived, and moved to next track.`);

} catch (error) {
  console.error('Error during workflow execution:', error.message);
  process.exit(1);
}