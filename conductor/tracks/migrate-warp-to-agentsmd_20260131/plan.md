# Plan: Migrate WARP.md to Agents.md

## Phase 1: Preparation (Done)

- [x] Task: Create Conductor track

## Phase 2: Migration (Done)

- [x] Task: Update `AGENTS.md`
  - [x] **Content Merge:** Append `WARP.md` sections to `AGENTS.md`.
  - [x] **Generalize:** Rename/rewrite Warp-specific references.
  - [x] **Formatting:** Ensure consistent header hierarchy.
- [x] Task: Update `README.md`
  - [x] Replace `WARP.md` references with `AGENTS.md`.
  - [x] Update "Adapters" section.
- [x] Task: Delete `WARP.md`

## Phase 3: Verification (Done)

- [x] Task: **Metadata Check:** Verify `AGENTS.md` frontmatter.
- [x] Task: Run `scripts/validate-adapters.js`.
- [x] Task: Check for broken links in `README.md`.
- [x] Task: Open Pull Request #1
