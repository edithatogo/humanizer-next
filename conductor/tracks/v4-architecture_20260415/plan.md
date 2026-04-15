# Implementation Plan: Modular V4 Architecture

## Phase 1: Dependency Modernization & Scaffolding
- [x] Task: Remove `.github/dependabot.yml` and all legacy Dependabot configurations. 6072907
- [x] Task: Create `renovate.json` configured for a monorepo workspace to manage multiple independent skill packages. 7e5b15d
- [x] Task: Scaffold the directory structure for 8 new domains (`skills/humanizer-next`, `skills/humanizer-logic`, `skills/humanizer-cite`, `skills/humanizer-read`, `skills/humanizer-structure`, `skills/humanizer-factcheck`, `skills/humanizer-inclusive`, `skills/humanizer-orchestrate`). 8483cff
- [x] Task: Conductor - User Manual Verification 'Phase 1: Dependency Modernization & Scaffolding' (Protocol in workflow.md) b095ed3

## Phase 2: Upstream Triage Workflow
- [x] Task: Triage existing upstream PRs/Issues referencing formatting/citations and port logic to the `humanizer-cite` test suite. 7079dd0
- [x] Task: Triage upstream PRs/Issues referencing logic/reasoning and port logic to the `humanizer-logic` test suite. 79599ce
- [x] Task: Triage upstream PRs/Issues referencing general tone/slop and port to `humanizer-next`. cffcd8f
- [x] Task: Bulk-close remaining obsolete/duplicate upstream PRs and Issues in `blader/humanizer` context with a V4 architectural transition notice. 4e48fe0
- [x] Task: Conductor - User Manual Verification 'Phase 2: Upstream Triage Workflow' (Protocol in workflow.md) 2a8e9fd

## Phase 3: Skill Implementation & Standardization (TDD) [checkpoint: 324b260]
- [x] Task: Write failing tests for Dual-Mode execution (`--assess` vs `--fix`) standard CLI flag parsing. 6c7cc28
- [x] Task: Implement standardized input parsing in core utilities to make tests pass. 10e4b93
- [x] Task: Write failing tests for Ruff-style risk tolerance logic (`--safe_only` vs `--unsafe`). 0548e2b
- [x] Task: Implement risk categorization tags on all default fixes. 0a7aff2
- [x] Task: Implement AST-aware logic mapping in core shared utilities (ignoring URLs/CodeBlocks/JSON). e546d65
- [x] Task: Auto-Review - Execute `conductor-review` skill, apply fixes, and progress to Phase 4. 324b260

## Phase 4: Model Context Protocol (MCP) & Orchestrator
- [x] Task: Write unit tests for the MCP Server initialization and message handling. 8474840
- [ ] Task: Implement the global MCP server exposing all 7 independent skills as distinct tools.
- [ ] Task: Implement `humanizer-orchestrate` swarming logic (agent-agnostic parallel execution) to call multiple sub-skills concurrently.
- [ ] Task: Enforce JSON/XML structured outputs for all "Assess" mode responses.
- [ ] Task: Auto-Review - Execute `conductor-review` skill, apply fixes, and progress to Phase 5.

## Phase 5: SOTA Advanced Features
- [ ] Task: Implement the "Self-Critique Loop" logic: routing outputs through an LLM verification pass before finalizing.
- [ ] Task: Implement the Local Glossary / RAG Context loader (reading a `.humanizer-ignore` file to protect brand terminology).
- [ ] Task: Implement the local SQLite Telemetry Logger to record "Reverted" or manually tweaked fixes.
- [ ] Task: Auto-Review - Execute `conductor-review` skill, apply fixes, and progress to Phase 6.

## Phase 6: Academic Benchmarking & Launch
- [ ] Task: Integrate TuringBench/Ghostbuster dataset loader into the test suite.
- [ ] Task: Write a CI benchmark script that mathematically evaluates "Meaning Preservation" across generated changes.
- [ ] Task: Update the primary `product.md` and `README.md` to formally document the V4 architecture and MCP installation method.
- [ ] Task: Auto-Review - Execute `conductor-review` skill, apply fixes, and conclude Phase 6.
- [ ] Task: Final Track Auto-Review - Execute `conductor-review` across the entire track, applying any final cross-phase fixes.
