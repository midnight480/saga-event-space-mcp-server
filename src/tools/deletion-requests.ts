import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { SagaEventSpaceApiClient } from "../api-client.js";

export function registerDeletionRequestsTools(
  server: McpServer,
  apiClient: SagaEventSpaceApiClient
): void {
  server.tool(
    "get_deletion_requests",
    "Get a list of place deletion requests. API token required.",
    {
      status: z.enum(["pending", "approved", "rejected"]).optional().describe("Filter by request status"),
      place_id: z.string().optional().describe("Filter by place ID"),
      limit: z.number().optional().describe("Number of requests to return"),
      offset: z.number().optional().describe("Offset for pagination"),
    },
    async (args) => {
      try {
        const data = await apiClient.getDeletionRequests(args);
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
    "approve_deletion_request",
    "Approve a pending deletion request. API token required.",
    {
      id: z.string().describe("ID of the deletion request"),
    },
    async ({ id }) => {
      try {
        const data = await apiClient.approveDeletionRequest(id);
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
    "reject_deletion_request",
    "Reject a pending deletion request. API token required.",
    {
      id: z.string().describe("ID of the deletion request"),
    },
    async ({ id }) => {
      try {
        const data = await apiClient.rejectDeletionRequest(id);
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
