# Product Guide: Humanizer (Agent-Agnostic Skill/Workflow Pack)

## Summary
Humanizer is a set of writing-editing instructions that removes common “AI voice” patterns from text while preserving meaning and tone. Today it is packaged as a Claude Code skill (`SKILL.md`). The next step is to expand it into a multi-agent deliverable that can be used consistently across popular coding agents, while keeping `SKILL.md` as the canonical source of truth.

## Primary Users
- People using coding agents who want their writing to sound natural and human (docs, READMEs, PRDs, changelogs, comments, emails)
- Maintainers who want a consistent editing workflow across multiple agent environments

## Target Environments (Initial)
- OpenAI Codex CLI
- Gemini CLI
- Google Antigravity
- VS Code

## Goals
- Keep `SKILL.md` as the canonical, most detailed definition of Humanizer behavior.
- Produce “skills” or “workflows” for each target environment that preserve the same editing intent and pattern coverage.
- Make it easy to apply Humanizer consistently across agents without rewriting or manually re-syncing the instruction set.

## Non-Goals (for initial rollout)
- Rewriting the underlying Humanizer guidance into a fundamentally different editorial philosophy.
- Building a full standalone rewriting app; focus remains on agent-facing skills/workflows.

## Key Product Decisions
- Single source of truth: `SKILL.md`
- Adapter strategy: generate or maintain thin, environment-specific wrappers that reference/derive from the canonical rules.

## Deliverables
- Canonical:
  - `SKILL.md` remains the primary, authoritative instruction document.
- Environment adapters (format depends on each environment’s supported mechanism):
  - Codex CLI: repo instructions/workflow that can be invoked as a consistent “Humanizer” behavior.
  - Gemini CLI: skill/workflow wrapper aligned with Gemini’s conventions.
  - VS Code: workflow/instructions packaged in a way that is easy to apply during editing.
  - Google Antigravity: workflow/instructions packaged in its supported format.

## Quality Bar
- Adapters remain consistent with `SKILL.md` in:
  - Pattern coverage (the same core “AI writing signs”)
  - Output expectations (rewrite + optional brief change summary)
  - Tone control (preserve intended voice; avoid sterile or robotic rewrites)
- Documentation clearly states:
  - Which file is canonical (`SKILL.md`)
  - What each adapter is for and how to use it

## Success Criteria
- A user can use Humanizer in each target environment with minimal friction.
- Updates to `SKILL.md` can be propagated to adapters without drift.
- Users report the output sounds more natural without losing meaning or context.
