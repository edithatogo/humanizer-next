# Spec: Migrate WARP.md to Agents.md

## Context

The repository currently uses `WARP.md` to provide repository context and instructions to the Warp AI terminal. The user wishes to migrate this to the open [Agents.md](https://agents.md) standard to improve interoperability and standardization.

## Requirements

1.  **Issue Tracking:** Create a formal GitHub issue to track this migration before proceeding with the PR.
2.  **Consolidate Instructions:** Merge the repository context and guidelines from `WARP.md` into the existing root `AGENTS.md`.
3.  **Standard Compliance:** Align `AGENTS.md` with the recommended structure from the [Agents.md Specification](https://agents.md).
    - Use standard headers: `## Capabilities`, `## Constraints`, `## Environment`, etc.
4.  **Generalization:** Rewrite any Warp-specific instructions to be tool-agnostic.
5.  **Multi-Adapter Discovery:** Add a section to `AGENTS.md` that guides agents to other adapter-specific instructions located in the `adapters/` directory.
6.  **Metadata Preservation:** Preserve existing frontmatter for `sync-adapters.ps1` compatibility.
7.  **Interoperability:** Consider adding a `manifest.json` or `agent.yaml` if suggested by the latest standard draft for better machine readability.
8.  **Cleanup:** Delete `WARP.md` and update all relative links in `README.md`.

## Acceptance Criteria

- GitHub Issue created and referenced in the PR.
- `WARP.md` is removed.
- `AGENTS.md` contains sections: `About`, `Structure`, `Development`, `Interoperability`.
- References to `WARP.md` in `README.md` are updated to point to `AGENTS.md`.
- `scripts/sync-adapters.js` works without issue.
