
## SIGNS OF AI WRITING MATRIX

The following matrix maps observed patterns of AI-generated text to the major detection platforms and academic resources.
For a machine-readable comprehensive list of features, see [`src/ai_feature_matrix.csv`](./ai_feature_matrix.csv).
For the detailed source table with methodology and metrics, see [`src/ai_features_sources_table.md`](./ai_features_sources_table.md).

### 1. Content and Analysis Patterns

| Pattern | Sign | W | G | O | C | WI | T | S |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| #1 | **Significance Inflation** ("testament", "pivotal") | [x] | [ ] | [ ] | [x] | [ ] | [ ] | [ ] |
| #2 | **Notability Puffery** (Media name-dropping) | [x] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| #3 | **Superficial -ing Analysis** ("underscoring") | [x] | [ ] | [ ] | [x] | [ ] | [ ] | [ ] |
| #4 | **Promotional Language** ("nestled", "vibrant") | [x] | [ ] | [x] | [ ] | [ ] | [ ] | [x] |
| #5 | **Vague Attributions** ("Experts argue") | [x] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| #6 | **Formulaic "Challenges" Sections** | [x] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

### 2. Language and Grammar Patterns

| Pattern | Sign | W | G | O | C | WI | T | S |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| #7 | **High-Frequency AI Vocabulary** ("delve") | [x] | [x] | [x] | [x] | [x] | [ ] | [x] |
| #8 | **Copula Avoidance** ("serves as" vs "is") | [x] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| #9 | **Negative Parallelisms** ("Not only... but") | [x] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| #10 | **Rule of Three Overuse** | [x] | [ ] | [x] | [ ] | [ ] | [ ] | [ ] |
| #11 | **Synonym Cycling** (Elegant Variation) | [x] | [ ] | [x] | [ ] | [ ] | [ ] | [ ] |
| #12 | **False Ranges** ("from X to Y") | [x] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

### 3. Style and Formatting Patterns

| Pattern | Sign | W | G | O | C | WI | T | S |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| #13 | **Em Dash Overuse** (mechanical) | [x] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| #14 | **Mechanical Boldface Overuse** | [x] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| #15 | **Inline-Header Vertical Lists** | [x] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| #16 | **Mechanical Title Case in Headings** | [x] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| #17 | **Emoji Lists/Headers** | [x] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| #18 | **Curly Quotation Marks** (defaults) | [x] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| #26 | **Over-Structuring** (Unnecessary Tables/Lists) | [x] | [ ] | [ ] | [x] | [ ] | [ ] | [x] |

### 4. Communication and Logic Patterns

| Pattern | Sign | W | G | O | C | WI | T | S |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| #19 | **Chatbot Artifacts** ("I hope this helps") | [x] | [ ] | [x] | [ ] | [ ] | [ ] | [ ] |
| #20 | **Knowledge-Cutoff Disclaimers** | [x] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| #21 | **Sycophantic / Servile Tone** | [x] | [ ] | [ ] | [x] | [ ] | [ ] | [ ] |
| #22 | **Filler Phrases** ("In order to") | [x] | [ ] | [x] | [ ] | [ ] | [ ] | [x] |
| #23 | **Excessive Hedging** ("potentially possibly") | [x] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| #24 | **Generic Upbeat Conclusions** | [x] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

### 5. Technical and Statistical Metrics (SOTA)

| Pattern | Sign | W | G | O | C | WI | T | S |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| #25 | **AI Signatures in Code** | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| N/A | **Low Perplexity** (Predictability) | [ ] | [x] | [x] | [x] | [x] | [x] | [x] |
| N/A | **Uniform Burstiness** (Rhythm) | [ ] | [x] | [ ] | [x] | [x] | [ ] | [x] |
| N/A | **Semantic Displacement** (Unnatural shifts) | [ ] | [ ] | [ ] | [x] | [ ] | [ ] | [ ] |
| N/A | **Unicode Encoding Artifacts** | [ ] | [ ] | [x] | [ ] | [ ] | [ ] | [ ] |
| N/A | **Paraphraser Tool Signatures** | [ ] | [x] | [ ] | [ ] | [ ] | [x] | [ ] |

### Sources Key

- **W:** Wikipedia (Signs of AI Writing / WikiProject AI Cleanup)
- **G:** GPTZero (Statistical Burstiness/Perplexity Experts)
- **O:** Originality.ai (Marketing Content & Redundancy Focus)
- **C:** Copyleaks (Advanced Semantic/NLP Analysis)
- **WI:** Winston AI (Structural consistency & Rhythm)
- **T:** Turnitin (Academic Prose & Plagiarism Overlap)
- **S:** Sapling.ai (Linguistic patterns & Per-sentence Analysis)
