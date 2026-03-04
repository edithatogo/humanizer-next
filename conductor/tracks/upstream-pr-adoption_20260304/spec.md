# Track Specification: Upstream PR Adoption

**Track ID:** `upstream-pr-adoption_20260304`

**Priority:** P0 (Critical - Deferred from ADR-001 track)

**Type:** Upstream Adoption, Bug Fixes, Pattern Enhancement

**Estimated Duration:** 1-2 days

**Parent Track:** `adr-implementation-upstream_20260303` (ADR-001 implementation)

---

## Overview

This track adopts critical upstream PRs from `blader/humanizer` that were deferred during ADR-001 implementation.

---

## Goals

### Primary Objectives

1. **Adopt PR #49: Claude Compatibility Fix**
   - Fix Claude.ai format parsing issues
   - Test in Claude.ai environment
   - Update adapter if needed

2. **Adopt PR #39: Patterns #25-27**
   - Pattern #25: Persuasive tropes
   - Pattern #26: Signposting
   - Pattern #27: Fragmented headers
   - Add to SKILL_CORE_PATTERNS.md
   - Update to 30 patterns total

3. **Adopt PR #16: AI-Signatures in Code Fix**
   - Align with Technical Module
   - Test on AI-generated code samples

4. **Adopt PR #17: Offline Robustness**
   - Add non-text slop patterns
   - Test on offline/non-text examples

### Secondary Objectives

5. **Security Review: PR #44 (Wikipedia Sync)**
   - Review implementation
   - Decide on adoption with safeguards
   - Document decision

---

## Upstream PR Details

### PR #49: Claude Compatibility
- **URL:** https://github.com/blader/humanizer/pull/49
- **Type:** Bug fix
- **Priority:** Critical
- **Status:** Open
- **Issue:** #48 (Format is wrong for Claude.ai)

### PR #39: Patterns #25-27
- **URL:** https://github.com/blader/humanizer/pull/39
- **Type:** Pattern enhancement
- **Priority:** High
- **Status:** Open
- **Patterns:** Persuasive tropes, signposting, fragmented headers

### PR #16: AI-Signatures Fix
- **URL:** https://github.com/blader/humanizer/pull/16
- **Type:** Bug fix
- **Priority:** High
- **Status:** Open
- **Issue:** #12 (AI signatures in code)

### PR #17: Offline Robustness
- **URL:** https://github.com/blader/humanizer/pull/17
- **Type:** Feature enhancement
- **Priority:** High
- **Status:** Open
- **Reviews:** 3 reviews, 6 comments

### PR #44: Wikipedia Sync (Security Review)
- **URL:** https://github.com/blader/humanizer/pull/44
- **Type:** Feature (auto-updating patterns)
- **Priority:** Medium (with safeguards)
- **Status:** Open
- **Concerns:** Security, opt-in behavior, validation

---

## Implementation Plan

### Phase 1: Fetch and Review (2 hours)
- Fetch all 5 PRs
- Review diffs and comments
- Assess compatibility with modular architecture

### Phase 2: Adopt Critical Fixes (4 hours)
- Merge PR #49 (Claude compatibility)
- Merge PR #16 (AI-signatures fix)
- Test compiled output

### Phase 3: Adopt Pattern Enhancements (4 hours)
- Merge PR #39 (patterns #25-27)
- Merge PR #17 (offline robustness)
- Update SKILL_CORE_PATTERNS.md to 30 patterns
- Bump version to 3.1.0

### Phase 4: Security Review (2 hours)
- Review PR #44 (Wikipedia sync)
- Decide: adopt/defer/reject
- Document decision in track log

### Phase 5: Validation & Closure (2 hours)
- Run full test suite
- Validate all adapters
- Close track and archive

---

## Success Criteria

| Criterion | Target | Status |
|-----------|--------|--------|
| PR #49 adopted | Yes | ⏳ Pending |
| PR #39 adopted | Yes | ⏳ Pending |
| PR #16 adopted | Yes | ⏳ Pending |
| PR #17 adopted | Yes | ⏳ Pending |
| PR #44 reviewed | Yes | ⏳ Pending |
| Tests passing | 14/14 | ⏳ Pending |
| Adapters synced | 16/16 | ⏳ Pending |

---

## Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| PR conflicts with modules | High | Medium | Manual merge, test thoroughly |
| Pattern overlap | Medium | Low | Review existing patterns first |
| Wikipedia sync security | High | Medium | Opt-in, validation, safeguards |

---

## Timeline

**Day 1:** Fetch, review, adopt critical fixes (PR #49, #16)
**Day 2:** Adopt patterns (PR #39, #17), security review (PR #44), close track

---

*Created: 2026-03-04*
*Status: Ready to Start*
