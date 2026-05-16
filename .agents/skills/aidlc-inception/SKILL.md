---
name: aidlc-inception
description: AI-DLC INCEPTION phase - Planning and architecture workflow. Use when starting a new software development request, analyzing requirements, creating user stories, planning workflow, or designing application architecture. Handles workspace detection, reverse engineering, requirements analysis, user stories, workflow planning, application design, and units generation.
---

# AI-DLC INCEPTION Phase Skill

This skill executes the INCEPTION phase of the AI-Driven Development Life Cycle.

## Purpose

Determine WHAT to build and WHY through structured planning and architecture.

## Activation

Use this skill when the user:
- Starts a new software development request
- Asks to analyze or gather requirements
- Wants to plan a feature or system
- Needs architecture or design decisions
- Asks to reverse-engineer an existing codebase

## Execution

### Step 1: Load Common Rules

Read the following files from `.aidlc-rule-details/`:
- `common/process-overview.md`
- `common/session-continuity.md`
- `common/content-validation.md`
- `common/question-format-guide.md`

### Step 2: Load Extensions

Scan `.aidlc-rule-details/extensions/` recursively and load ONLY `*.opt-in.md` files.

### Step 3: Display Welcome Message

Read and display `.aidlc-rule-details/common/welcome-message.md` (once per new workflow).

### Step 4: Execute Stages

Execute stages in order, reading detailed instructions from `.aidlc-rule-details/inception/`:

1. **Workspace Detection** (ALWAYS) — Read `inception/workspace-detection.md`
2. **Reverse Engineering** (IF brownfield) — Read `inception/reverse-engineering.md`
3. **Requirements Analysis** (ALWAYS) — Read `inception/requirements-analysis.md`
4. **User Stories** (CONDITIONAL) — Read `inception/user-stories.md`
5. **Workflow Planning** (ALWAYS) — Read `inception/workflow-planning.md`
6. **Application Design** (CONDITIONAL) — Read `inception/application-design.md`
7. **Units Generation** (CONDITIONAL) — Read `inception/units-generation.md`

### Mandatory Behaviors

- Log ALL user inputs in `aidlc-docs/audit.md` with ISO 8601 timestamps
- Place ALL questions in dedicated `.md` files (never in chat)
- Use multiple choice format with `[Answer]:` tags
- Wait for explicit user approval before proceeding between stages
- Update `aidlc-docs/aidlc-state.md` with progress
