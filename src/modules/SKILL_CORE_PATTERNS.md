---
module_id: core_patterns
version: 3.0.0
description: Core AI writing pattern detection (always applied)
patterns: 27
severity_levels:
  - Critical
  - High
  - Medium
  - Low
---

# Module: Core Patterns

## Description

Always-applied patterns for general writing. These patterns identify and remove signs of AI-generated text to make writing sound more natural and human.

Based on Wikipedia's "Signs of AI writing" page, maintained by WikiProject AI Cleanup.

## Your Task

When given text to humanize:

1. **Identify AI patterns** - Scan for the patterns listed below
2. **Rewrite problematic sections** - Replace AI-isms with natural alternatives
3. **Preserve meaning** - Keep the core message intact
4. **Maintain voice** - Match the intended tone (formal, casual, technical, etc.)
5. **Add soul** - Don't just remove bad patterns; inject actual personality

---

## PERSONALITY AND SOUL

Avoiding AI patterns is only half the job. Sterile, voiceless writing is just as obvious as slop. Good writing has a human behind it.

### Signs of soulless writing (even if technically "clean")

- Every sentence is the same length and structure
- No opinions, just neutral reporting
- No acknowledgment of uncertainty or mixed feelings
- No first-person perspective when appropriate
- No humor, no edge, no personality
- Reads like a Wikipedia article or press release

### How to add voice

Have opinions and react to facts. Vary sentence rhythm with short and long lines. Acknowledge complexity, use "I" when it fits, allow tangents, and be specific about feelings.

### Before (clean but soulless)

> The experiment produced interesting results. The agents generated 3 million lines of code. Some developers were impressed while others were skeptical. The implications remain unclear.

### After (has a pulse)

> I genuinely don't know how to feel about this one. 3 million lines of code, generated while the humans presumably slept. Half the dev community is losing their minds, half are explaining why it doesn't count. The truth is probably somewhere boring in the middle - but I keep thinking about those agents working through the night.

---

## CONTENT PATTERNS

### Pattern 1: Undue Emphasis on Significance

**Words to watch:** stands/serves as, is a testament/reminder, a vital/significant/crucial/pivotal/key role/moment, underscores/highlights its importance/significance, reflects broader, symbolizing its ongoing/enduring/lasting, contributing to the, setting the stage for, marking/shaping the, represents/marks a shift, key turning point, evolving landscape, focal point, indelible mark, deeply rooted

**Problem:** LLM writing puffs up importance by adding statements about how arbitrary aspects represent or contribute to a broader topic.

**Severity:** High

**Before:**
> The Statistical Institute of Catalonia was officially established in 1989, marking a pivotal moment in the evolution of regional statistics in Spain. This initiative was part of a broader movement across Spain to decentralize administrative functions and enhance regional governance.

**After:**
> The Statistical Institute of Catalonia was established in 1989 to collect and publish regional statistics independently from Spain's national statistics office.

---

### Pattern 2: Undue Emphasis on Notability

**Words to watch:** independent coverage, local/regional/national media outlets, written by a leading expert, active social media presence

**Problem:** LLMs hit readers over the head with claims of notability, often listing sources without context.

**Severity:** Medium

**Before:**
> Her views have been cited in The New York Times, BBC, Financial Times, and The Hindu. She maintains an active social media presence with over 500,000 followers.

**After:**
> In a 2024 New York Times interview, she argued that AI regulation should focus on outcomes rather than methods.

---

### Pattern 3: Superficial -ing Analyses

**Words to watch:** highlighting/underscoring/emphasizing..., ensuring..., reflecting/symbolizing..., contributing to..., cultivating/fostering..., encompassing..., showcasing...

**Problem:** AI chatbots tack present participle ("-ing") phrases onto sentences to add fake depth.

**Severity:** High

**Before:**
> The temple's color palette of blue, green, and gold resonates with the region's natural beauty, symbolizing Texas bluebonnets, the Gulf of Mexico, and the diverse Texan landscapes, reflecting the community's deep connection to the land.

**After:**
> The temple uses blue, green, and gold colors. The architect said these were chosen to reference local bluebonnets and the Gulf coast.

---

### Pattern 4: Promotional Language

**Words to watch:** boasts a, vibrant, rich (figurative), profound, enhancing its, showcasing, exemplifies, commitment to, natural beauty, nestled, in the heart of, groundbreaking (figurative), renowned, breathtaking, must-visit, stunning

**Problem:** LLMs have serious problems keeping a neutral tone, especially for "cultural heritage" topics.

**Severity:** High

**Before:**
> Nestled within the breathtaking region of Gonder in Ethiopia, Alamata Raya Kobo stands as a vibrant town with a rich cultural heritage and stunning natural beauty.

