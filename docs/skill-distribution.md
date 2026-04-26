# Skill distribution

This document covers optional ways to move the maintained Humanizer skill into other environments. The repo itself now only maintains the compiled root outputs:

- `SKILL.md`
- `SKILL_PROFESSIONAL.md`

## Source of truth

Use `npm run sync` to rebuild the compiled skill files from `src/`. Use `npm run validate` to confirm the documentation surface remains consistent.

## Local verification

The repo’s own checks are the normal way to verify a change:

```bash
npm test
```

That runs the Node test suite, sync drift check, and the skill tests.

## Notes

- This repository no longer publishes adapter bundles or consumer-specific install paths.
- Keep any new distribution guidance aligned with the supported root outputs, not with legacy adapter trees.
