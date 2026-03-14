/**
 * お知らせ管理系MCPツール定義（認証必須）
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { SagaEventSpaceApiClient } from "../api-client.js";

/**
 * お知らせ管理ツールをMCPサーバに登録する
 */
export function registerAnnouncementTools(
  server: McpServer,
  apiClient: SagaEventSpaceApiClient
): void {
  // お知らせ作成ツール
  server.tool(
    "create_announcement",
    "新しいお知らせを作成します。APIトークンが必要です。",
    {
      message_ja: z.string().describe("お知らせ本文（日本語、必須）"),
      title: z.string().optional().describe("お知らせタイトル（最大200文字）"),
      level: z.enum(["info", "warning", "critical"]).optional()
        .describe("お知らせレベル（デフォルト: info）"),
      link_url: z.string().optional().describe("関連リンクURL"),
      is_active: z.boolean().optional().describe("公開状態（デフォルト: true）"),
      starts_at: z.string().optional().describe("公開開始日時（ISO 8601形式）"),
      ends_at: z.string().optional().describe("公開終了日時（ISO 8601形式）"),
    },
    async (params) => {
      try {
        const result = await apiClient.createAnnouncement(params);
        const data = result;
        const levelIcon = data.level === "critical" ? "🔴" : data.level === "warning" ? "🟡" : "🔵";
        return {
          content: [{
            type: "text" as const,
            text: `✅ お知らせを作成しました。\n${levelIcon} ${data.title || "(タイトルなし)"}\n内容: ${data.message_ja}\nID: ${data.id}`,
          }],
        };
      } catch (error) {
        return {
          content: [{
            type: "text" as const,
            text: `お知らせ作成中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
          }],
          isError: true,
        };
      }
    }
  );

  // お知らせ更新ツール
  server.tool(
    "update_announcement",
    "既存のお知らせを更新します。APIトークンが必要です。",
    {
      id: z.string().describe("更新するお知らせのID"),
      message_ja: z.string().optional().describe("お知らせ本文（日本語）"),
      title: z.string().optional().describe("お知らせタイトル"),
      level: z.enum(["info", "warning", "critical"]).optional()
        .describe("お知らせレベル"),
      link_url: z.string().optional().describe("関連リンクURL"),
      is_active: z.boolean().optional().describe("公開状態"),
      starts_at: z.string().optional().describe("公開開始日時（ISO 8601形式）"),
      ends_at: z.string().optional().describe("公開終了日時（ISO 8601形式）"),
    },
    async ({ id, ...data }) => {
      try {
        const result = await apiClient.updateAnnouncement(id, data);
        return {
          content: [{
            type: "text" as const,
            text: `✅ お知らせ（ID: ${result.id}）を更新しました。`,
          }],
        };
      } catch (error) {
        return {
          content: [{
            type: "text" as const,
            text: `お知らせ更新中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
          }],
          isError: true,
        };
      }
    }
  );

  // お知らせ削除ツール
  server.tool(
    "delete_announcement",
    "お知らせを削除します。APIトークンが必要です。この操作は取り消せません。",
    {
      id: z.string().describe("削除するお知らせのID"),
    },
    async ({ id }) => {
      try {
        await apiClient.deleteAnnouncement(id);
        return {
          content: [{
            type: "text" as const,
            text: `✅ お知らせ（ID: ${id}）を削除しました。`,
          }],
        };
      } catch (error) {
        return {
          content: [{
            type: "text" as const,
            text: `お知らせ削除中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
          }],
          isError: true,
        };
      }
    }
  );
}
