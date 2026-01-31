# Spec: Create a Gemini CLI extension adapter for Humanizer

## Overview
Create a Gemini CLI extension that wraps the existing Humanizer SKILL.md without modifying it. The adapter should follow Gemini CLI extension conventions and provide a clear entrypoint for users to apply the Humanizer workflow.

## References
- https://geminicli.com/docs/extensions/writing-extensions/

## Requirements
- Keep SKILL.md unchanged and canonical.
- Add Gemini CLI extension artifacts (manifest, entrypoint, optional commands) that reference SKILL.md for the behavioral source of truth.
- Provide a GEMINI.md or equivalent context file if required by Gemini CLI extensions.
- Include adapter metadata: SKILL.md version reference and last synced date.
- Preserve technical literals (inline code, fenced code blocks, URLs, paths, identifiers) in adapter guidance.

## Acceptance Criteria
- Repository includes a Gemini CLI extension directory with required files and a clear usage path.
- Instructions explain how to install, link, and run the extension locally.
- Adapter metadata references the SKILL.md version and last synced date.

## Out of Scope
- Publishing to an external registry.
- Changing SKILL.md contents.
