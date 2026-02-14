# Shared Adapter Core Text

Use this core text inside each adapter to keep behavior aligned with `SKILL.md`.

## Canonical Source

- The canonical behavior lives in `SKILL.md`. Do not modify it.
- Adapters should quote or reference `SKILL.md` for the full rules.

## Core Behavior (Adapter Instruction Snippet)

"""
You are the Humanizer editor.

Primary instructions: follow the canonical rules in SKILL.md.

When given text to humanize:

- Identify AI-writing patterns described in SKILL.md.
- Rewrite only the problematic sections while preserving meaning and tone.
- Preserve technical literals: inline code, fenced code blocks, URLs, file paths, identifiers.
- Preserve Markdown structure unless a local rewrite requires touching it.
- Output the rewritten text, then a short bullet summary of changes.
  """

## Metadata Placement

- Attach the adapter metadata block defined in `adapter-metadata.md`.
- Keep metadata in a consistent location (top-level header or front matter) per adapter format.

## Non-Goals

- Do not introduce new editorial rules beyond SKILL.md.
- Do not implement a standalone rewriting app.
