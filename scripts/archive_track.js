#!/usr/bin/env node

/**
 * Script to archive a completed track
 * Usage: node archive_track.js <track_id>
 */

const fs = require('fs');
const path = require('path');

if (process.argv.length !== 3) {
  console.error('Usage: node archive_track.js <track_id>');
  process.exit(1);
}

const trackId = process.argv[2];
const tracksRegistryPath = path.join(__dirname, '..', 'conductor', 'tracks.md');
const trackPath = path.join(__dirname, '..', 'conductor', 'tracks', trackId);

// Validate that the track exists
if (!fs.existsSync(trackPath)) {
  console.error(`Error: Track ${trackId} does not exist at ${trackPath}`);
  process.exit(1);
}

// Read the tracks registry
const tracksRegistryContent = fs.readFileSync(tracksRegistryPath, 'utf8');

// Update the track's metadata.json to archived status
const metadataPath = path.join(trackPath, 'metadata.json');
if (fs.existsSync(metadataPath)) {
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  metadata.status = 'archived';
  metadata.updated_at = new Date().toISOString();
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  console.log(`Updated ${trackId}/metadata.json to archived status`);
} else {
  console.warn(`Warning: metadata.json not found at ${metadataPath}`);
}

// Read the current tracks registry and update it
let updatedContent = tracksRegistryContent;

// Find the track in the active tracks section and move it to archived
const trackRegex = new RegExp(
  `(### ${trackId}|## \\[ \\] Track:.*?${trackId})[\\s\\S]*?_Link: \\[(?:\\.\\/)?tracks\\/${trackId}\\/(?:\\.\\/)?\\)_\\n`,
  'i'
);

const trackMatch = tracksRegistryContent.match(trackRegex);

if (trackMatch) {
  const matchedSection = trackMatch[0];

  // Replace the active track status with completed [x]
  const archivedSection = matchedSection
    .replace(/## \[ \] Track:/, '## [x] Track:')
    .replace(/### \d+\. \[ \]/, '### [x]')
    .replace(/\*\*Status:\*\* new/, '**Status:** completed')
    .replace(/\*\*Status:\*\* blocked/, '**Status:** completed')
    .replace(/\*\*Status:\*\* in_progress/, '**Status:** completed');

  // Remove the track from active section
  updatedContent = tracksRegistryContent.replace(matchedSection, '');

  // Add the track to the archived section
  if (updatedContent.includes('## Archived Tracks')) {
    updatedContent = updatedContent.replace(
      /(## Archived Tracks[\s\n]+)/,
      `$1${archivedSection}\n`
    );
  } else {
    // If no archived section exists, create one
    updatedContent += `\n## Archived Tracks\n\n${archivedSection}`;
  }

  // Write the updated content back to the file
  fs.writeFileSync(tracksRegistryPath, updatedContent);
  console.log(`Moved track ${trackId} from active to archived in tracks registry`);
} else {
  console.warn(`Warning: Could not find track ${trackId} in the tracks registry`);
}

console.log(`Track ${trackId} has been archived successfully.`);
