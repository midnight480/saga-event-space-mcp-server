import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { SagaEventSpaceApiClient } from "../api-client.js";

export function registerTokensTools(
  server: McpServer,
  apiClient: SagaEventSpaceApiClient
): void {
  server.tool(
    "get_tokens",
    "Get a list of API tokens for the authenticated user. API token required.",
    {},
    async () => {
      try {
        const data = await apiClient.getTokens();
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
    "create_token",
    "Create a new API token. API token required.",
    {
      name: z.string().describe("Name of the token (e.g., 'GitHub Actions')"),
      expires_in_days: z.number().optional().describe("Number of days until the token expires"),
    },
    async (args) => {
      try {
        const data = await apiClient.createToken(args);
        // トークンシークレットは先頭8文字のみ表示し、残りをマスク
        const maskedSecret = data.token_secret
          ? data.token_secret.substring(0, 8) + "..." + "*".repeat(8)
          : undefined;
        const safeData = { ...data, token_secret: maskedSecret };
        return {
          content: [{ type: "text", text: `⚠️ トークンシークレットは一度しか表示されません。安全に保管してください。\n\n${JSON.stringify(safeData, null, 2)}` }],
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
    "update_token",
    "Update the name of an existing API token. API token required.",
    {
      id: z.string().describe("ID of the token"),
      name: z.string().describe("New name of the token"),
    },
    async ({ id, name }) => {
      try {
        const data = await apiClient.updateToken(id, { name });
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
    "delete_token",
    "Delete an API token. API token required.",
    {
      id: z.string().describe("ID of the token to delete"),
    },
    async ({ id }) => {
      try {
        await apiClient.deleteToken(id);
        return {
          content: [{ type: "text", text: JSON.stringify({ success: true }, null, 2) }],
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
