import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { SagaEventSpaceApiClient } from "../api-client.js";

/** 許可する画像MIMEタイプ */
const ALLOWED_CONTENT_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

/** ファイル名に使用可能な文字パターン（パストラバーサル防止） */
const SAFE_FILENAME_REGEX = /^[a-zA-Z0-9_\-][a-zA-Z0-9_\-. ]{0,254}$/;

export function registerUploadsTools(
  server: McpServer,
  apiClient: SagaEventSpaceApiClient
): void {
  server.tool(
    "get_upload_url",
    "Get a presigned URL to upload a photo directly to R2. API token required.",
    {
      content_type: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"])
        .describe("The MIME type of the file (image/jpeg, image/png, image/webp, image/gif)"),
      file_name: z.string().describe("The name of the file to upload"),
    },
    async (args) => {
      try {
        // ファイル名のバリデーション（パストラバーサル防止）
        if (!SAFE_FILENAME_REGEX.test(args.file_name)) {
          return {
            content: [{ type: "text", text: "Error: ファイル名に使用できない文字が含まれています。英数字、ハイフン、アンダースコア、ドット、スペースのみ使用可能です。" }],
            isError: true,
          };
        }
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
