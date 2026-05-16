---
name: aidlc-infrastructure-design
description: Map logical software components to actual infrastructure services (AWS, Azure, GCP, on-premise). Use when designing deployment architecture, selecting cloud services, or planning infrastructure for a unit of work.
---

# AI-DLC Infrastructure Design Skill

This skill maps logical components to actual infrastructure choices.

## Activation

Use this skill when:
- Mapping software components to cloud services
- Designing deployment architecture
- Selecting compute, storage, messaging, or networking services
- Planning monitoring and observability infrastructure

## Prerequisites

- Functional Design should be complete for the unit
- NFR Design recommended (provides logical components to map)

## Execution

Read `.aidlc-rule-details/construction/infrastructure-design.md` for complete step-by-step instructions.

### Process

1. Analyze functional and NFR design artifacts
2. Generate questions about: deployment environment, compute, storage, messaging, networking, monitoring, shared infrastructure
3. Wait for user answers and resolve ambiguities
4. Generate:
   - `aidlc-docs/construction/{unit-name}/infrastructure-design/infrastructure-design.md`
   - `aidlc-docs/construction/{unit-name}/infrastructure-design/deployment-architecture.md`
   - (If shared) `aidlc-docs/construction/shared-infrastructure.md`

### Completion

Present standardized 2-option completion message:
- 🔧 **Request Changes**
- ✅ **Continue to Next Stage** — Proceed to Code Generation
