# AI-DLC Mandatory Behaviors

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
