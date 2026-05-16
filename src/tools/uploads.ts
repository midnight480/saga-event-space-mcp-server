import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { SagaEventSpaceApiClient } from "../api-client.js";

export function registerUploadsTools(
  server: McpServer,
  apiClient: SagaEventSpaceApiClient
): void {
  server.tool(
    "get_upload_url",
    "Get a presigned URL to upload a photo directly to R2. API token required.",
    {
      content_type: z.string().describe("The MIME type of the file (e.g., 'image/jpeg')"),
      file_name: z.string().describe("The name of the file to upload"),
    },
    async (args) => {
      try {
        const data = await apiClient.getUploadUrl(args);
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
