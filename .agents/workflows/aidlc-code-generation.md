# AI-DLC: Code Generation

Generate code for a unit of work based on approved design artifacts.

## Instructions

1. Read `.aidlc-rule-details/construction/code-generation.md` for detailed steps
2. **Part 1 — Planning**:
   - Analyze unit context and design artifacts
   - Create detailed code generation plan with checkboxes
   - Save plan to `aidlc-docs/construction/plans/{unit-name}-code-generation-plan.md`
   - Wait for user approval of the plan
3. **Part 2 — Generation**:
   - Execute each step in the approved plan
   - Mark checkboxes `[x]` immediately after completing each step
   - Write application code to workspace root (NEVER to aidlc-docs/)
   - Write documentation summaries to `aidlc-docs/construction/{unit-name}/code/`
4. Present completion message with standardized 2-option format
5. Wait for user approval

Follow ALL rules defined in `.agents/rules/aidlc-core.md` and `.agents/rules/aidlc-mandatory-behaviors.md`.
