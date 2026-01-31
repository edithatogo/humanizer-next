# Accurately detecting AI text when ChatGPT is told to write like a chemist

**Source:** [Science Advances (PMC10704924)](https://pmc.ncbi.nlm.nih.gov/articles/PMC10704924/)
**Authors:** Heather Desaire, Aleesa E Chua, Min-Gyu Kim, David Hua
**Date:** 2023

**Accessed:** 2026-01-31

## Abstract

We developed an accurate AI text detector for scientific journals... tested on human text from 13 chemistry journals and AI text from GPT-4... Accuracy 98-100% at paragraph level.

## The 20 Linguistic Features

1. **Paragraph Complexity:** Sentences per paragraph.
2. **Paragraph Length:** Words per paragraph.
3. **Punctuation:** Parentheses count.
4. **Punctuation:** Dashes count.
5. **Punctuation:** Semicolons count.
6. **Punctuation:** Question marks count.
7. **Punctuation:** Apostrophes count.
8. **Sentence Length Variance:** Standard deviation of sentence length.
9. **Flow:** Consecutive sentence length difference.
10. **Short Sentences:** Presence of sentences < 11 words.
11. **Long Sentences:** Presence of sentences > 34 words.
12. **Numbers:** Presence of digits.
13. **Capitalization:** Use of capital letters.
14. **Function Word:** "although"
15. **Function Word:** "however"
16. **Function Word:** "but"
17. **Function Word:** "because"
18. **Function Word:** "this"
19. **Function Word:** "others"/"researchers" (vs scientist preferences)
20. **Function Word:** "et"

## Key Findings (Mapped to Matrix)

- **Sentence Length Consistency:** AI is more uniform (lower std dev).
- **Punctuation Preferences:** AI uses fewer parentheses/dashes than scientists.
- **Function Words:** Scientists use "however", "but"; AI uses "others".
