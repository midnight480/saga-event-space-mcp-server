import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { SagaEventSpaceApiClient } from "../api-client.js";

export function registerDuplicatesTools(
  server: McpServer,
  apiClient: SagaEventSpaceApiClient
): void {
  server.tool(
    "get_duplicates",
    "Get a list of duplicate place reports. API token required.",
    {
      status: z.enum(["pending", "resolved", "merged", "rejected"]).optional().describe("Filter by status"),
      place_id: z.string().optional().describe("Filter by place ID"),
      limit: z.number().optional().describe("Limit"),
      offset: z.number().optional().describe("Offset"),
    },
    async (args) => {
      try {
        const data = await apiClient.getDuplicates(args);
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
    "report_duplicate",
    "Report a place as a duplicate. API token required.",
    {
      place_id: z.string().describe("ID of the duplicate place"),
      duplicate_of: z.string().describe("ID of the original place"),
      notes: z.string().optional().describe("Optional notes"),
    },
    async (args) => {
      try {
        const data = await apiClient.reportDuplicate(args);
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
    "resolve_duplicate",
    "Resolve a duplicate report. API token required.",
    {
      id: z.string().describe("ID of the duplicate report"),
      notes: z.string().optional().describe("Optional resolution notes"),
    },
    async ({ id, notes }) => {
      try {
        const data = await apiClient.resolveDuplicate(id, { notes });
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
    "merge_duplicate",
    "Merge a duplicate place. API token required.",
    {
      id: z.string().describe("ID of the duplicate report to merge"),
    },
    async ({ id }) => {
      try {
        const data = await apiClient.mergeDuplicate(id);
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