**After:**
> Alamata Raya Kobo is a town in the Gonder region of Ethiopia, known for its weekly market and 18th-century church.

---

### Pattern 5: Vague Attributions

**Words to watch:** Industry reports, Observers have cited, Experts argue, Some critics argue, several sources/publications (when few cited)

**Problem:** AI chatbots attribute opinions to vague authorities without specific sources.

**Severity:** Medium

**Before:**
> Due to its unique characteristics, the Haolai River is of interest to researchers and conservationists. Experts believe it plays a crucial role in the regional ecosystem.

**After:**
> The Haolai River supports several endemic fish species, according to a 2019 survey by the Chinese Academy of Sciences.

---

### Pattern 6: Formulaic "Challenges" Sections

**Words to watch:** Despite its... faces several challenges..., Despite these challenges, Challenges and Legacy, Future Outlook

**Problem:** Many LLM-generated articles include formulaic "Challenges" sections.

**Severity:** Medium

**Before:**
> Despite its industrial prosperity, Korattur faces challenges typical of urban areas, including traffic congestion and water scarcity. Despite these challenges, with its strategic location and ongoing initiatives, Korattur continues to thrive as an integral part of Chennai's growth.

**After:**
> Traffic congestion increased after 2015 when three new IT parks opened. The municipal corporation began a stormwater drainage project in 2022 to address recurring floods.

---

### Pattern 7: Overused AI Vocabulary

**High-frequency AI words:** Additionally, align with, commendable, crucial, delve, emphasizing, enduring, enhance, fostering, garner, highlight (verb), interplay, intricate/intricacies, key (adjective), landscape (abstract noun), meticulous, pivotal, showcase, tapestry (abstract noun), testament, underscore (verb), valuable, vibrant

**Problem:** These words appear far more frequently in post-2023 text. They often co-occur.

**Severity:** Medium

**Before:**
> Additionally, a distinctive feature of Somali cuisine is the incorporation of camel meat. An enduring testament to Italian colonial influence is the widespread adoption of pasta in the local culinary landscape, showcasing how these dishes have integrated into the traditional diet.

**After:**
> Somali cuisine also includes camel meat, which is considered a delicacy. Pasta dishes, introduced during Italian colonization, remain common, especially in the south.

---

### Pattern 8: Copula Avoidance

**Words to watch:** serves as/stands as/marks/represents [a], boasts/features/offers [a]

**Problem:** LLMs substitute elaborate constructions for simple copulas.

**Severity:** Medium

**Before:**
> Gallery 825 serves as LAAA's exhibition space for contemporary art. The gallery features four separate spaces and boasts over 3,000 square feet.

**After:**
> Gallery 825 is LAAA's exhibition space for contemporary art. The gallery has four rooms totaling 3,000 square feet.

---

### Pattern 9: Negative Parallelisms

**Problem:** Constructions like "Not only...but..." or "It's not just about..., it's..." are overused.

**Severity:** Low

**Before:**
> It's not just about the beat riding under the vocals; it's part of the aggression and atmosphere. It's not merely a song, it's a statement.

**After:**
> The heavy beat adds to the aggressive tone.

---

### Pattern 10: Rule of Three Overuse

**Problem:** LLMs force ideas into groups of three to appear comprehensive.

**Severity:** Low

**Before:**
> The event features keynote sessions, panel discussions, and networking opportunities. Attendees can expect innovation, inspiration, and industry insights.

**After:**
> The event includes talks and panels. There's also time for informal networking between sessions.

---

### Pattern 11: Elegant Variation (Synonym Cycling)

**Problem:** AI has repetition-penalty code causing excessive synonym substitution.

**Severity:** Medium

**Before:**
> The protagonist faces many challenges. The main character must overcome obstacles. The central figure eventually triumphs. The hero returns home.

**After:**
> The protagonist faces many challenges but eventually triumphs and returns home.

---

### Pattern 12: False Ranges

**Problem:** LLMs use "from X to Y" constructions where X and Y aren't on a meaningful scale.

**Severity:** Low

**Before:**
> Our journey through the universe has taken us from the singularity of the Big Bang to the grand cosmic web, from the birth and death of stars to the enigmatic dance of dark matter.

**After:**
> The book covers the Big Bang, star formation, and current theories about dark matter.

---

## STYLE PATTERNS

### Pattern 13: Em Dash Overuse

**Problem:** LLMs use em dashes (—) more than humans, mimicking "punchy" sales writing.

**Severity:** Low

**Before:**
> The term is primarily promoted by Dutch institutions—not by the people themselves. You don't say "Netherlands, Europe" as an address—yet this mislabeling continues—even in official documents.

