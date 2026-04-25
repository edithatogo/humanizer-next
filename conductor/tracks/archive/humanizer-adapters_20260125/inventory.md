# Inventory: Target Environments and Adapter Formats

## Goal

Document the environments and the adapter artifact formats needed to ship Humanizer guidance across supported agents.

## Environments

- OpenAI Codex CLI
- Gemini CLI
- Google Antigravity
- VS Code

## Adapter Formats

- Codex CLI: `AGENTS.md` (workspace instructions for Codex CLI agents).
- Gemini CLI: Extension package (manifest + entrypoint + optional `GEMINI.md`).
- Google Antigravity: Skill package directory (`SKILL.md` + optional `scripts/`, `references/`, `assets/`).
- Google Antigravity Rules/Workflows: Rule and workflow templates (global + workspace placements).
- VS Code: Workspace guidance (extension snippet or workspace instructions in repo).

## References

- Gemini CLI extensions: <https://geminicli.com/docs/extensions/writing-extensions/>
- Antigravity skills: <https://codelabs.developers.google.com/getting-started-with-antigravity-skills#9>
- Antigravity rules/workflows: <http://codelabs.developers.google.com/getting-started-google-antigravity#8>
