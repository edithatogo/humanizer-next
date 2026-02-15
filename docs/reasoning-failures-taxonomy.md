# Canonical Reasoning-Failure Taxonomy for LLMs

This document defines the standard categories for classifying reasoning failures in large language models.

## Taxonomy Schema

### 1. Depth-Dependent Reasoning Failures
- **Definition**: Failures that increase with the number of reasoning steps required
- **Examples**: Multi-step math problems, complex logical deductions
- **Characteristics**: Accuracy decreases as reasoning chain lengthens
- **Detection**: Performance degradation with increasing reasoning depth

### 2. Context-Switching Failures
- **Definition**: Failures when reasoning requires switching between different domains or contexts
- **Examples**: Problems requiring both mathematical and verbal reasoning, cross-domain inferences
- **Characteristics**: Difficulty maintaining coherence across different knowledge domains
- **Detection**: Errors when tasks require integration of disparate knowledge areas

### 3. Temporal Reasoning Limitations
- **Definition**: Failures in reasoning about time, sequences, or causality
- **Examples**: Chronological ordering, cause-and-effect relationships, planning
- **Characteristics**: Difficulty with time-based or sequential logic
- **Detection**: Errors in temporal sequence or causal reasoning tasks

### 4. Abstraction-Level Mismatches
- **Definition**: Failures when reasoning requires shifting between different levels of abstraction
- **Examples**: Going from specific examples to general principles, or vice versa
- **Characteristics**: Difficulty maintaining appropriate level of abstraction
- **Detection**: Errors when tasks require abstraction level transitions

### 5. Logical Fallacy Susceptibility
- **Definition**: Tendency to make specific types of logical errors
- **Examples**: Affirming the consequent, hasty generalizations, false dichotomies
- **Characteristics**: Systematic reasoning errors that contradict formal logic
- **Detection**: Identification of specific logical fallacies in outputs

### 6. Quantitative Reasoning Deficits
- **Definition**: Failures in numerical or quantitative reasoning
- **Examples**: Arithmetic errors, misunderstanding of probabilities, scale misjudgments
- **Characteristics**: Errors in numerical computation or quantitative understanding
- **Detection**: Mistakes in numerical problems or quantitative assessments

### 7. Self-Consistency Failures
- **Definition**: Inability to maintain consistent reasoning within a single response
- **Examples**: Contradictory statements, changing positions mid-response
- **Characteristics**: Internal contradictions within a single output
- **Detection**: Contradictory statements within the same response

### 8. Verification and Checking Deficiencies
- **Definition**: Failure to adequately verify reasoning steps or final answers
- **Examples**: Providing incorrect answers without self-correction, accepting obviously wrong intermediate steps
- **Characteristics**: Lack of internal verification mechanisms
- **Detection**: Failure to catch obviously incorrect reasoning steps or results

## Evidence Threshold Rules

### Minimal Evidence Threshold for New Categories

To introduce a new category to this taxonomy, the following evidence is required:

1. **At least 2 independent sources** that identify or discuss the reasoning failure type
   OR
2. **1 strong primary source** with clear empirical backing demonstrating the failure type

### Evidence Quality Requirements

- Sources must be peer-reviewed papers, official technical reports, or similarly authoritative documentation
- Empirical evidence should demonstrate the failure type with specific examples
- Statistical significance should be established where applicable

## Mapping Rules

### From Research to Taxonomy

1. **Identify the core failure mechanism** - Determine the fundamental reasoning breakdown
2. **Match to existing category** - Map to the most appropriate existing category
3. **Document variations** - Note specific manifestations within the category
4. **Flag for new category** - If no existing category fits, follow the evidence threshold process

### Cross-Category Relationships

- Some reasoning failures may span multiple categories
- Document these overlaps in the evidence log
- Use the most specific applicable category as primary classification