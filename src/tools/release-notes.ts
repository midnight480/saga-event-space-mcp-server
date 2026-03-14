/**
 * リリースノート管理系MCPツール定義（認証必須）
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { SagaEventSpaceApiClient } from "../api-client.js";

/**
 * リリースノート管理ツールをMCPサーバに登録する
 */
export function registerReleaseNoteTools(
  server: McpServer,
  apiClient: SagaEventSpaceApiClient
): void {
  // リリースノート作成ツール
  server.tool(
    "create_release_note",
    "新しいリリースノートを作成します。APIトークンが必要です。",
    {
      version: z.string().describe("バージョン番号（セマンティックバージョニング形式。例: 1.0.0）"),
      title: z.string().describe("リリースノートのタイトル（最大200文字）"),
      body_md: z.string().describe("リリースノート本文（Markdown形式）"),
      tags: z.array(z.string()).optional().describe("タグ（配列形式）"),
      status: z.enum(["draft", "published"]).optional()
        .describe("ステータス（デフォルト: draft）"),
    },
    async (params) => {
      try {
        const result = await apiClient.createReleaseNote(params);
        const data = result;
        return {
          content: [{
            type: "text" as const,
            text: `✅ リリースノート v${data.version}「${data.title}」を作成しました。\nID: ${data.id}\nステータス: ${data.status}`,
          }],
        };
      } catch (error) {
        return {
          content: [{
            type: "text" as const,
            text: `リリースノート作成中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
          }],
          isError: true,
        };
      }
    }
  );

  // リリースノート更新ツール
  server.tool(
    "update_release_note",
    "既存のリリースノートを更新します。APIトークンが必要です。",
    {
      id: z.string().describe("更新するリリースノートのID"),
      version: z.string().optional().describe("バージョン番号"),
      title: z.string().optional().describe("リリースノートのタイトル"),
      body_md: z.string().optional().describe("リリースノート本文（Markdown形式）"),
      tags: z.array(z.string()).optional().describe("タグ（配列形式）"),
      status: z.enum(["draft", "published"]).optional().describe("ステータス"),
    },
    async ({ id, ...data }) => {
      try {
        const result = await apiClient.updateReleaseNote(id, data);
        return {
          content: [{
            type: "text" as const,
            text: `✅ リリースノート v${result.version}「${result.title}」を更新しました。\nID: ${result.id}`,
          }],
        };
      } catch (error) {
        return {
          content: [{
            type: "text" as const,
            text: `リリースノート更新中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
          }],
          isError: true,
        };
      }
    }
  );

  // リリースノート削除ツール
  server.tool(
    "delete_release_note",
    "リリースノートを削除します。APIトークンが必要です。この操作は取り消せません。",
    {
      id: z.string().describe("削除するリリースノートのID"),
    },
    async ({ id }) => {
      try {
        await apiClient.deleteReleaseNote(id);
        return {
          content: [{
            type: "text" as const,
            text: `✅ リリースノート（ID: ${id}）を削除しました。`,
          }],
        };
      } catch (error) {
        return {
          content: [{
            type: "text" as const,
            text: `リリースノート削除中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
          }],
          isError: true,
        };
      }
    }
  );
}
