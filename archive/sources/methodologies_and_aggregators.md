# Methodologies, Models, and Aggregators

**Sources:** 21-35 (NIST 2025, ACL, arXiv, Kaggle, Models, etc.)

**Accessed:** 2026-01-31

## Repositories & Databases

- **arXiv/ACL/Frontiers:** Primary sources for academic research on detection.
- **Kaggle:** Source of "AI vs Human" datasets (e.g., 487k essays).
- **GitHub:** Source of implementation code.

## Evaluation Methodologies

- **Statistical Tests:** T-Test, ANOVA (used to validate feature significance).
- **ML Metrics:** Confusion Matrix, ROC-AUC (standard evaluation).
- **Explainability:** SHAP/LIME (used to determine _why_ a detector flagged text - e.g., identifying "delve" as a high-weight feature).

## AI Models (The Generators)

- **Proprietary:** ChatGPT (GPT-3.5/4), Gemini.
- **Open Source:** Llama, Mistral, Qwen.
- **Characteristics:**
  - High fluency (low grammar errors).
  - Variable perplexity depending on temperature.
  - Tendency to **Hallucinate** (citations, facts) when prompted for specifics.

## Key Feature Addition

- **Hallucination Patterns:** Plausible but incorrect citations, "False Ranges", and non-existent references are strong signs of AI generation in academic/technical contexts.
