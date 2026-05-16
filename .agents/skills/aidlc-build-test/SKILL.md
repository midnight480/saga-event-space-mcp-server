---
name: aidlc-build-test
description: Generate comprehensive build and test instructions after code generation is complete. Covers build steps, unit tests, integration tests, performance tests, contract tests, security tests, and e2e tests. Use when all code generation is done and the project needs build/test documentation.
---

# AI-DLC Build and Test Skill

This skill generates comprehensive build and test instructions.

## Activation

Use this skill when:
- All code generation is complete for all units
- Need to create build instructions
- Need to define test execution strategy
- Ready to validate the implementation

## Prerequisites

- Code Generation must be complete for all units
- All code artifacts must be generated

## Execution

Read `.aidlc-rule-details/construction/build-and-test.md` for complete step-by-step instructions.

### Generated Artifacts

All files created in `aidlc-docs/construction/build-and-test/`:

1. `build-instructions.md` — Prerequisites, build steps, troubleshooting
2. `unit-test-instructions.md` — Unit test execution and coverage
3. `integration-test-instructions.md` — Service interaction testing
4. `performance-test-instructions.md` — Load, stress, scalability testing
5. `build-and-test-summary.md` — Overall status and next steps

### Additional Tests (as needed)

- `contract-test-instructions.md` — API contract validation
- `security-test-instructions.md` — Vulnerability scanning
- `e2e-test-instructions.md` — Complete user workflow testing

### Completion

Present completion message and wait for user approval before proceeding to Operations phase.
