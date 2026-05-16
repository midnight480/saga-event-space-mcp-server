# AI-DLC: Resume Development Workflow

Resume an existing AI-DLC workflow from where it was last paused.

## Instructions

1. Read `aidlc-docs/aidlc-state.md` to determine current progress
2. Read `.aidlc-rule-details/common/session-continuity.md` for resumption guidance
3. Load all relevant artifacts from completed stages (as specified in session-continuity.md)
4. Present the "Welcome Back" prompt showing current status
5. Offer options to continue or review previous stages
6. Resume execution from the next uncompleted stage

Follow ALL rules defined in `.agents/rules/aidlc-core.md`, `.agents/rules/aidlc-mandatory-behaviors.md`, and `.agents/rules/aidlc-stage-criteria.md`.
