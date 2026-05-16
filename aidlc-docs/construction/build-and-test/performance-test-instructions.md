# Performance Test Instructions

## Purpose
Validate system performance under load to ensure the MCP server does not become a bottleneck between the AI Agent and the Backend API.

## Performance Requirements
- **Response Time**: < 500ms for MCP Tool responses (excluding backend latency).
- **Throughput**: Support standard AI-agent interaction rates (e.g., 5-10 requests/second).
- **Concurrent Users**: N/A (MCP servers typically run as local processes tied to a single user session).

## Setup Performance Test Environment

### 1. Prepare Test Environment
No special scaling is required since the MCP server is a stateless bridge. Ensure the underlying `saga-event-space-worker` backend is scaled to handle the test load.

## Run Performance Tests

*Note: For a local MCP server, extensive load testing is generally not required unless deployed as an SSE-based shared server. The primary performance constraint will be the upstream API and the AI model generation speed.*
