# Track Specification: Modular V4 Architecture & Ecosystem Overhaul

## Overview
A massive architectural shift to decompose the monolithic Humanizer into independent, specialized writing skills (`next`, `logic`, `cite`, `read`, `structure`, `factcheck`, `inclusive`), governed by a new parent orchestrator (`orchestrate`). The track transitions the ecosystem to the Model Context Protocol (MCP), shifts from Dependabot to Renovate, scales testing to academic datasets, and introduces SOTA agentic features including multi-agent swarms, AST-aware parsing, self-critique loops, telemetry, and risk-tolerance safety limits.

## Functional Requirements

### 1. Skill Separation
Break the existing repository out into 8 standalone domains:
- **`humanizer-next`**: The core stylistic text de-slop skill.
- **`humanizer-logic`**: Evaluates and improves deductive reasoning and argument faults.
- **`humanizer-cite`**: Specializes in citation validation and formatting.
- **`humanizer-read`**: Uses `textstat` algorithms to assess readability and structurally simplify complexity.
- **`humanizer-structure`**: Evaluates narrative arc, logical transitions, and Minto Pyramid Principle compliance.
- **`humanizer-factcheck`**: Flagging unsupported claims and actively checking for LLM hallucinations.
- **`humanizer-inclusive`**: Compliance-focused skill for catching bias, non-inclusive language, and corporate standard violations.
- **`humanizer-orchestrate`**: An agent-agnostic swarm router linking all independent skills into unified workflows.

### 2. SOTA Skill Enhancements & Robustness
- **Universal MCP Server:** Deprecate static text adapters. Create a compliant Model Context Protocol (MCP) server so all modern coding agents (Cursor, Claude, Antigravity, Zed) can dynamically register and invoke the skills directly.
- **Structured Assessments:** Enforce strict JSON/XML schemas for `--assess` modes so the Orchestrator can deterministically stream sub-agent outputs into the `--fix` execution loop.
- **Multi-Step Self-Critique Loop:** Implement a pass where outputs are verified against the original text for hallucinations or new "AI tells" before finalization.
- **Brand Voice Glossary (RAG):** Load a `.humanizer-ignore` file to protect brand terminology and domain-specific words from being erased.
- **Telemetry Logger:** Add a local SQLite feedback trace to record user revert actions, allowing for automated personal tuning.
- **Safe/Unsafe Risk Toggles:** Introduce Ruff-style risk categorization, allowing users to universally execute "safe" standard fixes, or explicitly opt-in to aggressive "unsafe" prose rewrites. 
- **Academic Benchmarking:** Introduce Continuous Benchmarking in CI against known public datasets (e.g., TuringBench) to track AI-detection scores and guarantee meaning preservation.
- **AST Isolation:** Implement tree logic so the system isolates prose completely, guaranteeing zero collateral damage to code blocks, URLs, and frontmatter. 

### 3. Triage & Maintenance
- **Systematic Upstream Triage:** Manually parse the ~49 Open PRs and Issues from `blader/humanizer`. Systematically extract and distribute valid community-discovered "AI tells" to their granular sub-skills, formally closing the rest. 
- **Renovate Migration:** Replace Dependabot workflows with `renovate.json` configurations to handle multi-package/monorepo dependency automation.

## Out of Scope
- Migrating the project into an NPM runtime library (it remains an Agentic/MCP environment).
