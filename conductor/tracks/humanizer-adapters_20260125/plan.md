# Plan: Build multi-agent Humanizer adapters

## Phase 1: Define adapter architecture [checkpoint: 4b15a2b]
- [x] Task: Inventory target environments and adapter formats (afea8e8)
- [x] Task: Define adapter metadata contract (version + last synced) (b412925)
- [x] Task: Draft shared adapter core text (references SKILL.md) (1e8dfc9)
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Define adapter architecture' (Protocol in workflow.md)

## Phase 2: Implement adapters [checkpoint: 39ef58b]
- [x] Task: Add Codex CLI adapter (AGENTS.md/workflow instructions) (d240d65)
- [x] Task: Add Gemini CLI adapter (prompt/workflow wrapper) (c7945c6)
- [x] Task: Add VS Code adapter (workspace instructions/snippets) (0fb8fd0)
- [x] Task: Add Google Antigravity adapter (workflow wrapper) (aebfe47)
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Implement adapters' (Protocol in workflow.md)

## Phase 3: Drift control and validation [checkpoint: 389219d]
- [x] Task: Write a validation script to check adapter metadata matches SKILL.md version (c471faa)
- [x] Task: Add CI-friendly command to run validation (8598be2)
- [x] Task: Update README to document adapters and sync process (158babb)
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Drift control and validation' (Protocol in workflow.md)

## Phase 4: Release readiness
- [x] Task: Run validation and verify no changes to SKILL.md (7a37c65)
- [~] Task: Tag/record adapter pack versioning approach (doc-only)
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Release readiness' (Protocol in workflow.md)
