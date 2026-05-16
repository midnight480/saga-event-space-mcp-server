---
name: aidlc-application-design
description: High-level component identification and service layer design. Use when identifying main functional components, defining component interfaces, designing service orchestration, or establishing component dependencies and communication patterns.
---

# AI-DLC Application Design Skill

This skill identifies components, defines interfaces, and designs service layers.

## Activation

Use this skill when:
- Need to identify main functional components
- Designing service layer orchestration
- Defining component interfaces and dependencies
- Establishing communication patterns between components

## Prerequisites

- Requirements Analysis should be complete
- User Stories recommended (guides design decisions)

## Execution

Read `.aidlc-rule-details/inception/application-design.md` for complete step-by-step instructions.

### Process

1. Analyze requirements and user stories
2. Create application design plan with questions
3. Generate questions about: component identification, methods, service layer, dependencies, design patterns
4. Wait for user answers and analyze for ambiguities
5. Generate artifacts in `aidlc-docs/inception/application-design/`:
   - `components.md` — Component definitions and responsibilities
   - `component-methods.md` — Method signatures and purposes
   - `services.md` — Service definitions and orchestration
   - `component-dependency.md` — Dependency relationships
   - `application-design.md` — Consolidated design document

### Completion

Present completion message with options:
- 🔧 **Request Changes**
- ✅ **Approve & Continue** — Proceed to Units Generation or CONSTRUCTION
