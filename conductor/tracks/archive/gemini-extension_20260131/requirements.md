# Gemini CLI Extension Requirements (Summary)

## Source

- <https://geminicli.com/docs/extensions/writing-extensions/>

## Key Requirements

- Use `gemini extensions new <name>` to scaffold a new extension.
- Extension manifest file: `gemini-extension.json`.
- Optional context file: `GEMINI.md` (custom instructions loaded by the extension).
- Custom commands are stored under `commands/` using TOML prompt files.
- During local development, run `gemini extensions link .` in the extension folder.

## Minimal Adapter Needs

- `gemini-extension.json` with name and version.
- `GEMINI.md` containing Humanizer adapter instructions and metadata.
- Optional saved command (e.g., `commands/humanizer/humanize.toml`).
