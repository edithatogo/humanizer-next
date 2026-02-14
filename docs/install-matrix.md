# Humanizer-next installation matrix

This is the canonical installation guide for `humanizer-next`, a forward-maintained fork of `blader/humanizer`.

- Canonical rules source: `SKILL.md`
- Repository URL used in examples: `https://github.com/edithatogo/humanizer-next.git`
- Support labels:
  - `Officially supported`: documented and maintained in this repository.
  - `Community/best effort`: documented where possible, but behavior may vary by host/tool version.

## Quick clone

```bash
git clone https://github.com/edithatogo/humanizer-next.git
cd humanizer-next
npm install
npm run sync
npm run validate
```

## Support matrix

| Tool                          | Status                | Primary artifact                        |
| ----------------------------- | --------------------- | --------------------------------------- |
| Codex CLI                     | Officially supported  | `AGENTS.md`, `adapters/codex/CODEX.md`  |
| Gemini CLI                    | Officially supported  | `adapters/gemini-extension/GEMINI.md`   |
| VS Code                       | Officially supported  | `adapters/vscode/HUMANIZER.md`          |
| Qwen CLI                      | Officially supported  | `adapters/qwen-cli/QWEN.md`             |
| GitHub Copilot                | Officially supported  | `adapters/copilot/COPILOT.md`           |
| Antigravity (skill)           | Officially supported  | `adapters/antigravity-skill/SKILL.md`   |
| Antigravity (rules/workflows) | Officially supported  | `adapters/antigravity-rules-workflows/` |
| Skillshare                    | Community/best effort | `SKILL.md`                              |
| npx skills                    | Community/best effort | `SKILL.md`                              |
| AIX validation                | Community/best effort | `SKILL.md`                              |

## Codex CLI

Status: Officially supported

### Install

1. Clone this repository.
2. Keep `AGENTS.md` and `SKILL.md` in-repo for Codex sessions opened in this repo.
3. Optional: reference `adapters/codex/CODEX.md` in team docs for shared behavior.

### Verify

- Open a Codex session from this repository root.
- Confirm Codex sees `AGENTS.md` and can apply Humanizer instructions.

### Update

```bash
git pull
npm run sync
npm run validate
```

### Uninstall

- Remove the local clone directory.

## Gemini CLI

Status: Officially supported

### Install

1. Clone this repository.
2. Copy the adapter file into your Gemini extension location according to your Gemini setup:
   - `adapters/gemini-extension/GEMINI.md`

### Verify

- Trigger the Humanizer behavior in Gemini and confirm rewrite + change-summary output format.

### Update

- Replace adapter files after pulling latest changes.

```bash
git pull
npm run sync
npm run validate
```

### Uninstall

- Remove the copied Gemini adapter files.

## VS Code

Status: Officially supported

### Install

1. Clone this repository.
2. Copy `adapters/vscode/HUMANIZER.md` into your VS Code prompt and instructions location.
3. Optionally install snippets from `adapters/vscode/humanizer.code-snippets`.

### Verify

- Invoke the Humanizer prompt flow in VS Code and validate output style.

### Update

```bash
git pull
npm run sync
npm run validate
```

### Uninstall

- Remove copied `HUMANIZER.md` and optional snippet file from VS Code config.

## Qwen CLI

Status: Officially supported

### Install

1. Clone this repository.
2. Copy `adapters/qwen-cli/QWEN.md` to your Qwen skills/instructions location.

### Verify

- Run a test rewrite with Qwen and confirm Humanizer output contract.

### Update

```bash
git pull
npm run sync
npm run validate
```

### Uninstall

- Remove copied Qwen adapter file.

## GitHub Copilot

Status: Officially supported

### Install

1. Clone this repository.
2. Copy `adapters/copilot/COPILOT.md` to your Copilot custom instructions location.

### Verify

- Run a sample rewrite and confirm it follows Humanizer rules.

### Update

```bash
git pull
npm run sync
npm run validate
```

### Uninstall

- Remove copied Copilot instructions file.

## Antigravity (skill)

Status: Officially supported

### Install

Copy adapter folder into workspace skills:

- `<workspace>/.agent/skills/humanizer/`
- Source: `adapters/antigravity-skill/`

### Verify

- Confirm `SKILL.md` is present at `<workspace>/.agent/skills/humanizer/SKILL.md`.

### Update

```bash
git pull
npm run sync
npm run validate
```

Then recopy updated adapter files.

### Uninstall

- Remove `<workspace>/.agent/skills/humanizer/`.

## Antigravity (rules/workflows)

Status: Officially supported

### Install

Copy the rules/workflows adapter files from:

- `adapters/antigravity-rules-workflows/`

into the corresponding Antigravity rules/workflows folders for your workspace.

### Verify

- Confirm both `rules/humanizer.md` and `workflows/humanize.md` are discoverable by Antigravity.

### Update

```bash
git pull
npm run sync
npm run validate
```

Then recopy updated rules/workflow files.

### Uninstall

- Remove copied Humanizer rule/workflow files from Antigravity directories.

## Skillshare

Status: Community/best effort

### Install

```bash
curl -fsSL https://raw.githubusercontent.com/runkids/skillshare/main/install.sh | sh
skillshare install . --dry-run
```

### Verify

```bash
skillshare sync --dry-run
```

### Update

```bash
git pull
npm run sync
skillshare install . --dry-run
```

### Uninstall

- Remove the installed Skillshare package according to your Skillshare environment.

## npx skills

Status: Community/best effort

### Install

```bash
npx skills install https://github.com/edithatogo/humanizer-next
```

### Verify

```bash
npx skills list
```

Confirm `humanizer` (or repository-linked entry) appears in the installed skills list.

### Update

```bash
npx skills update humanizer
```

### Uninstall

```bash
npx skills remove humanizer
```

## AIX validation

Status: Community/best effort

### Install

```bash
brew install thoreinstein/tap/aix
```

### Verify

```bash
aix skill validate ./
```

### Update

```bash
git pull
npm run sync
aix skill validate ./
```

### Uninstall

```bash
brew uninstall aix
```

## Migration from upstream clone URL

If you previously cloned upstream directly, repoint your remote to this fork:

```bash
git remote set-url origin https://github.com/edithatogo/humanizer-next.git
```

If you keep an upstream remote for comparison:

```bash
git remote add upstream https://github.com/blader/humanizer.git
```
