---
name: aidlc-functional-design
description: Design detailed business logic, domain models, and business rules for a unit of work. Technology-agnostic design focused purely on business functions. Use when designing complex business logic, data models, or validation rules.
---

# AI-DLC Functional Design Skill

This skill designs detailed business logic per unit, technology-agnostic.

## Activation

Use this skill when:
- Designing complex business logic for a unit
- Defining domain models and entity relationships
- Specifying business rules and validation logic
- Planning data transformations and workflows

## Prerequisites

- Units Generation must be complete
- Unit of work artifacts must be available

## Execution

Read `.aidlc-rule-details/construction/functional-design.md` for complete step-by-step instructions.

### Process

1. Analyze unit context from `aidlc-docs/inception/application-design/unit-of-work.md`
2. Create functional design plan with questions
3. Generate questions about: business logic, domain model, business rules, data flow, integration points, error handling
4. Wait for user answers and analyze for ambiguities
5. Generate artifacts:
   - `aidlc-docs/construction/{unit-name}/functional-design/business-logic-model.md`
   - `aidlc-docs/construction/{unit-name}/functional-design/business-rules.md`
   - `aidlc-docs/construction/{unit-name}/functional-design/domain-entities.md`
   - (If UI) `aidlc-docs/construction/{unit-name}/functional-design/frontend-components.md`

### Completion

Present standardized 2-option completion message:
- 🔧 **Request Changes**
- ✅ **Continue to Next Stage**
