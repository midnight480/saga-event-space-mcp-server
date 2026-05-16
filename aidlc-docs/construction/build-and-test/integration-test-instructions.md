# Integration Test Instructions

## Purpose
Test interactions between the MCP Server and the real `saga-event-space-worker` backend to ensure full end-to-end tool communication works.

## Test Scenarios

### Scenario 1: MCP Server → Worker API (Read-only)
- **Description**: Verify that the MCP server can fetch places and announcements without an API token.
- **Setup**: Start the MCP server using the MCP Inspector or via an MCP Client (e.g., Claude Desktop).
- **Test Steps**: Invoke the `search_places` tool.
- **Expected Results**: Successfully returns a list of places from the worker.
- **Cleanup**: None required.

### Scenario 2: MCP Server → Worker API (Administrative)
- **Description**: Verify that administrative tools correctly pass the authentication token and modify state.
- **Setup**: Start the MCP server with a valid `SAGA_EVENT_SPACE_API_TOKEN` environment variable.
- **Test Steps**: Invoke `update_user_role` or `get_audit_logs`.
- **Expected Results**: Successfully returns admin-level data or modifies state.
- **Cleanup**: Revert any state modifications using the respective API tools.

## Setup Integration Test Environment

### 1. Configure the MCP Inspector
```bash
npx @modelcontextprotocol/inspector node build/index.js
```

### 2. Configure Service Endpoints
Provide environment variables if testing locally:
```bash
export SAGA_EVENT_SPACE_BASE_URL=http://localhost:8787
export SAGA_EVENT_SPACE_API_TOKEN=test_token
```

## Run Integration Tests

### 1. Execute Integration Test Suite
Currently, integration testing is performed manually via the MCP Inspector or Claude Desktop to verify AI-agent interactions.

### 2. Verify Service Interactions
- **Test Scenarios**: Search Tools, Auth Tools, Admin Tools.
- **Expected Results**: Proper JSON responses returned to the MCP client.
- **Logs Location**: Server standard error (`stderr`).
