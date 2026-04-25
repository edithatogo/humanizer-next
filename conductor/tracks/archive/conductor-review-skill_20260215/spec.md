# Spec: Humanizer Review Skill

## Overview

Create a new Humanizer review-oriented skill/command that mirrors Conductor review intent: detect issues, prioritize findings, and produce actionable remediation guidance for writing quality and reasoning-failure evidence hygiene.

## Requirements

- Add a dedicated review skill surface in this repo.
- Define severity-ordered findings output with file/path references.
- Include checks for:
  - Citation quality (missing citations, unverifiable sources, social-only claims)
  - Taxonomy consistency (unknown categories, deprecated categories)
  - Policy compliance (humanization vs reasoning diagnostics boundary)
  - Evidence threshold violations (categories without sufficient backing)
- Provide adapter-ready integration for supported environments.
- Support both "quick review" (high-confidence issues only) and "deep review" (all checks).

## Output Contract

```
## Review Summary
- Total findings: N
- P0 (critical): N
- P1 (major): N
- P2 (minor): N
- P3 (suggestion): N

## Findings

### P0 (Critical) - Must Fix
- [file:line] CATEGORY: message
  Remediation: specific action

### P1 (Major) - Should Fix
...

### P2 (Minor) - Consider Fixing
...

### P3 (Suggestion) - Optional Improvement
...
```

## Required Inputs (from reasoning-failures-stream)

- `docs/reasoning-failures-taxonomy.md` - category schema for checks
- `docs/editorial-policy.md` - boundary rules between humanization and reasoning

## Acceptance Criteria

- [ ] Review skill files are added and documented.
- [ ] Output format prioritizes findings by severity.
- [ ] Test fixture corpus covers all taxonomy categories.
- [ ] Tests/fixtures validate expected review behavior.
- [ ] False positive rate < 10% on known-good corpus.
- [ ] Integration notes for conductor-like usage are documented.
- [ ] Quick review and deep review modes both work.

## Success Metrics

| Metric                    | Target                      | Measurement                   |
| ------------------------- | --------------------------- | ----------------------------- |
| Test fixture coverage     | 100% of taxonomy categories | Count fixtures vs taxonomy    |
| False positive rate       | < 10%                       | Run against known-good corpus |
| Finding severity accuracy | > 95% correct ordering      | Manual audit of sample output |

## Risks and Mitigations

| Risk                      | Likelihood | Impact | Mitigation                                                        |
| ------------------------- | ---------- | ------ | ----------------------------------------------------------------- |
| High false positive rate  | Medium     | High   | Test fixture corpus with known-good/bad examples; tune thresholds |
| Taxonomy drift            | Low        | Medium | Review skill reads taxonomy from file, not hardcoded              |
| Performance on large docs | Low        | Low    | Incremental review mode for large files                           |
