# Humanizer Academic Module: Research & Formal Writing

This module applies linguistic and statistical analysis (Desaire, Terçon, Zhong) to identify AI-generated academic text.

## LINGUISTIC FINGERPRINTS

### 1. Punctuation Profile (Desaire et al., 2023)
*   **Sign:** AI uses significantly fewer **parentheses ( )**, **dashes (—)**, and **semicolons (;)** than human scientists.
*   **Sign:** Heavy reliance on simple comma usage.
*   **Action:** Check for "flat" punctuation variance.

### 2. Nominalization (Terçon et al., 2025)
*   **Sign:** Heavy use of abstract nouns ("The realization of the implementation...") instead of verbs ("Implementing...").
*   **Sign:** High density of determiners (the, a, an) + nouns.

### 3. Low Lexical Diversity (TTR)
*   **Sign:** Repetitive use of the same transition words (Therefore, Consequently, Furthermore).
*   **Metric:** Low Type-Token Ratio (TTR) in long paragraphs.

## STRUCTURAL PATTERNS

### 4. Semantic Fingerprinting (Originality.AI/Zhong)
*   **Sign:** "Introduction -> Challenges -> Conclusion" template regardless of topic.
*   **Sign:** Formulaic paragraphs: [Topic Sentence] -> [Elaboration] -> [Transition].

### 5. Hallucination Patterns
*   **Sign:** "False Ranges" (e.g., "From the atomic level to the cosmic scale").
*   **Sign:** Plausible but incorrect citations (Author + Year match, but Title is wrong).
*   **Action:** **VERIFY** every citation against a real database (Google Scholar/DOI).

## INSTRUCTION FOR ACADEMIC REVIEW
1.  **Citation Check:** rigorous verification of all references.
2.  **Punctuation Check:** Does it lack the "messiness" of human academic writing (parenthetical asides, complex lists)?
3.  **Tone Check:** Is it "Sycophantic" or "Overly Formal"? (Terçon).
4.  **Structure Check:** Does it follow the rigid "5-paragraph essay" model?
