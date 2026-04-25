# Spec: Implement Reasoning-Focused Humanizer Stream

## Overview

This track implements the reasoning-failure stream defined in reasoning-failures-stream_20260215, focusing on repository productization: source fragments, compiled outputs, adapter compatibility, and regression safety.

## Requirements

- Create a separate reasoning-focused module/skill stream.
- Keep core Humanizer behavior stable and backward-compatible.
- Integrate canonical reasoning-failure taxonomy and citation model.
- Update sync/build paths so adapters receive deterministic output.
- Add changelog/version notes for this stream.
- Validate all adapters receive the reasoning stream correctly.

## Input Artifacts (from reasoning-failures-stream_20260215)

- `archive/sources_manifest.json` - source provenance
- `docs/reasoning-failures-taxonomy.md` - canonical category schema
- `docs/TAXONOMY_CHANGELOG.md` - taxonomy evolution tracking
- `src/reasoning-stream/*.md` - source fragments for reasoning module
- `scripts/research/citation-normalize.js` - citation helper utility

## Adapter Validation Checklist

The reasoning stream must appear in all compiled adapter outputs:

| Adapter     | File Path                       | Validation Method                 |
| ----------- | ------------------------------- | --------------------------------- |
| Gemini CLI  | `adapters/gemini/SKILL.md`      | Grep for reasoning stream section |
| Qwen CLI    | `adapters/qwen/SKILL.md`        | Grep for reasoning stream section |
| Copilot     | `adapters/copilot/SKILL.md`     | Grep for reasoning stream section |
| Antigravity | `adapters/antigravity/SKILL.md` | Grep for reasoning stream section |
| VS Code     | `adapters/vscode/SKILL.md`      | Grep for reasoning stream section |
| Codex CLI   | `adapters/codex/SKILL.md`       | Grep for reasoning stream section |

## Acceptance Criteria

- [ ] Reasoning stream source files exist and are wired to build/sync pipeline.
- [ ] All 6 adapter outputs contain reasoning stream section.
- [ ] Core humanization section in adapters is unchanged from pre-track state.
- [ ] Tests validate no regression in existing core behavior.
- [ ] Taxonomy references resolve correctly in compiled outputs.
- [ ] Changelog/versioning updates are committed.
- [ ] Operator guide documents how to invoke reasoning stream.
- [ ] CI includes adapter validation step to catch future regressions.

## Success Metrics

| Metric                    | Target             | Measurement                  |
| ------------------------- | ------------------ | ---------------------------- |
| Adapters with stream      | 6/6 (100%)         | Grep validation in CI        |
| Core regression tests     | All passing        | `npm test` exit code         |
| Taxonomy references valid | 100% resolve       | Link checker or manual audit |
| Version bump              | Minor (new stream) | Check SKILL.md frontmatter   |

## Risks and Mitigations

| Risk                      | Likelihood | Impact | Mitigation                                        |
| ------------------------- | ---------- | ------ | ------------------------------------------------- |
| Adapter misses stream     | Medium     | High   | Explicit adapter validation task with grep checks |
| Core behavior drift       | Low        | High   | Regression test suite comparing pre/post outputs  |
| Taxonomy reference broken | Low        | Medium | Test: taxonomy terms resolve in compiled outputs  |
