# Detection of ChatGPT-Generated Abstracts

**Source:** [CEUR-WS NL4AI Workshop](https://ceur-ws.org/Vol-3551/paper3.pdf)
**Authors:** André, Eriksen, Jakobsen, Mingolla, Thomsen
**Date:** 2023

**Accessed:** 2026-01-31

## Summary

Analyzed 4,000 abstracts (arXiv vs ChatGPT). Precision 0.986 with Random Forest.

## The 7 Features

1. **Perplexity:** GPT-2 based.
2. **Grammar Errors:** via language_tool_python (AI has fewer errors).
3. **TTR-1gram:** Vocabulary diversity.
4. **TTR-2gram:** Bigram diversity.
5. **TTR-3gram:** Trigram diversity.
6. **Average Token Length:** Word complexity.
7. **Function Word Frequency:** Prepositions, pronouns, conjunctions.

## Key Findings

- **Perplexity** is the most dominant feature (0.71 importance).
- **Grammar** (AI is perfect) and **TTR** (AI is repetitive) are next.
