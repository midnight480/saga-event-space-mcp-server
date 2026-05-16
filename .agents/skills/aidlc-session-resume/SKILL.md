---
name: aidlc-session-resume
description: Resume an existing AI-DLC workflow from where it was last paused. Use when returning to continue work on an in-progress AI-DLC project, or when aidlc-state.md already exists.
---

# AI-DLC Session Resume Skill

This skill resumes an existing AI-DLC workflow from the last checkpoint.

## Activation

Use this skill when:
- Returning to continue work on an existing AI-DLC project
- `aidlc-docs/aidlc-state.md` exists in the workspace
- User says "continue", "resume", or asks about current progress

## Execution

Read `.aidlc-rule-details/common/session-continuity.md` for complete instructions.

### Process

1. Read `aidlc-docs/aidlc-state.md` to determine current progress
2. Load all relevant artifacts from completed stages:
   - Reverse Engineering: architecture.md, code-structure.md, api-documentation.md
   - Requirements: requirements.md, requirement-verification-questions.md
   - User Stories: stories.md, personas.md
   - Application Design: components.md, services.md
   - Units: unit-of-work.md, unit-of-work-dependency.md
   - Per-Unit Design: functional-design, nfr-requirements, nfr-design, infrastructure-design
   - Code: all generated code files and plans
3. Present "Welcome Back" prompt with current status
4. Offer options: continue where left off, or review previous stage
5. Resume execution from next uncompleted stage

### Error Handling

If artifacts are missing or corrupted:
- Read `.aidlc-rule-details/common/error-handling.md`
- Identify which stage created the missing artifacts
- Offer to regenerate or ask user for information
