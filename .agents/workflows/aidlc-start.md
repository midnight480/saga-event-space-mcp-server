# AI-DLC: Start Development Workflow

Execute the full AI-DLC (AI-Driven Development Life Cycle) workflow for the user's software development request.

## Instructions

1. Read `.aidlc-rule-details/common/welcome-message.md` and display it to the user
2. Read `.aidlc-rule-details/common/process-overview.md` for workflow overview
3. Read `.aidlc-rule-details/common/session-continuity.md` for session resumption
4. Read `.aidlc-rule-details/common/content-validation.md` for validation rules
5. Read `.aidlc-rule-details/common/question-format-guide.md` for question formatting
6. Scan `.aidlc-rule-details/extensions/` and load only `*.opt-in.md` files
7. Begin with **Workspace Detection** stage:
   - Read `.aidlc-rule-details/inception/workspace-detection.md`
   - Execute all steps defined in that file
   - Log findings in `aidlc-docs/audit.md`
8. Proceed through the INCEPTION phase stages as determined by the workflow

Follow ALL rules defined in `.agents/rules/aidlc-core.md`, `.agents/rules/aidlc-mandatory-behaviors.md`, and `.agents/rules/aidlc-stage-criteria.md`.
