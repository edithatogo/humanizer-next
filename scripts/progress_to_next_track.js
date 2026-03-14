#!/usr/bin/env node

/**
 * Script to progress to the next track after completing a track
 * Usage: node progress_to_next_track.js <completed_track_id>
 */

const fs = require('fs');
const path = require('path');

if (process.argv.length !== 3) {
  console.error('Usage: node progress_to_next_track.js <completed_track_id>');
  process.exit(1);
}

const completedTrackId = process.argv[2];
const tracksRegistryPath = path.join(__dirname, '..', 'conductor', 'tracks.md');

// Read the tracks registry
const tracksRegistryContent = fs.readFileSync(tracksRegistryPath, 'utf8');

// Find the next pending track in the priority order
const lines = tracksRegistryContent.split('\n');
let nextTrackId = '';

// Look for the next track that is not completed
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Look for a track that is not yet completed ([ ])
  if (line.trim().startsWith('### ') && line.includes('[ ]')) {
    // For now, just pick the first available track
    // In a more sophisticated system, we'd check dependencies
    if (line.includes('Track:')) {
      const trackMatch = line.match(/### \d+\. \[ \] ([^_]*)/);
      if (trackMatch) {
        nextTrackId = trackMatch[1].trim();
        break;
      }
    } else if (line.includes('./tracks/')) {
      // Handle the newer format
      const trackMatch = line.match(/\[(.*?)\]\(\.\/tracks\/([^\/]+)\//);
      if (trackMatch) {
        nextTrackId = trackMatch[2].trim();
        break;
      }
    }
  }
}

if (nextTrackId) {
  // Update the next track's first task to [~] (in progress)
  const nextTrackPath = path.join(__dirname, '..', 'conductor', 'tracks', nextTrackId, 'plan.md');

  if (fs.existsSync(nextTrackPath)) {
    const nextTrackContent = fs.readFileSync(nextTrackPath, 'utf8');

    // Find the first pending task ([ ]) and mark it as in-progress ([~])
    const updatedContent = nextTrackContent.replace(/\[ \] Task:/, '[~] Task:');

    if (updatedContent !== nextTrackContent) {
      fs.writeFileSync(nextTrackPath, updatedContent);
      console.log(`Started work on next track: ${nextTrackId} - marked first task as in-progress`);
    } else {
      console.log(`Could not find a pending task to start in track: ${nextTrackId}`);
    }
  } else {
    console.error(
      `Error: Plan file does not exist for next track: ${nextTrackId} at ${nextTrackPath}`
    );
  }
} else {
  console.log('No more pending tracks found in the registry.');
}

console.log(
  `Completed processing after track ${completedTrackId}. Ready to work on ${nextTrackId || 'no more tracks'}.`
);
