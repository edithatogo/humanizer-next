# Project Tracks

This file tracks all major tracks for the project. Each track has its own detailed plan in its respective folder.

**Track Conventions:** See [`docs/conventions.md`](./docs/conventions.md) for status values, priority levels, dependency syntax, and artifact flow patterns.

---

## Dependency Graph

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  P0 (Critical Path - Sequential)                                             │
│                                                                              │
│  1. reasoning-failures-stream ──► 2. reasoning-stream-implementation        │
│         │                              │                                     │
│         │                              ├─────────────────────────┐           │
│         │                              │                         │           │
│         ▼                              ▼                         ▼           │
│  3. conductor-review-skill      7. systematic-refactor    4. templates       │
│         │                              │                 │                   │
│         └──────────────────────────────►─────────────────┘                    │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  P1 (Parallel-Safe)                     P2 (After P1)                        │
│                                                                              │
│  5. repo-hardening-release-ops ◄───── 6. downstream-skill-sync              │
│         (parallel-safe)                                                      │
│                                                                              │
│  Run 5 in parallel with 1-4 to save time.                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Active Tracks

Priority order (run sequentially unless marked parallel-safe):

### 1. [x] reasoning-failures-stream_20260215 [g1h2i3j]

**Summary:** LLM reasoning failures stream - source archiving, evidence cataloging, taxonomy, Wikipedia workflow
**Status:** completed | **Priority:** P0 | **Dependencies:** none
_Link: [./tracks/reasoning-failures-stream_20260215/](./tracks/reasoning-failures-stream_20260215/)_

### 2. [ ] reasoning-stream-implementation_20260215

**Summary:** Productize reasoning stream - source fragments, adapters, regression safety  
**Status:** blocked | **Priority:** P0 | **Dependencies:** reasoning-failures-stream  
_Link: [./tracks/reasoning-stream-implementation_20260215/](./tracks/reasoning-stream-implementation_20260215/)_

### 3. [ ] conductor-review-skill_20260215

**Summary:** Humanizer review skill - severity-ordered findings, citation/taxonomy checks  
**Status:** blocked | **Priority:** P1 | **Dependencies:** reasoning-failures-stream (taxonomy)  
_Link: [./tracks/conductor-review-skill_20260215/](./tracks/conductor-review-skill_20260215/)_

### 4. [ ] conductor-humanizer-templates_20260215

**Summary:** Conductor-compatible templates - style toggles, stream switches, review integration  
**Status:** blocked | **Priority:** P1 | **Dependencies:** reasoning-stream-implementation, conductor-review-skill  
_Link: [./tracks/conductor-humanizer-templates_20260215/](./tracks/conductor-humanizer-templates_20260215/)_

### 5. [ ] repo-hardening-release-ops_20260215

**Summary:** CI/CD hardening, release policy, versioning, upstream PR runbook  
**Status:** new | **Priority:** P1 | **Dependencies:** none (parallel-safe)  
_Link: [./tracks/repo-hardening-release-ops_20260215/](./tracks/repo-hardening-release-ops_20260215/)_

### 6. [ ] downstream-skill-sync-automation_20260215

**Summary:** Auto-sync downstream repos after version updates  
**Status:** blocked | **Priority:** P2 | **Dependencies:** repo-hardening-release-ops (release policy)  
_Link: [./tracks/downstream-skill-sync-automation_20260215/](./tracks/downstream-skill-sync-automation_20260215/)_

### 7. [ ] systematic-refactor-hardening_20260215

**Summary:** Modular refactor baseline, structural guardrails, maintenance playbook, ADRs  
**Status:** blocked | **Priority:** P2 | **Dependencies:** reasoning-stream-implementation (hotspot discovery needs new code)  
_Link: [./tracks/systematic-refactor-hardening_20260215/](./tracks/systematic-refactor-hardening_20260215/)_

---

### Legacy Active Tracks (pre-2026-02-15)

## [ ] Track: Adopt upstream pull requests #3, #4, and #5 from blader/humanizer

_Status: new_  
_Link: [./tracks/adopt-upstream-prs_20260131/](./tracks/adopt-upstream-prs_20260131/)_

## [ ] Track: Add Skillshare distribution + AIX validation (skill-distribution_20260131)

_Status: in_progress_  
_Link: [./tracks/skill-distribution_20260131/](./tracks/skill-distribution_20260131/)_

## [ ] Track: Implement repo management tooling recommendations (Vale scripts, Renovate, npx skills distribution docs)

_Status: in_progress_  
_Link: [./tracks/repo-tooling-enhancements_20260214/](./tracks/repo-tooling-enhancements_20260214/)_

---

## Archived Tracks

## [x] Track: Skill Expansion & Portable Compilation

_Link: [./tracks/skill-expansion_20260201/](./tracks/skill-expansion_20260201/)_

## [x] Track: DevOps and Quality Engineering (da248f2)

_Link: [./tracks/devops-quality_20260131/](./tracks/devops-quality_20260131/)_

## [x] Track: Universal Automated Adapters (5067d34)

_Link: [./tracks/universal-automated-adapters_20260131/](./tracks/universal-automated-adapters_20260131/)_

## [x] Track: Expand Humanizer adapters to Qwen CLI and Copilot (5067d34)

_Link: [./tracks/adapters-expansion_20260131/](./tracks/adapters-expansion_20260131/)_

## [x] Track: Create Google Antigravity rules/workflows adapter guidance for Humanizer (5067d34)

_Link: [./tracks/antigravity-rules-workflows_20260131/](./tracks/antigravity-rules-workflows_20260131/)_

## [x] Track: Create a Google Antigravity skill adapter for Humanizer (5067d34)

_Link: [./tracks/antigravity-skills_20260131/](./tracks/antigravity-skills_20260131/)_

## [x] Track: Create a Gemini CLI extension adapter for Humanizer (5067d34)

_Link: [./tracks/gemini-extension_20260131/](./tracks/gemini-extension_20260131/)_

## [x] Track: Build multi-agent Humanizer adapters (Codex CLI, Gemini CLI, Google Antigravity, VS Code) while keeping SKILL.md canonical and unchanged (e2c47dc)
