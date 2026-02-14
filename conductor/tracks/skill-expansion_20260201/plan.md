# Track: Skill Expansion & Portable Compilation

**Goal:** Enhance Humanizer with SOTA Tiered Architecture, Governance checks, and portable compilation.

## Phase 1: Skill Modularization

- [x] Refactor `SKILL.md` to be a lightweight wrapper (Standard)
- [x] Create `modules/SKILL_CORE.md` (General Patterns)
- [x] Create `modules/SKILL_TECHNICAL.md` (Code/Docs)
- [x] Create `modules/SKILL_ACADEMIC.md` (Papers)
- [x] Create `modules/SKILL_GOVERNANCE.md` (ISO/NIST)

## Phase 2: Router & Compiler

- [x] Implement `SKILL_PROFESSIONAL.md` as Context-Aware Router
- [x] Create `scripts/compile-skill.js` to bundle modules
- [x] Implement Version Injection (package.json sync)

## Phase 3: Final Verification

- [x] Run `npm test` successfully
- [x] Verify `dist/humanizer-pro.bundled.md` content
- [x] Ensure routing logic triggers are present

## Phase 4: Adapter Reconfiguration (User Request)

- [ ] Research & Fix Qwen CLI Installation (Target `~/.qwen/extensions`)
- [ ] Scaffold/Install Codex Adapter (if missing)
- [ ] Verify VS Code Global Installation (Snippets)