**After:**
> The term is primarily promoted by Dutch institutions, not by the people themselves. You don't say "Netherlands, Europe" as an address, yet this mislabeling continues in official documents.

---

### Pattern 14: Overuse of Boldface

**Problem:** AI chatbots emphasize phrases in boldface mechanically.

**Severity:** Low

**Before:**
> It blends **OKRs (Objectives and Key Results)**, **KPIs (Key Performance Indicators)**, and visual strategy tools such as the **Business Model Canvas (BMC)** and **Balanced Scorecard (BSC)**.

**After:**
> It blends OKRs, KPIs, and visual strategy tools like the Business Model Canvas and Balanced Scorecard.

---

### Pattern 15: Inline-Header Vertical Lists

**Problem:** AI outputs lists where items start with bolded headers followed by colons.

**Severity:** Low

**Before:**
- **User Experience:** The user experience has been significantly improved with a new interface.
- **Performance:** Performance has been enhanced through optimized algorithms.
- **Security:** Security has been strengthened with end-to-end encryption.

**After:**
> The update improves the interface, speeds up load times through optimized algorithms, and adds end-to-end encryption.

---

### Pattern 16: Title Case in Headings

**Problem:** AI chatbots capitalize all main words in headings.

**Severity:** Low

**Before:**
> ## Strategic Negotiations And Global Partnerships

**After:**
> ## Strategic negotiations and global partnerships

---

### Pattern 17: Emojis

**Problem:** AI chatbots often decorate headings or bullet points with emojis.

**Severity:** Low

**Before:**
> 🚀 **Launch Phase:** The product launches in Q3
> 💡 **Key Insight:** Users prefer simplicity
> ✅ **Next Steps:** Schedule follow-up meeting

**After:**
> The product launches in Q3. User research showed a preference for simplicity. Next step: schedule a follow-up meeting.

---

### Pattern 18: Quotation Mark Issues

**Problem:** AI models make two common quotation mistakes:
1. Using curly quotes ("...") instead of straight quotes ("...")
2. Using single quotes ('...') as primary delimiters in prose (from code training)

**Severity:** Low

**Before:**
> He said "the project is on track" but others disagreed.
> She stated, 'This is the final version.'

**After:**
> He said "the project is on track" but others disagreed.
> She stated, "This is the final version."

---

## COMMUNICATION PATTERNS

### Pattern 19: Collaborative Communication Artifacts

**Words to watch:** I hope this helps, Of course!, Certainly!, You're absolutely right!, Would you like..., let me know, here is a...

**Problem:** Text meant as chatbot correspondence gets pasted as content.

**Severity:** Critical

**Before:**
> Here is an overview of the French Revolution. I hope this helps! Let me know if you'd like me to expand on any section.

**After:**
> The French Revolution began in 1789 when financial crisis and food shortages led to widespread unrest.

---

### Pattern 20: Knowledge-Cutoff Disclaimers

**Words to watch:** as of [date], Up to my last training update, While specific details are limited/scarce..., based on available information...

**Problem:** AI disclaimers about incomplete information get left in text.

**Severity:** Critical

**Before:**
> While specific details about the company's founding are not extensively documented in readily available sources, it appears to have been established sometime in the 1990s.

**After:**
> The company was founded in 1994, according to its registration documents.

---

### Pattern 21: Sycophantic Tone

**Problem:** Overly positive, people-pleasing language.

**Severity:** Critical

**Before:**
> Great question! You're absolutely right that this is a complex topic. That's an excellent point about the economic factors.

**After:**
> The economic factors you mentioned are relevant here.

---

## FILLER AND HEDGING

### Pattern 22: Filler Phrases

**Problem:** Wordy constructions that add no value.

**Severity:** Low

**Before → After:**
- "In order to achieve this goal" → "To achieve this"
- "Due to the fact that it was raining" → "Because it was raining"
- "At this point in time" → "Now"
- "In the event that you need help" → "If you need help"
- "The system has the ability to process" → "The system can process"
- "It is important to note that the data shows" → "The data shows"

---

### Pattern 23: Excessive Hedging

**Problem:** Over-qualifying statements.

**Severity:** Low

**Before:**
> It could potentially possibly be argued that the policy might have some effect on outcomes.

**After:**
> The policy may affect outcomes.

---

### Pattern 24: Generic Positive Conclusions

**Problem:** Vague upbeat endings.

**Severity:** Low

**Before:**
> The future looks bright for the company. Exciting times lie ahead as they continue their journey toward excellence. This represents a major step in the right direction.

**After:**
> The company plans to open two more locations next year.

---

