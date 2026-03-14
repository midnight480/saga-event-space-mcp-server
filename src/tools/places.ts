/**
 * 会場管理系MCPツール定義（認証必須）
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { SagaEventSpaceApiClient } from "../api-client.js";

/**
 * 会場管理ツールをMCPサーバに登録する
 */
export function registerPlaceTools(
  server: McpServer,
  apiClient: SagaEventSpaceApiClient
): void {
  // 会場作成ツール
  server.tool(
    "create_place",
    "新しい会場を作成します。APIトークンが必要です。",
    {
      name_ja: z.string().describe("会場名（日本語）"),
      name_en: z.string().optional().describe("会場名（英語）"),
      description_ja: z.string().optional().describe("説明（日本語）"),
      description_en: z.string().optional().describe("説明（英語）"),
      category: z.enum(["facility", "hotel", "venue"])
        .describe("会場種別（facility: イベント施設, hotel: ホテル, venue: 懇親会会場）"),
      address_raw: z.string().optional().describe("住所"),
      capacity_min: z.number().optional().describe("最小収容人数"),
      capacity_max: z.number().optional().describe("最大収容人数"),
      price_min: z.number().optional().describe("最低料金（円）"),
      price_max: z.number().optional().describe("最高料金（円）"),
      contact_phone: z.string().optional().describe("連絡先電話番号"),
      contact_email: z.string().optional().describe("連絡先メールアドレス"),
      contact_website: z.string().optional().describe("連絡先ウェブサイトURL"),
      status: z.enum(["draft", "published", "archived", "closed", "temporarily_closed"])
        .optional().describe("ステータス（デフォルト: draft）"),
    },
    async (params) => {
      try {
        const result = await apiClient.createPlace(params);
        return {
          content: [{
            type: "text" as const,
            text: `✅ 会場「${result.name_ja}」を作成しました。\nID: ${result.id}\nカテゴリ: ${result.category}\nステータス: ${result.status}`,
          }],
        };
      } catch (error) {
        return {
          content: [{
            type: "text" as const,
            text: `会場作成中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
          }],
          isError: true,
        };
      }
    }
  );

  // 会場更新ツール
  server.tool(
    "update_place",
    "既存の会場情報を更新します。APIトークンが必要です。",
    {
      id: z.string().describe("更新する会場のID（UUID形式）"),
      name_ja: z.string().optional().describe("会場名（日本語）"),
      name_en: z.string().optional().describe("会場名（英語）"),
      description_ja: z.string().optional().describe("説明（日本語）"),
      description_en: z.string().optional().describe("説明（英語）"),
      category: z.enum(["facility", "hotel", "venue"]).optional()
        .describe("会場種別"),
      address_raw: z.string().optional().describe("住所"),
      capacity_min: z.number().optional().describe("最小収容人数"),
      capacity_max: z.number().optional().describe("最大収容人数"),
      price_min: z.number().optional().describe("最低料金（円）"),
      price_max: z.number().optional().describe("最高料金（円）"),
      contact_phone: z.string().optional().describe("連絡先電話番号"),
      contact_email: z.string().optional().describe("連絡先メールアドレス"),
      contact_website: z.string().optional().describe("連絡先ウェブサイトURL"),
      status: z.enum(["draft", "published", "archived", "closed", "temporarily_closed"])
        .optional().describe("ステータス"),
    },
    async ({ id, ...data }) => {
      try {
        const result = await apiClient.updatePlace(id, data);
        return {
          content: [{
            type: "text" as const,
            text: `✅ 会場「${result.name_ja}」を更新しました。\nID: ${result.id}`,
          }],
        };
      } catch (error) {
        return {
          content: [{
            type: "text" as const,
            text: `会場更新中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
          }],
          isError: true,
        };
      }
    }
  );

  // 会場削除ツール
  server.tool(
    "delete_place",
    "会場を削除します。APIトークンが必要です。この操作は取り消せません。",
    {
      id: z.string().describe("削除する会場のID（UUID形式）"),
    },
    async ({ id }) => {
      try {
        await apiClient.deletePlace(id);
        return {
          content: [{
            type: "text" as const,
            text: `✅ 会場（ID: ${id}）を削除しました。`,
          }],
        };
      } catch (error) {
        return {
          content: [{
            type: "text" as const,
            text: `会場削除中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
          }],
          isError: true,
        };
      }
    }
  );

  // ステータス統計ツール
  server.tool(
    "get_place_stats",
    "会場のステータスごとの件数統計を取得します。APIトークンが必要です。",
    {},
    async () => {
      try {
        const result = await apiClient.getPlaceStats();
        const stats = Object.entries(result)
          .map(([status, count]) => `  ${status}: ${count}件`)
          .join("\n");

        return {
          content: [{
            type: "text" as const,
            text: `## 会場ステータス統計\n${stats}`,
          }],
        };
      } catch (error) {
        return {
          content: [{
            type: "text" as const,
            text: `統計取得中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
          }],
          isError: true,
        };
      }
    }
  );

  // 一括ステータス更新ツール
  server.tool(
    "bulk_update_status",
    "複数の会場のステータスを一括で更新します。APIトークンが必要です。",
    {
      place_ids: z.array(z.string()).describe("更新する会場IDの配列（UUID形式）"),
      status: z.enum(["draft", "published", "archived", "closed", "temporarily_closed"])
        .describe("設定するステータス"),
      closed_reason: z.string().optional().describe("閉鎖理由（closed/temporarily_closedの場合）"),
    },
    async (params) => {
      try {
        await apiClient.bulkUpdateStatus(params);
        return {
          content: [{
            type: "text" as const,
            text: `✅ ${params.place_ids.length}件の会場のステータスを「${params.status}」に更新しました。`,
          }],
        };
      } catch (error) {
        return {
          content: [{
            type: "text" as const,
            text: `一括更新中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
          }],
          isError: true,
        };
      }
    }
  );
}
