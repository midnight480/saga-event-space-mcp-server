# Unit 2: Administrative Tools Code Generation Plan

## Unit Context
- **Description**: Creation of new MCP tools for administrative tasks (Audit Logs, Deletion Requests, Duplicates).
- **Stories/Features Covered**: Requirements Analysis 3 (Audit Logs), 4 (Deletion Requests), 5 (Duplicates).
- **Dependencies**: Depends on Unit 1 (API Client methods and Types).

## Code Location
- Application Code: `src/tools/` (Workspace Root)

## Generation Steps

- [x] **Step 1: Create Audit Logs Tools (`src/tools/audit-logs.ts`)**
  - Implement `get_audit_logs` tool (Zod schema for params, call `getAuditLogs`).
  - Implement `get_audit_log_stats` tool (Zod schema for params, call `getAuditLogStats`).
  - Export tools definition and handlers.

- [x] **Step 2: Create Deletion Requests Tools (`src/tools/deletion-requests.ts`)**
  - Implement `get_deletion_requests` tool.
  - Implement `approve_deletion_request` tool.
  - Implement `reject_deletion_request` tool.
  - Export tools definition and handlers.

- [x] **Step 3: Create Duplicates Tools (`src/tools/duplicates.ts`)**
  - Implement `get_duplicates` tool.
  - Implement `report_duplicate` tool.
  - Implement `resolve_duplicate` tool.
  - Implement `merge_duplicate` tool.
  - Export tools definition and handlers.

- [x] **Step 4: Update Documentation**
  - Generate a markdown summary in `aidlc-docs/construction/unit2/code/summary.md`.
