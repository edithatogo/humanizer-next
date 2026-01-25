# Plan: Build multi-agent Humanizer adapters

## Phase 1: Define adapter architecture
- [ ] Task: Inventory target environments and adapter formats
- [ ] Task: Define adapter metadata contract (version + last synced)
- [ ] Task: Draft shared adapter core text (references SKILL.md)
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Define adapter architecture' (Protocol in workflow.md)

## Phase 2: Implement adapters
- [ ] Task: Add Codex CLI adapter (AGENTS.md/workflow instructions)
- [ ] Task: Add Gemini CLI adapter (prompt/workflow wrapper)
- [ ] Task: Add VS Code adapter (workspace instructions/snippets)
- [ ] Task: Add Google Antigravity adapter (workflow wrapper)
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Implement adapters' (Protocol in workflow.md)

## Phase 3: Drift control and validation
- [ ] Task: Write a validation script to check adapter metadata matches SKILL.md version
- [ ] Task: Add CI-friendly command to run validation
- [ ] Task: Update README to document adapters and sync process
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Drift control and validation' (Protocol in workflow.md)

## Phase 4: Release readiness
- [ ] Task: Run validation and verify no changes to SKILL.md
- [ ] Task: Tag/record adapter pack versioning approach (doc-only)
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Release readiness' (Protocol in workflow.md)
