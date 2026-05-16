import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { SagaEventSpaceApiClient } from "../api-client.js";

export function registerUsersTools(
  server: McpServer,
  apiClient: SagaEventSpaceApiClient
): void {
  server.tool(
    "get_users",
    "Get a list of users. API token required.",
    {
      role: z.enum(["admin", "editor", "viewer"]).optional().describe("Filter by user role"),
      status: z.enum(["active", "suspended", "deleted"]).optional().describe("Filter by user status"),
      email: z.string().optional().describe("Filter by email address"),
      limit: z.number().optional().describe("Number of users to return"),
      offset: z.number().optional().describe("Offset for pagination"),
    },
    async (args) => {
      try {
        const data = await apiClient.getUsers(args);
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
    "update_user_role",
    "Update the role of a user. API token required.",
    {
      id: z.string().describe("ID of the user"),
      role: z.enum(["admin", "editor", "viewer"]).describe("New role to assign"),
    },
    async ({ id, role }) => {
      try {
        const data = await apiClient.updateUserRole(id, { role });
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
    "restore_user",
    "Restore a deleted user. API token required.",
    {
      id: z.string().describe("ID of the user to restore"),
    },
    async ({ id }) => {
      try {
        const data = await apiClient.restoreUser(id);
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
