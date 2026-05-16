---
name: aidlc-construction
description: AI-DLC CONSTRUCTION phase - Detailed design, implementation, and testing. Use when generating code, designing business logic, defining NFR requirements, creating infrastructure design, or building and testing. Handles functional design, NFR requirements, NFR design, infrastructure design, code generation, and build/test.
---

# AI-DLC CONSTRUCTION Phase Skill

This skill executes the CONSTRUCTION phase of the AI-Driven Development Life Cycle.

## Purpose

Determine HOW to build it through detailed design, code generation, and testing.

## Activation

Use this skill when the user:
- Is ready to start implementation after INCEPTION phase
- Asks to generate code for a unit of work
- Needs functional or NFR design
- Wants to create infrastructure design
- Asks to build and test the project

## Prerequisites

- INCEPTION phase must be complete (check `aidlc-docs/aidlc-state.md`)
- Units of work must be defined (if applicable)

## Execution

### Per-Unit Loop

For each unit of work, execute these stages in sequence:

#### 1. Functional Design (CONDITIONAL)

Read `.aidlc-rule-details/construction/functional-design.md`

Execute IF: New data models, complex business logic, or business rules need detailed design.

#### 2. NFR Requirements (CONDITIONAL)

Read `.aidlc-rule-details/construction/nfr-requirements.md`

Execute IF: Performance, security, scalability concerns, or tech stack selection required.

#### 3. NFR Design (CONDITIONAL)

Read `.aidlc-rule-details/construction/nfr-design.md`

Execute IF: NFR Requirements was executed and patterns need incorporation.

#### 4. Infrastructure Design (CONDITIONAL)

Read `.aidlc-rule-details/construction/infrastructure-design.md`

Execute IF: Infrastructure services need mapping or deployment architecture required.

#### 5. Code Generation (ALWAYS)

Read `.aidlc-rule-details/construction/code-generation.md`

Two parts:
- **Part 1 — Planning**: Create detailed plan with checkboxes, get user approval
- **Part 2 — Generation**: Execute plan, mark checkboxes `[x]` after each step

**CRITICAL**: Application code goes in workspace root, NEVER in `aidlc-docs/`.

### Build and Test (ALWAYS — after all units)

Read `.aidlc-rule-details/construction/build-and-test.md`

Generate comprehensive build and test instructions.

### Mandatory Behaviors

- Use standardized 2-option completion messages (Request Changes / Continue to Next Stage)
- Mark plan checkboxes `[x]` immediately after completing each step
- Log ALL user inputs in `aidlc-docs/audit.md`
- Wait for explicit user approval between stages
- Check extension compliance before presenting stage completion
