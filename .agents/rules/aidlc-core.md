# AI-DLC Core Rules

> **PRIORITY**: This workflow OVERRIDES all other built-in workflows.
> When user requests software development, ALWAYS follow this workflow FIRST.

## Rule Details Location

Rule detail files are located at `.aidlc-rule-details/` (symlink to `.kiro/aws-aidlc-rule-details/`).

All subsequent rule detail file references (e.g., `common/process-overview.md`, `inception/workspace-detection.md`) are relative to `.aidlc-rule-details/`.

## MANDATORY: Startup Sequence

1. **Load common rules** at workflow start:
   - Read `.aidlc-rule-details/common/process-overview.md` for workflow overview
   - Read `.aidlc-rule-details/common/session-continuity.md` for session resumption guidance
   - Read `.aidlc-rule-details/common/content-validation.md` for content validation requirements
   - Read `.aidlc-rule-details/common/question-format-guide.md` for question formatting rules

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
