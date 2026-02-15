#!/usr/bin/env node

/**
 * Citation Normalization Helper
 * Standardizes citation entries for research documentation
 */

import fs from 'fs';
import path from 'path';

/**
 * Normalize a citation object to standard format
 * @param {Object} citation - Raw citation object
 * @returns {Object} Normalized citation object
 */
function normalizeCitation(citation) {
  // Ensure required fields exist
  const normalized = {
    id: citation.id || generateId(citation),
    title: citation.title || '',
    authors: Array.isArray(citation.authors) ? citation.authors : (citation.authors || '').split(', '),
    year: citation.year || citation.date?.substring(0, 4) || null,
    source: citation.source || 'unknown',
    url: citation.url || '',
    doi: citation.doi || citation.DOI || '',
    confidence: citation.confidence || 'medium', // Default confidence level
    claimSummary: citation.claimSummary || citation.summary || '',
    reasoningCategory: citation.reasoningCategory || citation.category || '',
    fetchedAt: citation.fetchedAt || new Date().toISOString(),
    status: citation.status || 'verified' // Default status
  };

  // Clean up authors array
  normalized.authors = normalized.authors.map(author => author.trim()).filter(author => author);

  return normalized;
}

/**
 * Generate an ID based on citation properties
 * @param {Object} citation - Citation object
 * @returns {string} Generated ID
 */
function generateId(citation) {
  const firstAuthor = citation.authors?.[0]?.split(' ')?.pop() || citation.author || 'Unknown';
  const year = citation.year || citation.date?.substring(0, 4) || 'XXXX';
  return `${firstAuthor.toLowerCase()}_${year}`;
}

/**
 * Normalize a file containing citations
 * @param {string} filePath - Path to the citations file
 */
function normalizeCitationsFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let citations = [];

    // Try to parse as JSON first
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        citations = parsed;
      } else if (parsed.citations) {
        citations = parsed.citations;
      } else {
        citations = [parsed];
      }
    } catch (e) {
      // If not JSON, try to parse as markdown or other format
      console.error('File is not in JSON format. This helper only works with JSON citation files.');
      return;
    }

    // Normalize each citation
    const normalizedCitations = citations.map(normalizeCitation);

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(normalizedCitations, null, 2));
    console.log(`Normalized ${normalizedCitations.length} citations in ${filePath}`);
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message);
  }
}

/**
 * Validate a citation against the schema
 * @param {Object} citation - Citation to validate
 * @returns {Array} List of validation errors
 */
function validateCitation(citation) {
  const errors = [];

  if (!citation.id) errors.push('ID is required');
  if (!citation.title) errors.push('Title is required');
  if (!citation.authors || citation.authors.length === 0) errors.push('Authors are required');
  if (!citation.year) errors.push('Year is required');
  if (!citation.source) errors.push('Source is required');
  if (!citation.confidence) errors.push('Confidence level is required');
  if (!['high', 'medium', 'low'].includes(citation.confidence)) {
    errors.push('Confidence must be high, medium, or low');
  }

  return errors;
}

// Main execution
if (process.argv.length < 3) {
  console.log(`
Usage: node citation-normalize.js <file_path>

This script normalizes citation entries in a JSON file to standard format.
It ensures all required fields are present and properly formatted.
`);
  process.exit(0);
}

const filePath = process.argv[2];
normalizeCitationsFile(filePath);