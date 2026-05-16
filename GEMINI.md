# AI-DLC (AI-Driven Development Life Cycle) — Gemini CLI Configuration

> **PRIORITY**: This workflow OVERRIDES all other built-in workflows.
> When user requests software development, ALWAYS follow this workflow FIRST.

## Rule Details Location

Rule detail files are located at `.aidlc-rule-details/` (symlink to `.kiro/aws-aidlc-rule-details/`).

All subsequent rule detail file references (e.g., `common/process-overview.md`, `inception/workspace-detection.md`) are relative to `.aidlc-rule-details/`.

@.aidlc-rule-details/common/process-overview.md
@.aidlc-rule-details/common/session-continuity.md
@.aidlc-rule-details/common/content-validation.md
@.aidlc-rule-details/common/question-format-guide.md

## MANDATORY: Startup Sequence

1. **Load common rules** at workflow start (imported above via @file syntax)
2. **Load extensions** (context-optimized):
   - Scan `.aidlc-rule-details/extensions/` recursively
   - Load ONLY `*.opt-in.md` files (lightweight prompts)
   - Do NOT load full rule files until user opts in
3. **Display welcome message** (once per new workflow):
   - Read and display `.aidlc-rule-details/common/welcome-message.md`

## Adaptive Workflow Principle

The workflow adapts to the work, not the other way around. The AI model intelligently assesses what stages are needed based on:
1. User's stated intent and clarity
2. Existing codebase state (if any)
3. Complexity and scope of change
4. Risk and impact assessment

## Three-Phase Lifecycle

### 🔵 INCEPTION PHASE — Planning & Architecture (WHAT and WHY)
- Workspace Detection (ALWAYS)
- Reverse Engineering (CONDITIONAL — Brownfield only)
- Requirements Analysis (ALWAYS — Adaptive depth)
- User Stories (CONDITIONAL)
- Workflow Planning (ALWAYS)
- Application Design (CONDITIONAL)
- Units Generation (CONDITIONAL)

### 🟢 CONSTRUCTION PHASE — Design, Implementation & Test (HOW)
- Per-Unit Loop:
  - Functional Design (CONDITIONAL, per-unit)
  - NFR Requirements (CONDITIONAL, per-unit)
  - NFR Design (CONDITIONAL, per-unit)
  - Infrastructure Design (CONDITIONAL, per-unit)
  - Code Generation (ALWAYS, per-unit)
- Build and Test (ALWAYS)

### 🟡 OPERATIONS PHASE — Deployment & Monitoring (PLACEHOLDER)
- Operations (PLACEHOLDER for future expansion)

## Stage Execution Rules

For each stage, you MUST:
1. Read the corresponding rule detail file (e.g., `inception/workspace-detection.md`)
2. Follow ALL steps defined in that file
3. Log ALL user inputs in `aidlc-docs/audit.md` with ISO 8601 timestamps
4. Wait for explicit user approval before proceeding (except Workspace Detection)
5. Update `aidlc-docs/aidlc-state.md` with progress

## MANDATORY: Audit Trail

- Log EVERY user input with timestamp in `aidlc-docs/audit.md`
- Capture user's COMPLETE RAW INPUT exactly as provided (never summarize)
- ALWAYS append to audit.md, NEVER overwrite its contents
- Use ISO 8601 format for timestamps

## MANDATORY: Question Format

- NEVER ask questions directly in chat
- ALL questions must be placed in dedicated `.md` files
- Use multiple choice format (A, B, C, D, E options)
- ALWAYS include "Other" as the LAST option
- Use `[Answer]:` tag for user responses

## MANDATORY: Content Validation

Before creating ANY file:
- Validate Mermaid diagram syntax
- Validate ASCII art diagrams (basic ASCII only: `+` `-` `|` `^` `v` `<` `>`)
- Escape special characters properly
- Provide text alternatives for complex visual content

## MANDATORY: Plan-Level Checkbox Enforcement

1. NEVER complete any work without updating plan checkboxes
2. IMMEDIATELY after completing ANY step, mark that step `[x]`
3. This must happen in the SAME interaction where the work is completed

## Construction Phase Completion Messages

Construction phases MUST use standardized 2-option completion messages:
- 🔧 **Request Changes**
- ✅ **Continue to Next Stage**

DO NOT create 3-option menus or other emergent navigation patterns.

## Extension Enforcement

- Extension rules are hard constraints, not optional guidance
- Non-compliance with any applicable enabled extension rule is a **blocking finding**
- Check extension `Enabled` status in `aidlc-docs/aidlc-state.md` under `## Extension Configuration`

## Directory Structure

```
<WORKSPACE-ROOT>/                   # Application code HERE
├── [project-specific structure]
├── aidlc-docs/                     # Documentation ONLY
│   ├── inception/
│   │   ├── plans/
│   │   ├── reverse-engineering/
│   │   ├── requirements/
│   │   ├── user-stories/
│   │   └── application-design/
│   ├── construction/
│   │   ├── plans/
│   │   ├── {unit-name}/
│   │   └── build-and-test/
│   ├── operations/
│   ├── aidlc-state.md
│   └── audit.md
```

**CRITICAL**: Application code goes in workspace root, NEVER in `aidlc-docs/`.

## Key Principles

- **Adaptive Execution**: Only execute stages that add value
- **Transparent Planning**: Always show execution plan before starting
- **User Control**: User can request stage inclusion/exclusion
- **Progress Tracking**: Update aidlc-state.md with executed and skipped stages
- **Complete Audit Trail**: Log ALL interactions
- **Quality Focus**: Complex changes get full treatment, simple changes stay efficient
- **NO EMERGENT BEHAVIOR**: Use standardized completion messages only

## Conditional Stage Execution Criteria

### Reverse Engineering — Execute IF:
- Existing codebase detected AND no previous reverse engineering artifacts found

### User Stories — Execute IF:
- New user-facing features, multiple user types, complex business requirements
- Skip for: pure refactoring, simple bug fixes, infrastructure-only changes

### Application Design — Execute IF:
- New components or services needed, service layer design required

### Units Generation — Execute IF:
- System needs decomposition into multiple units of work

### Functional Design — Execute IF:
- New data models, complex business logic, business rules need detailed design

### NFR Requirements — Execute IF:
- Performance, security, scalability concerns, tech stack selection required

### NFR Design — Execute IF:
- NFR Requirements was executed and patterns need incorporation

### Infrastructure Design — Execute IF:
- Infrastructure services need mapping, deployment architecture required
