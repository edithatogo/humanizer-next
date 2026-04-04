# Spec: Systematic Refactor and Hardening Baseline

## Overview

Introduce a focused refactor/hardening track to keep architecture stable while adding multiple streams and workflows.

## Requirements

- Identify architectural hotspots and coupling risks.
- Refactor for modular boundaries and testability.
- Add maintainability checks (lint/structure/contracts) where missing.
- Document long-term maintenance playbook.
- Establish coupling metrics and thresholds.
- Add architectural decision records (ADRs) for major structural choices.

## Required Inputs (from reasoning-stream-implementation)

- New reasoning-stream code (for coupling analysis)
- Compiled adapters (for consistency verification)

## Acceptance Criteria

- [ ] Refactor plan and hotspot matrix are documented.
- [ ] Coupling metrics baseline is established (e.g., file dependency depth, circular dependencies).
- [ ] Priority refactors are implemented with test coverage.
- [ ] Structural guardrails are in place to prevent drift.
- [ ] Maintenance playbook is committed.
- [ ] At least one ADR is added documenting stream architecture decision.
- [ ] CI includes structural lint checks (if not already present).

## Risks and Mitigations

| Risk                       | Likelihood | Impact | Mitigation                                                         |
| -------------------------- | ---------- | ------ | ------------------------------------------------------------------ |
| Refactor scope creep       | Medium     | Medium | Strict scope: only coupling between streams, not internal rewrites |
| Breaking adapter contracts | Low        | High   | Adapter integration tests before merge                             |
| Metrics gaming             | Low        | Low    | Combine multiple metrics; human review of hotspot findings         |

## Out of Scope

- Rewriting existing humanization patterns
- Performance optimization unrelated to maintainability
- Major version bump planning (belongs in repo-hardening-release-ops)
