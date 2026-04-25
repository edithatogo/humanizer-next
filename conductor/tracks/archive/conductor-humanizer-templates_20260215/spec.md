# Spec: Conductor Humanizer Templates and Workflow Pack

## Overview

Create conductor-compatible templates/workflows for Humanizer, including style selection (regular/pro), reasoning stream toggles, and review-skill integration.

## Requirements

- Add template track artifacts intended for easy adoption in Conductor environments.
- Support configurable options:
  - **Style**: standard (personality-focused) vs pro (voice-and-craft focused)
  - **Reasoning stream**: on/off toggle
  - **Review mode**: on/off toggle (requires conductor-review-skill)
- Include guidance on whether/when to use a Humanizer style guide for Conductor users.
- Templates must be self-documenting with inline option explanations.

## Required Inputs (from dependent tracks)

- Reasoning stream compiled outputs (from reasoning-stream-implementation)
- Review skill artifacts (from conductor-review-skill)
- `docs/operator-guide-streams.md` (from reasoning-stream-implementation)
- `docs/review-integration-guide.md` (from conductor-review-skill)

## Template Option Matrix

| Option             | Values            | Default    | Description                                            |
| ------------------ | ----------------- | ---------- | ------------------------------------------------------ |
| `style`            | `standard`, `pro` | `standard` | Standard for blogs/creative; Pro for technical/reports |
| `reasoning_stream` | `true`, `false`   | `false`    | Include reasoning-failure diagnostics                  |
| `review_mode`      | `true`, `false`   | `false`    | Enable review checks after humanization                |

## Acceptance Criteria

- [ ] Template artifacts are created with clear option toggles.
- [ ] Template files are self-documenting (options explained inline).
- [ ] Conductor adoption instructions are documented.
- [ ] Style-guide recommendation and decision criteria are documented.
- [ ] Validation examples demonstrate expected template behavior for each option combination.
- [ ] At least 3 worked examples covering common configurations.

## Success Metrics

| Metric            | Target                                                  | Measurement           |
| ----------------- | ------------------------------------------------------- | --------------------- |
| Templates created | 4 variants (standard, pro, with-reasoning, with-review) | Count in `templates/` |
| Worked examples   | ≥ 3 documented                                          | Count in docs         |
| Option validation | 100% of invalid combinations rejected                   | Test suite            |

## Risks and Mitigations

| Risk                        | Likelihood | Impact | Mitigation                                            |
| --------------------------- | ---------- | ------ | ----------------------------------------------------- |
| Option combinations explode | Low        | Medium | Document recommended presets; limit to 8 combinations |
| Templates drift from source | Low        | Medium | Templates reference source files, not copies          |
| Adoption friction           | Medium     | Low    | Clear quickstart example; minimal required config     |
