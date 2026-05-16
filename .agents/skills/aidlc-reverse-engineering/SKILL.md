---
name: aidlc-reverse-engineering
description: Analyze an existing codebase to generate comprehensive architecture, code structure, API, and dependency documentation. Use when working with a brownfield project that needs understanding before making changes.
---

# AI-DLC Reverse Engineering Skill

This skill analyzes an existing codebase and generates comprehensive design artifacts.

## Activation

Use this skill when:
- Working with an existing codebase (brownfield project)
- Need to understand system architecture before making changes
- Want to document an undocumented codebase
- Need to identify components, dependencies, and patterns

## Execution

Read `.aidlc-rule-details/inception/reverse-engineering.md` for complete step-by-step instructions.

### Generated Artifacts

All artifacts are created in `aidlc-docs/inception/reverse-engineering/`:

1. `business-overview.md` — Business context, transactions, dictionary
2. `architecture.md` — System overview, component descriptions, data flow
3. `code-structure.md` — Build system, key classes, design patterns, dependencies
4. `api-documentation.md` — REST APIs, internal APIs, data models
5. `component-inventory.md` — All packages categorized by type
6. `technology-stack.md` — Languages, frameworks, infrastructure, tools
7. `dependencies.md` — Internal and external dependency graphs
8. `code-quality-assessment.md` — Test coverage, code quality, technical debt

### Completion

Present findings with the standardized completion message format and wait for explicit user approval before proceeding to Requirements Analysis.
