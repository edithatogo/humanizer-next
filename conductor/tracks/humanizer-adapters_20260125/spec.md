# Spec: Build multi-agent Humanizer adapters

## Overview
This track packages the existing Humanizer skill so it can be used across multiple coding-agent environments (Codex CLI, Gemini CLI, Google Antigravity, VS Code) while keeping SKILL.md as the canonical, unchanged source of truth.

## Requirements
- Keep SKILL.md unchanged.
- Add environment-specific adapter artifacts so users can apply the Humanizer workflow in:
  - OpenAI Codex CLI
  - Gemini CLI
  - Google Antigravity
  - VS Code
- Adapters must:
  - Reference the SKILL.md ersion: they are derived from.
  - Include a last synced marker (date).
  - Specify output format: rewritten text + short bullet change summary.
  - Preserve technical literals (inline code, fenced code blocks, URLs, paths, identifiers).
  - Preserve Markdown structure unless a localized rewrite requires touching it.

## Acceptance Criteria
- Repository contains clear, discoverable adapter instructions for each target environment.
- Canonical behavior remains in SKILL.md.
- Documentation explains where to start and how to use each adapter.
- A simple sync step (manual or scripted) can update adapter metadata (version/date) without editing SKILL.md.

## Out of Scope
- Implementing a standalone rewriting application.
- Changing the editorial rules inside SKILL.md.
