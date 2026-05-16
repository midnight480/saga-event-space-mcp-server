# Unit 5: Tool Registration Refactoring Code Generation Plan

## Unit Context
- **Description**: Centralization of tool registration logic into `src/tools/index.ts` and refactoring `src/index.ts`.
- **Stories/Features Covered**: Requirements Analysis 10 (Refactor MCP Server tool registration).
- **Dependencies**: Depends on all previous Units (1, 2, 3, 4).

## Code Location
- Application Code: `src/` (Workspace Root)

## Generation Steps

- [x] **Step 1: Refactor New Tools to Match Registration Pattern**
  - Refactor `audit-logs.ts`, `deletion-requests.ts`, `duplicates.ts`, `users.ts`, `tokens.ts`, `address.ts`, `geocoding.ts`, `uploads.ts` to export a `registerXxxTools(server: McpServer, apiClient: SagaEventSpaceApiClient)` function instead of raw definitions.

- [x] **Step 2: Create Central Registry (`src/tools/index.ts`)**
  - Implement `registerAllTools(server: McpServer, apiClient: SagaEventSpaceApiClient)` that calls all individual tool registration functions.

- [x] **Step 3: Update Main Entry Point (`src/index.ts`)**
  - Replace individual tool registrations with the single `registerAllTools` call.

- [x] **Step 4: Update Documentation**
  - Generate a markdown summary in `aidlc-docs/construction/unit5/code/summary.md`.
