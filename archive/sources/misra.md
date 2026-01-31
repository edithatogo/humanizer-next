# MISRA C/C++ Guidelines

**Source:** [misra.org.uk](https://misra.org.uk)

**Accessed:** 2026-01-31

## Summary

Guidelines for the use of the C/C++ language in critical systems. Relevant for detecting non-compliant AI-generated code in embedded contexts.

## Key Rules (AI Signs = Violations)

1. **Type Checking:** Strict typing (AI often hallucinates loose types).
2. **Control Flow:** Restricted use of jumps/recursion (AI often writes recursive solutions without checks).
3. **Pointer Safety:** Explicit lifecycle management.
4. **Declarations:** Strict variable scope.

## Relevance

AI-generated code often fails MISRA checks due to prioritizing "pythonic" or "modern" styles over stuck-at-fault safety.
