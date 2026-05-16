import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { SagaEventSpaceApiClient } from "../api-client.js";

export function registerAuditLogsTools(
  server: McpServer,
  apiClient: SagaEventSpaceApiClient
): void {
  server.tool(
    "get_audit_logs",
    "Get a list of audit logs. Can be filtered by entity_type, user_id, action, etc. API token required.",
    {
      entity_type: z.string().optional().describe("Filter by entity type (e.g., 'place', 'user')"),
      user_id: z.string().optional().describe("Filter by user ID"),
      action: z.string().optional().describe("Filter by action (e.g., 'created', 'updated')"),
      limit: z.number().optional().describe("Number of logs to return"),
      offset: z.number().optional().describe("Offset for pagination"),
    },
    async (args) => {
      try {
        const data = await apiClient.getAuditLogs(args);
        return {
          content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
          isError: true,
        };
      }
    }
  );

  server.tool(
    "get_audit_log_stats",
    "Get statistics of audit logs. API token required.",
    {},
    async () => {
      try {
        const data = await apiClient.getAuditLogStats();
        return {
          content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
          isError: true,
        };
      }
    }
  );
}
