# Unit 4: Utility Tools Code Generation Plan

## Unit Context
- **Description**: Creation of utility MCP tools for address normalization, geocoding, and file uploads.
- **Stories/Features Covered**: Requirements Analysis 8 (Address & Geocoding), 9 (Uploads).
- **Dependencies**: Depends on Unit 1 (API Client methods and Types).

## Code Location
- Application Code: `src/tools/` (Workspace Root)

## Generation Steps

- [x] **Step 1: Create Address Tools (`src/tools/address.ts`)**
  - Implement `normalize_address` tool mapping to `apiClient.normalizeAddress`.

- [x] **Step 2: Create Geocoding Tools (`src/tools/geocoding.ts`)**
  - Implement `geocode` tool mapping to `apiClient.geocode`.

- [x] **Step 3: Create Uploads Tools (`src/tools/uploads.ts`)**
  - Implement `get_upload_url` tool mapping to `apiClient.getUploadUrl`.

- [x] **Step 4: Update Documentation**
  - Generate a markdown summary in `aidlc-docs/construction/unit4/code/summary.md`.
