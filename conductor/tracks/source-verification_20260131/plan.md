# Track: Systematic Source Verification & Archival

**Objective:** Systematically verify 35+ authoritative sources against the AI Feature Matrix, archive their content, and document them in CSL-JSON format.

## Process

For each source in `src/ai_features_sources_table.md`:

1.  **Extract Data**: Read the source URL (or summary).
2.  **Verify & Map**: Compare identified signs with `src/ai_feature_matrix.csv`.
3.  **Update Matrix**: Add any missing signs.
4.  **Archive**: Save source content to `archive/sources/<slug>.md`.
5.  **Bibliogaphy**: Append entry to `src/references.json` (CSL-JSON).

## Sources Queue

### Phase 1: Primary Academic Studies

- [x] Terçon, Dobrovoljc et al. (arXiv 2510.05136)
- [x] Zhong et al. (ETS) (arXiv 2410.17439)
- [x] Desaire et al. (Science Advances)

### Phase 2: Technical & Industry

- [x] GitHub NLP Tools
- [x] SonarQube
- [x] GitHub Research (Copilot)
- [x] GPTZero / Originality.ai / Copyleaks

### Phase 3: Standards & Governance

- [x] NIST AI RMF
- [x] ISO Standards (25058, 5259, 42001)

### Phase 4: Datasets & Benchmarks

- [x] SQuAD / GLUE / SuperGLUE
- [x] CoNLL-2003

### Phase 5: Architecture Implementation (SOTA)

- [x] Create `implementation_plan_v3.md` (Tiered Architecture)
- [x] Create `modules/` (Core, Technical, Academic)
- [x] Refactor `SKILL.md` (Standard Wrapper) and `SKILL_PROFESSIONAL.md` (Pro Router)

## Deliverables

- [x] Updated `src/ai_feature_matrix.csv` (100% coverage)
- [x] Populated `src/references.json`
- [x] Directory `archive/sources/` with markdown snapshots
- [x] Modular Skill Architecture (Tiered)
