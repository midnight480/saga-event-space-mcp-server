# Build Instructions

## Prerequisites
- **Build Tool**: Node.js (v22+), npm, Docker
- **Dependencies**: `@modelcontextprotocol/sdk`, `zod`
- **Environment Variables**: 
  - `SAGA_EVENT_SPACE_BASE_URL` (optional)
  - `SAGA_EVENT_SPACE_API_TOKEN` (optional for local search, required for admin tools)
- **System Requirements**: Any OS supporting Node.js and Docker

## Build Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
# Set your API token if you need to use administrative tools
export SAGA_EVENT_SPACE_API_TOKEN="your_admin_token"
```

### 3. Build the Project
```bash
# Compiles TypeScript into JavaScript in the dist/ folder
npm run build
```

### 4. Build Docker Image (Optional but Recommended)
```bash
# Builds the MCP server Docker image
docker build -t saga-event-space-mcp-server .
```

### 5. Verify Build Success
- **Expected Output**: The `dist/` directory should contain the compiled `.js` files including `index.js`. Docker build should end with `Exit code: 0` and successfully create the `saga-event-space-mcp-server` image.
- **Build Artifacts**: `dist/` folder and Docker image.

## Troubleshooting

### Build Fails with Dependency Errors
- **Cause**: Outdated `package-lock.json` or corrupted `node_modules`.
- **Solution**: Run `rm -rf node_modules package-lock.json && npm install`.

### Build Fails with Compilation Errors
- **Cause**: TypeScript type mismatches, especially in new tool handler files.
- **Solution**: Run `npx tsc --noEmit` to locate the exact file and line number of the error and correct the type definitions.
