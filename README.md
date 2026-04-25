# Humanizer-next (V4 Modular Architecture)

Humanizer-next is the source repository for a modular, MCP-compatible agent skill suite that removes common signs of AI-generated writing while preserving meaning, tone, and technical literals.

## V4 Architecture

The V4 architecture decomposes the monolithic humanizer into 8 independent, specialized skills exposed via a global **Model Context Protocol (MCP)** server:

- **humanizer-next**: Core personality and soul injectors.
- **humanizer-logic**: Reasoning failure remediation & Self-Critique.
- **humanizer-cite**: Citation and reference normalization.
- **humanizer-read**: Statistical prose analysis & Academic benchmarking.
- **humanizer-structure**: Flow and hierarchy integrity.
- **humanizer-factcheck**: Claim grounding and verification.
- **humanizer-inclusive**: Bias and diversity normalization.
- **humanizer-orchestrate**: Parallel swarming and agent orchestration.

## MCP Installation

Install the Humanizer MCP Server to your host agent:

```bash
npm run install:mcp-server
```

This registers all 8 skills as distinct tools, allowing your agent to "swarm" complex requests across specialized modules.

## Swarming Logic

The orchestrator allows parallel execution:

```javascript
// Example swarm dispatch
await orchestrator.swarm({
  tools: ['humanizer-next', 'humanizer-logic'],
  args: { text: '...' },
});
```

## Maintenance & Validation

- **Self-Critique Loop**: Automated quality verification before final output.
- **Glossary Protection**: `.humanizer-ignore` file support for brand terminology.
- **Academic Benchmarking**: Integrated TuringBench and Ghostbuster metrics.

## SOTA Maintainer Workflow

1. Update source fragments in `src/`.
2. Rebuild and sync generated outputs with `npm run sync`.
3. Validate adapters and docs with `npm run validate`.
4. Run the full maintainer gate with `npm run lint:all`, `npm test`, `pytest`, and `npm run check:sync`.

`npm run check:sync` is important for this repo shape. It verifies that generated adapter outputs are already in sync with source content and prevents drift from being merged.

## Supported outputs

- Standard skill: `SKILL.md`
- Professional skill: `SKILL_PROFESSIONAL.md`
- Agents manifest: `AGENTS.md`
- Adapter bundles under `adapters/`

## Installation (SOTA - Generated Locally)

Adapters are generated locally from the canonical `SKILL.md`. This ensures you always have the latest version.

```bash
# Generate all adapters locally
npm run sync

# Or convert a specific platform to a custom path
node scripts/convert-adapter.js --platform claude --target ~/.claude/skills/humanizer/

# Install directly to common platforms
npm run install:claude    # Claude Desktop
npm run install:opencode  # OpenCode
npm run install:zed       # Zed
npm run install:cursor    # Cursor
npm run install:windsurf  # Windsurf
npm run install:cline    # Cline
npm run install:kilo      # Kilo
npm run install:amp       # Amp
```

**Note:** The `adapters/` directory is in `.gitignore` - adapters are generated locally, not stored in git.

## Self-improvement workflow

The repository runs a weekly self-improvement cycle (Monday 9 AM UTC) that:

- Checks for upstream additions from blader/humanizer
- Detects pattern drift in AI writing (new vocabulary tells)
- Generates decision records for adopting upstream changes
- Creates automated PRs for review

Run manually: `npm run sync && npm test`

Current adapters include Antigravity, Claude, Copilot, Cursor, Windsurf, Cline, Kilo, Amp, OpenCode, Zed, and Gemini. Run `npm run sync` to regenerate all adapters after pulling updates.

## What this repo is not

- Not published as an npm package.
- Not intended to be consumed as an application dependency.
- Not a general-purpose writing toolkit monorepo.

## Release model

Releases package skill artifacts and adapter bundles as GitHub release assets. The release workflow does not publish to npm.

## Quality gates

The repo is validated as a skill-source repository:

- Markdown, Vale, ESLint, TypeScript, and Prettier checks
- Node regression tests
- Python adapter tests
- Sync-drift verification
- Cross-platform skill distribution validation

The maintainer gates are intentionally centered on the maintained skill surface: `src/`, generated artifacts, adapters, docs, and validation scripts. Content under `experiments/` is kept in-tree for evaluation and extraction decisions, but it is not treated as part of the primary supported skill contract.

## Self-improvement track

The active conductor self-improvement track lives under `conductor/tracks/repo-self-improvement_20260303/`. It refreshes upstream repo data, reviews open PRs and issues, and records Adopt, Reject, or Defer decisions for candidate improvements.
