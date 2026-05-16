---
name: aidlc-code-generation
description: Generate code for a unit of work with a two-part approach - planning then generation. Use when implementing features, writing application code, creating tests, or generating deployment artifacts based on approved designs.
---

# AI-DLC Code Generation Skill

This skill generates code through a structured two-part process.

## Activation

Use this skill when:
- Ready to implement a designed unit of work
- Need to generate application code from design artifacts
- Creating tests for implemented features
- Generating deployment artifacts

## Prerequisites

- Unit design artifacts must be available
- INCEPTION phase should be complete
- Design stages (if executed) should be approved

## Execution

Read `.aidlc-rule-details/construction/code-generation.md` for complete step-by-step instructions.

### Part 1 — Planning

1. Analyze unit context and design artifacts
2. Determine code location (workspace root, NEVER `aidlc-docs/`)
3. Create detailed plan with checkboxes in `aidlc-docs/construction/plans/{unit-name}-code-generation-plan.md`
4. Include: project structure, business logic, API layer, repository layer, tests, documentation, deployment artifacts
5. Wait for user approval of the plan

### Part 2 — Generation

1. Execute each step in the approved plan sequentially
2. Mark checkboxes `[x]` immediately after completing each step
3. For brownfield: modify existing files in-place (never create copies)
4. For greenfield: create new files at correct locations
5. Add `data-testid` attributes to interactive UI elements

### Critical Rules

- **Application code**: Workspace root only (NEVER `aidlc-docs/`)
- **Documentation**: `aidlc-docs/` only (markdown summaries)
- **Brownfield**: Check if file exists before generating; modify in-place
- **Greenfield single unit**: `src/`, `tests/`, `config/` in workspace root
- **Greenfield multi-unit (microservices)**: `{unit-name}/src/`, `{unit-name}/tests/`

### Completion

Present standardized 2-option completion message:
- 🔧 **Request Changes**
- ✅ **Continue to Next Stage**
