# Ralph Loop Configuration: Cleanup, Standardize, SOTA

**Version:** 1.0

**Track:** `repo-self-improvement_20260303`

**Created:** 2026-04-04

**Enabled Phases:** 1, 2, 3

---

## Overview

This Ralph Loop explores the repository to identify opportunities for:

1. **Cleanup** - Remove redundant, outdated, or dead code
2. **Standardize** - Ensure consistent patterns across modules
3. **SOTA** - Advance to state-of-the-art practices

---

## Ralph Loop Prompts by Phase

### Phase 1: Repository Cleanup

**Goal:** Identify cleanup opportunities across the entire repository

**Prompt:**

```
Explore this repository comprehensively to identify cleanup opportunities.

Focus Areas:
1. **Dead Files:**
   - Are there any unused files in the root or subdirectories?
   - Are there deprecated templates or old track artifacts that can be removed?
   - Check for duplicate files that could be consolidated

2. **Outdated Content:**
   - Scan for outdated dates, version numbers, or stale references
   - Identify old comments or TODOs that are no longer relevant
   - Check for broken links in documentation

3. **Orphaned Files:**
   - Find files not referenced by any other file
   - Identify tracks with no index.md or metadata.json
   - Check for incomplete archived tracks

4. **Excessive Depth:**
   - Are there directories nested too deep?
   - Can flat structures be consolidated?

5. **Large Files:**
   - Identify files over 500 lines that could be split
   - Check for files with excessive inline comments

Run up to 5 iterations. After each iteration, ask: "Are there further cleanup opportunities?"

Completion Criteria:
- No dead or orphaned files identified
- All outdated content flagged
- Consolidation opportunities documented

Output Format:
- List of files to remove
- List of files to update
- List of files to consolidate
```

**Max Iterations:** 5

**Completion Promise:** "No further cleanup opportunities identified"

**Output File:** `docs/ralph-loop-cleanup-report.md`

---

### Phase 2: Standardization

**Goal:** Identify opportunities to standardize patterns across modules

**Prompt:**

```
Explore the repository to identify standardization opportunities.

Focus Areas:
1. **Module Structure:**
   - Compare src/modules/*.md files for consistent structure
   - Check if all modules have the same sections
   - Verify frontmatter consistency across modules

2. **Naming Conventions:**
   - Are file names consistent?
   - Are header levels consistent?
   - Is terminology used consistently?

3. **Pattern Format:**
   - Do all patterns have the same structure (description, examples, severity)?
   - Are example formats consistent?
   - Is severity classification consistent?

4. **Documentation Style:**
   - Are headers formatted consistently?
   - Is bullet/numbering style consistent?
   - Are code block styles consistent?

5. **Adapter Consistency:**
   - Check adapters/ directory
   - Are all adapter files in sync with source?
   - Is adapter naming consistent?

Run up to 5 iterations. After each iteration, ask: "Are there further standardization opportunities?"

Completion Criteria:
- All modules have consistent structure
- Naming conventions documented
- Pattern format standardized
- Adapter naming consistent

Output Format:
- List of standardization changes needed
- Naming convention guide
- Consistency rules to apply
```

**Max Iterations:** 5

**Completion Promise:** "Standardization analysis complete"

**Output File:** `docs/ralph-loop-standardize-report.md`

---

### Phase 3: SOTA Advancement

**Goal:** Identify opportunities to advance to state-of-the-art practices

**Prompt:**

```
Explore this repository to identify opportunities to advance to state-of-the-art (SOTA).

Focus Areas:
1. **Pattern Coverage:**
   - Compare current patterns with latest research on AI writing detection
   - Are there new patterns from academic literature to add?
   - Are severity classifications based on latest evidence?

2. **Technical Improvements:**
   - Are there opportunities for better pattern matching algorithms?
   - Could machine learning improve detection?
   - Are there better ways to handle edge cases?

3. **Documentation SOTA:**
   - Check SKILL.md against industry best practices
   - Are examples cutting-edge?
   - Is the skill structure optimal for LLM consumption?

4. **Tooling:**
   - Are there better tools for testing patterns?
   - Could automated detection testing improve?
   - Are there CI/CD improvements?

5. **Distribution:**
   - Are all adapters up to date?
   - Is there a missing platform?
   - Could adapter sync be improved?

6. **Research:**
   - Check src/research_references.md for currency
   - Are there newer papers to cite?
   - Is the pattern matrix current?

Run up to 5 iterations. After each iteration, ask: "Are there further SOTA opportunities?"

Completion Criteria:
- Pattern coverage verified as current
- Technical improvements identified
- Documentation SOTA confirmed
- Distribution channels optimized

Output Format:
- SOTA recommendations by priority
- Research gaps identified
- Implementation roadmap
- Evidence supporting recommendations
```

**Max Iterations:** 5

**Completion Promise:** "SOTA analysis complete"

**Output File:** `docs/ralph-loop-sota-report.md`

---

## Ralph Loop Execution Protocol

### Pre-Execution Checklist

- [ ] Verify Ralph Loop extension is installed
- [ ] Confirm track is marked as `[~]` In Progress
- [ ] Review phase goals and completion criteria
- [ ] Create output directory if needed

### Execution Steps

1. **Start Ralph Loop:**

   ```bash
   /ralph-loop "<prompt from above>"
   ```

2. **Monitor Progress:**
   - Watch for iteration count
   - Review changes after each iteration
   - Intervene if going off-track

3. **Completion:**
   - Verify completion promise is TRUE
   - Review final report
   - Accept/reject changes with rationale

4. **Documentation:**
   - Save report to docs/
   - Update track plan with findings
   - Commit changes with proper message

### Post-Execution

- [ ] Review all accepted changes
- [ ] Run validation suite (`npm run lint:all`, `npm test`)
- [ ] Update adapter sync if skill changed
- [ ] Document learnings in track notes

---

## Guardrails

### Never Auto-Change

1. **Pattern Definitions:**
   - Core patterns (1-30) need manual review
   - New patterns require examples and testing

2. **Adapter Files:**
   - Never modify adapters/ without sync script
   - Adapter changes require validation

3. **Release Versions:**
   - Version bumps require human approval

### Always Require Human Review

1. Breaking changes to skill interface
2. New pattern additions
3. Adapter creation/deletion
4. Major documentation restructuring

---

## Success Metrics

| Metric                   | Target | Measurement                        |
| ------------------------ | ------ | ---------------------------------- |
| Cleanup Items Identified | >10    | Files flagged per run              |
| Standardization Gaps     | >5     | Inconsistencies per run            |
| SOTA Recommendations     | >5     | Improvements identified per run    |
| Acceptance Rate          | 100%   | Changes merged / Changes suggested |

---

## Version History

| Version | Date       | Changes                                          |
| ------- | ---------- | ------------------------------------------------ |
| 1.0     | 2026-04-04 | Initial cleanup, standardize, SOTA configuration |

---

_Configuration Status: Ready for Execution_
