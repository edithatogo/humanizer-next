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

| Tool                          | Status                | Primary artifact                                |
| ----------------------------- | --------------------- | ----------------------------------------------- |
| Antigravity (skill)           | Officially supported  | `adapters/antigravity-skill/SKILL.md`            |
| Antigravity (rules/workflows) | Officially supported  | `adapters/antigravity-rules-workflows/`           |
| Claude                        | Officially supported  | `adapters/claude/SKILL.md`                       |
| Cline                         | Officially supported  | `adapters/cline/SKILL.md`                        |
| Cursor                        | Officially supported  | `adapters/cursor/SKILL.md`                       |
| Gemini CLI / Extension        | Officially supported  | `adapters/gemini-extension/SKILL.md`             |
| Kilo                          | Officially supported  | `adapters/kilo/SKILL.md`                         |
| Amp                           | Officially supported  | `adapters/amp/SKILL.md`                          |
| OpenCode                      | Officially supported  | `adapters/opencode/SKILL.md`                     |
| Windsurf                      | Officially supported  | `adapters/windsurf/SKILL.md`                     |
| Zed                           | Officially supported  | `adapters/zed/SKILL.md`                          |
| Skillshare                    | Community/best effort | `SKILL.md`                                       |
| npx skills                    | Community/best effort | `SKILL.md`                                       |
| AIX validation                | Community/best effort | `SKILL.md`                                       |
| Any markdown-capable agent    | Community/best effort | `SKILL.md` (direct use)                          |


## Antigravity (skill)

Status: Officially supported

### Install

```bash
# Copy skill adapter into your workspace
cp -r adapters/antigravity-skill/ <workspace>/.agent/skills/humanizer/
```

### Verify

- Confirm `SKILL.md` is present at `<workspace>/.agent/skills/humanizer/SKILL.md`.

### Update

```bash
git pull && npm run sync
# Recopy updated adapter files
```

### Uninstall

- Remove `<workspace>/.agent/skills/humanizer/`.

---

## Antigravity (rules/workflows)

Status: Officially supported

### Install

```bash
cp -r adapters/antigravity-rules-workflows/ <workspace>/.agent/rules/humanizer/
```

### Verify

- Confirm both `rules/humanizer.md` and `workflows/humanize.md` are discoverable by Antigravity.

### Update

```bash
git pull && npm run sync
```

### Uninstall

- Remove copied Humanizer rule/workflow files from Antigravity directories.

---


## Claude

Status: Officially supported

### Install (Claude Desktop — MCP)

```bash
npm run install:mcp-server
```

This registers the Humanizer MCP Server in `~/AppData/Roaming/Claude/claude_desktop_config.json` (Windows) or `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS).

### Install (Claude Code — skill)

```bash
npm run install:claude
# Copies to ~/.claude/skills/humanizer/SKILL.md
```

### Verify

- In Claude Desktop: the Humanizer tool should appear in the MCP tools list.
- In Claude Code: invoke the skill by name.

### Update

```bash
git pull && npm run sync && npm run install:claude
```

### Uninstall

- Remove `~/.claude/skills/humanizer/`.
- For MCP: remove the `humanizer` entry from `claude_desktop_config.json`.

---

## GitHub Copilot

Status: Officially supported

### Install

```bash
# Install to the current repo (creates .github/copilot-instructions.md)
npm run install:copilot

# Install to a different repo
node scripts/install-copilot.js --target /path/to/your/repo
```

Copilot reads custom instructions from `.github/copilot-instructions.md` automatically in VS Code.

### Verify

- Open VS Code with Copilot enabled in the target repo.
- The Humanizer rules load automatically as custom instructions.

### Update

```bash
git pull && npm run sync && npm run install:copilot
```

### Uninstall

- Delete `.github/copilot-instructions.md` from the target repo.

---

## Cursor

Status: Officially supported

### Install

```bash
npm run install:cursor
# Copies to ~/.cursor/extensions/humanizer/SKILL.md
```

### Verify

- Open Cursor and confirm the skill is discoverable.

### Update

```bash
git pull && npm run sync && npm run install:cursor
```

### Uninstall

- Remove `~/.cursor/extensions/humanizer/`.

---

## Windsurf

Status: Officially supported

### Install

```bash
npm run install:windsurf
# Copies to ~/.windsurf/extensions/humanizer/SKILL.md
```
### Verify

- Open Windsurf and confirm the Humanizer skill is available.

### Update

```bash
git pull && npm run sync && npm run install:windsurf
```

### Uninstall

- Remove `~/.windsurf/extensions/humanizer/`.

---

## Cline

Status: Officially supported

### Install


```bash
npm run install:cline
# Copies to ~/.cline/skills/humanizer/SKILL.md
```
### Verify

- Invoke the Humanizer skill in Cline and confirm the output format.

### Update

```bash
git pull && npm run sync && npm run install:cline
```

### Uninstall

- Remove `~/.cline/skills/humanizer/`.

---

## Kilo

Status: Officially supported

### Install

```bash
npm run install:kilo
# Copies to ~/.kilo/skills/humanizer/SKILL.md
```
### Verify

- Invoke the Humanizer skill in Kilo and confirm the output format.

### Update

```bash
git pull && npm run sync && npm run install:kilo
```

### Uninstall

- Remove `~/.kilo/skills/humanizer/`.

---

## Amp

Status: Officially supported

### Install

```bash
npm run install:amp
# Copies to ~/.amp/skills/humanizer/SKILL.md
```

### Verify

- Invoke the Humanizer skill in Amp and confirm rewrite + bullet-summary output.

### Update

```bash
git pull && npm run sync && npm run install:amp
```

### Uninstall

- Remove `~/.amp/skills/humanizer/`.

---

## OpenCode

Status: Officially supported

### Install

```bash
npm run install:opencode
# Copies to ~/.opencode/skills/humanizer/SKILL.md
```

### Verify

- Invoke the skill in OpenCode and confirm the output format.

### Update

```bash
git pull && npm run sync && npm run install:opencode
```

### Uninstall

- Remove `~/.opencode/skills/humanizer/`.

---

## Zed

Status: Officially supported

### Install

```bash
npm run install:zed
# Copies to ~/.zed/plugins/humanizer/SKILL.md
```

### Verify

- Open Zed and confirm the Humanizer plugin is available.

### Update

```bash
git pull && npm run sync && npm run install:zed
```

### Uninstall

- Remove `~/.zed/plugins/humanizer/`.

---

## Gemini CLI / Extension

Status: Officially supported

### Install

```bash
cp adapters/gemini-extension/SKILL.md <your-gemini-extension-path>/
```

### Verify

- Trigger the Humanizer behavior in Gemini and confirm rewrite + change-summary output.

### Update

```bash
git pull && npm run sync
# Recopy updated adapter files.
```

### Uninstall

- Remove the copied Gemini adapter files.

---


## Any markdown-capable agent

Status: Community/best effort

Point the agent at `SKILL.md` directly — it is fully self-contained. No install script needed.

---

## MCP Server (all compatible agents)

```bash
npm run install:mcp-server
```

Registers the Humanizer V4 orchestrator as an MCP tool server. Auto-detects Claude Desktop and Cursor. Prints the JSON config block for any other MCP-compatible agent.

---

## Migration from upstream clone URL

If you previously cloned upstream directly, repoint your remote to this fork:

```bash
git remote set-url origin https://github.com/edithatogo/humanizer-next.git
```

If you keep an upstream remote for comparison:

```bash
git remote add upstream https://github.com/blader/humanizer.git
```
