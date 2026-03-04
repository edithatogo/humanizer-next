# Track Specification: ADR-001 Implementation & Upstream Adoption

**Track ID:** `adr-implementation-upstream_20260303`

**Priority:** P0 (Critical - Follow-up to Track 1)

**Type:** Implementation, Upstream Adoption

**Estimated Duration:** 3-5 days

**Parent Track:** `repo-self-improvement_20260303` (completed 2026-03-03)

---

## Overview

This track implements the outstanding items from Track 1:
1. **ADR-001 Implementation** - Hybrid modular architecture
2. **Upstream PR Adoption** - Critical bug fixes and pattern enhancements

---

## Goals

### Primary Objectives

1. **Implement ADR-001** (2-3 days)
   - Create `src/modules/` directory
   - Extract 5 modules from SKILL_PROFESSIONAL.md
   - Update `scripts/compile-skill.js` for assembly
   - Test compiled output matches current behavior
   - Update all adapters

2. **Adopt Critical Upstream PRs** (1-2 days)
   - PR #49: Claude compatibility fix
   - PR #39: Patterns #25-27 (persuasive tropes, signposting, fragmented headers)
   - PR #16: AI-signatures in code fix
   - PR #17: Offline robustness patterns

### Secondary Objectives

3. **Security Review** (if time permits)
   - PR #44: Wikipedia sync with safeguards
   - Implement opt-in behavior
   - Add pattern validation

---

## ADR-001 Implementation Plan

### Module Structure

```
src/
├── modules/
│   ├── SKILL_CORE_PATTERNS.md    (27 patterns, always applied)
│   ├── SKILL_TECHNICAL.md        (code & technical docs)
│   ├── SKILL_ACADEMIC.md         (research & formal writing)
│   ├── SKILL_GOVERNANCE.md       (policy & compliance)
│   └── SKILL_REASONING.md        (LLM reasoning failures)
└── compile/
    └── compile-skill.js          (assembles modules into SKILL*.md)
```

### Module Template

```markdown
---
module_id: core_patterns
version: 3.0.0
description: Core AI writing pattern detection (always applied)
patterns: 27
severity_levels:
  - Critical
  - High
  - Medium
  - Low
---

# Module: Core Patterns

## Description
Always-applied patterns for general writing.

## Patterns
[Pattern 1-27 definitions...]

## Examples
[Before/after examples...]
```

### Compile Script Requirements

1. Load all modules from `src/modules/`
2. Inject module content into SKILL_PROFESSIONAL.md template
3. Preserve routing logic from current SKILL_PROFESSIONAL.md
4. Update version metadata
5. Output compiled SKILL.md and SKILL_PROFESSIONAL.md

---

## Upstream PR Adoption

### PR #49: Claude Compatibility
- **Action:** Fetch and review diff
- **Test:** Verify in Claude.ai if available
- **Merge:** If functional

### PR #39: Patterns #25-27
- **Action:** Add to SKILL_CORE_PATTERNS.md
- **Patterns:**
  - #25: Persuasive tropes
  - #26: Signposting
  - #27: Fragmented headers
- **Test:** Sample texts with known AI patterns

### PR #16: AI-Signatures Fix
- **Action:** Align with Technical Module
- **Test:** AI-generated code samples

### PR #17: Offline Robustness
- **Action:** Add non-text slop patterns
- **Test:** Offline/non-text examples

---

## Success Criteria

| Criterion | Target | Status |
|-----------|--------|--------|
| Modules created | 5/5 | ⏳ Pending |
| Compile script functional | Yes | ⏳ Pending |
| Compiled output matches current | Yes | ⏳ Pending |
| All adapters synced | 12/12 | ⏳ Pending |
| Upstream PRs adopted | 4/4 | ⏳ Pending |
| Tests passing | 14/14 | ⏳ Pending |

---

## Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Compile script breaks adapters | High | Medium | Test each adapter individually |
| Module extraction loses content | High | Low | Diff before/after compilation |
| Upstream PRs have conflicts | Medium | High | Resolve conflicts manually |
| Version bump breaks compatibility | Medium | Low | Maintain v2.3.x during transition |

---

## Timeline

**Day 1-2:** ADR-001 Implementation
- Create modules
- Update compile script
- Test compilation

**Day 3:** Adapter Sync
- Run `npm run sync`
- Validate all adapters
- Fix any issues

**Day 4:** Upstream Adoption
- Merge PR #49, #39, #16, #17
- Test compiled output

**Day 5:** Validation & Closure
- Full test suite
- Documentation update
- Track closure

---

*Created: 2026-03-03*
*Status: Ready to Start*
