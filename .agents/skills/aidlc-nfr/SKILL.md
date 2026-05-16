---
name: aidlc-nfr
description: Determine non-functional requirements (NFR) and design NFR patterns for a unit. Covers scalability, performance, availability, security, tech stack selection, resilience patterns, and logical components. Use when addressing performance, security, scalability, or tech stack decisions.
---

# AI-DLC NFR Requirements & Design Skill

This skill handles both NFR Requirements and NFR Design stages.

## Activation

Use this skill when:
- Determining performance, scalability, or availability requirements
- Making tech stack selections
- Designing resilience, security, or performance patterns
- Mapping logical infrastructure components

## Execution

### NFR Requirements Stage

Read `.aidlc-rule-details/construction/nfr-requirements.md`

1. Analyze functional design artifacts
2. Generate questions about: scalability, performance, availability, security, tech stack, reliability, maintainability
3. Wait for user answers and resolve ambiguities
4. Generate:
   - `aidlc-docs/construction/{unit-name}/nfr-requirements/nfr-requirements.md`
   - `aidlc-docs/construction/{unit-name}/nfr-requirements/tech-stack-decisions.md`

### NFR Design Stage

Read `.aidlc-rule-details/construction/nfr-design.md`

1. Analyze NFR requirements artifacts
2. Generate questions about: resilience patterns, scalability patterns, performance patterns, security patterns, logical components
3. Wait for user answers
4. Generate:
   - `aidlc-docs/construction/{unit-name}/nfr-design/nfr-design-patterns.md`
   - `aidlc-docs/construction/{unit-name}/nfr-design/logical-components.md`

### Completion

Each stage presents standardized 2-option completion message:
- 🔧 **Request Changes**
- ✅ **Continue to Next Stage**
