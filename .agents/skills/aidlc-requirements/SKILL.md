---
name: aidlc-requirements
description: Gather, analyze, and document software requirements with adaptive depth. Use when clarifying what to build, analyzing user needs, or creating requirements documents. Handles intent analysis, clarifying questions, and requirements generation.
---

# AI-DLC Requirements Analysis Skill

This skill gathers and validates requirements through structured analysis.

## Activation

Use this skill when:
- Starting requirements gathering for a new feature
- Clarifying ambiguous user requests
- Documenting functional and non-functional requirements
- Analyzing the scope and complexity of a change

## Execution

Read `.aidlc-rule-details/inception/requirements-analysis.md` for complete step-by-step instructions.

### Adaptive Depth

Depth varies based on request clarity and complexity:
- **Minimal**: Simple, clear request — just document intent analysis
- **Standard**: Normal complexity — gather functional and non-functional requirements
- **Comprehensive**: Complex, high-risk — detailed requirements with traceability

### Process

1. Load reverse engineering artifacts (if brownfield)
2. Analyze user request (intent analysis)
3. Determine requirements depth needed
4. Generate clarifying questions in `aidlc-docs/inception/requirements/requirement-verification-questions.md`
5. Wait for user answers (using `[Answer]:` tags)
6. Analyze answers for contradictions and ambiguities
7. Create follow-up questions if needed
8. Generate `aidlc-docs/inception/requirements/requirements.md`

### Extension Opt-In

During this stage, present opt-in prompts from loaded `*.opt-in.md` extension files. Record enablement status in `aidlc-docs/aidlc-state.md` under `## Extension Configuration`.

### Completion

Present completion message and wait for explicit user approval.