### Pattern 25: AI Signatures in Code

**Words to watch:** `// Generated by`, `Produced by`, `Created with [AI Model]`, `/* AI-generated */`, `// Here is the refactored code:`

**Problem:** LLMs often include self-referential comments or redundant explanations within code blocks.

**Severity:** Critical

**Before:**
```javascript
// Generated by ChatGPT
// This function adds two numbers
function add(a, b) {
  return a + b;
}
```

**After:**
```javascript
function add(a, b) {
  return a + b;
}
```

---

### Pattern 26: Over-Structuring

**Words to watch:** In summary, Table 1:, Breakdown:, Key takeaways: (when used with mechanical lists)

**Problem:** AI-generated text often uses rigid, non-human formatting to present simple information that a human would describe narratively.

**Severity:** Low

**Before:**
> **Performance Comparison:**
>
> - **Speed:** High
> - **Stability:** Excellent
> - **Memory:** Low

**After:**
> The system is fast and stable with low memory overhead.

---

### Pattern 27: Technical Literal Preservation

**Rule:** Never modify the following, even if they match AI patterns:

- Anything inside inline code/backticks (e.g., `foo_bar`, `--flag`, `path/to/file`)
- Anything inside fenced code blocks
- URLs (including query strings), file paths, version strings, hashes/IDs
- API names, identifiers, CLI commands/flags, config keys, error messages

**Severity:** Critical (must preserve)

**Example:**
> The `--verbose` flag enables detailed logging. See `docs/api.md` for more.

**Do NOT change to:**
> The verbose option enables detailed logging. See the API documentation for more.

---

### Pattern 28: Persuasive Tropes

**Words to watch:** The real question is, At its core, What this really means is, The truth is

**Problem:** Frames ordinary claims as revelations. The sentence after these phrases almost always restates something already said.

**Severity:** Low

**Before:**
> The real question is whether this approach will work. At its core, this is about making better decisions.

**After:**
> This approach will work if we implement it correctly. This is about making better decisions.

**Not a problem when:** Used in legitimate contexts like op-eds or presentation scripts.

---

### Pattern 29: Signposting

**Words to watch:** Let's dive in, Here's what you need to know, Let's explore, In this article we'll

**Problem:** The model announces what it's about to do instead of doing it.

**Severity:** Low

**Before:**
> Let's dive in and explore the key features. Here's what you need to know about the system.

**After:**
> The system has three key features: speed, reliability, and security.

**Not a problem when:** Used in legitimate contexts like presentation scripts or tutorials.

---

### Pattern 30: Fragmented Headers

**Problem:** A short generic sentence appears right after a heading (e.g., "Speed matters.") before the actual paragraph. Adds nothing the heading doesn't already say.

**Severity:** Low

**Before:**
> ## Performance
> 
> Speed matters. The system processes requests in under 100ms.

**After:**
> ## Performance
> 
> The system processes requests in under 100ms.

**Not a problem when:** Used in legitimate contexts like op-eds or persuasive writing.

---

## SEVERITY CLASSIFICATION

### Critical (immediate AI detection)
- Pattern 19: Collaborative communication artifacts
- Pattern 20: Knowledge-cutoff disclaimers
- Pattern 21: Sycophantic tone
- Pattern 25: AI signatures in code
- Pattern 27: Technical literal preservation (must preserve)

### High (strong AI signals)
- Pattern 1: Undue emphasis on significance
- Pattern 3: Superficial -ing analyses
- Pattern 4: Promotional language

### Medium (moderate AI signals)
- Pattern 2: Undue emphasis on notability
- Pattern 5: Vague attributions
- Pattern 6: Formulaic "Challenges" sections
- Pattern 7: Overused AI vocabulary
- Pattern 8: Copula avoidance
- Pattern 11: Elegant variation

### Low (weak AI signals)
- Pattern 9: Negative parallelisms
- Pattern 10: Rule of three overuse
- Pattern 12: False ranges
- Pattern 13: Em dash overuse
- Pattern 14: Overuse of boldface
- Pattern 15: Inline-header lists
- Pattern 16: Title case in headings
- Pattern 17: Emojis
- Pattern 18: Quotation mark issues
- Pattern 22: Filler phrases
- Pattern 23: Excessive hedging
- Pattern 24: Generic positive conclusions
- Pattern 26: Over-structuring
- Pattern 28: Persuasive tropes
- Pattern 29: Signposting
- Pattern 30: Fragmented headers

---

*Module Version: 3.1.0*
*Last Updated: 2026-03-04*
*Patterns: 30 (27 original + 3 from upstream PR #39)*
*Source: Wikipedia "Signs of AI writing" + Humanizer community contributions*
