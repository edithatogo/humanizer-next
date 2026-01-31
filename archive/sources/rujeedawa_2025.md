# Unmasking AI Generated Texts

**Source:** [IJACSA Vol 16 No 3](https://thesai.org/Downloads/Volume16No3/Paper_21-Unmasking_AI_Generated_Texts.pdf)
**Authors:** Rujeedawa, Pudaruth, Malele

**Accessed:** 2026-01-31

## Summary

Evaluated 6 linguistic/stylistic features on 483k essays (Kaggle). Random Forest achieved 82.6% accuracy.

## The 6 Features

1. **Text Length:** AI texts tend to have specific length characteristics (often constrained or verbose depending on prompt).
2. **Punctuation Count:** Frequency of marks.
3. **Gunning Fog Index:** Readability complexity.
4. **Flesch Reading Ease:** Readability ease.
5. **Vocabulary Richness:** Type-Token Ratio (TTR).
6. **Sentiment Polarity:** Positive/Negative/Neutral balance.

## Key Findings (Mapped to Matrix)

- **Readability:** AI often has standard/predictable readability scores.
- **Sentiment:** Often neutral or overly positive (Sycophantic).
- **Vocabulary:** TTR is a strong discriminator.
