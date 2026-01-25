# Tech Stack: Humanizer (Multi-Agent Adapters)

## Current State (Brownfield)
- **Primary artifact:** Markdown (`SKILL.md`) containing the canonical Humanizer instructions.
- **Repository type:** Documentation-only; no runtime language, package manifests, or build tooling detected.
- **Consumption model:** Agent tools read prompt/instruction files (e.g., skills/workflow instructions).

## Target Integrations (Planned)
- OpenAI Codex CLI
- Gemini CLI
- Google Antigravity
- VS Code

## Constraints
- `SKILL.md` remains the canonical source of truth and should not be modified as part of adapter work.
- Adapters should be lightweight wrappers that reference/derive from the canonical rules.
