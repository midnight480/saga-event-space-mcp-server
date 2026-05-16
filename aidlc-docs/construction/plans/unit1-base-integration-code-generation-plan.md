# Unit 1: Base Integration Code Generation Plan

## Unit Context
- **Description**: Updates to the foundational API client and type definitions to support all new backend endpoints.
- **Stories/Features Covered**: Requirements Analysis 1 (API Client Update)
- **Dependencies**: None. This is the foundation for all other tools.

## Code Location
- Application Code: `src/` (Workspace Root)

## Generation Steps

- [x] **Step 1: Type Definitions Update (`src/types.ts`)**
  - Add `AuditLog` interface
  - Add `DeletionRequest` interface
  - Add `Duplicate` interface
  - Add `Token` interface
  - Add `User` interface
  - Add `GeocodingResult` interface

- [x] **Step 2: API Client Core Update (`src/api-client.ts`)**
  - Add methods for Audit Logs (`getAuditLogs`, `getAuditLogStats`)
  - Add methods for Deletion Requests (`getDeletionRequests`, `approveDeletionRequest`, `rejectDeletionRequest`)
  - Add methods for Duplicates (`getDuplicates`, `reportDuplicate`, `resolveDuplicate`, `mergeDuplicate`)
  - Add methods for Users (`getUsers`, `updateUserRole`, `restoreUser`)
  - Add methods for Tokens (`getTokens`, `createToken`, `updateToken`, `deleteToken`)
  - Add methods for Geocoding/Address (`geocode`, `normalizeAddress`)
  - Add method for Uploads (`uploadPhoto`)

- [x] **Step 3: Verification (TypeScript Compilation)**
  - Run `npx tsc --noEmit` to verify type correctness of the additions.

- [x] **Step 4: Update Documentation**
  - Generate a markdown summary in `aidlc-docs/construction/unit1/code/summary.md`.
