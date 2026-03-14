/**
 * 検索・参照系MCPツール定義（認証不要）
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { SagaEventSpaceApiClient } from "../api-client.js";

/**
 * 検索・参照系ツールをMCPサーバに登録する
 */
export function registerSearchTools(
  server: McpServer,
  apiClient: SagaEventSpaceApiClient
): void {
  // 会場検索ツール
  server.tool(
    "search_places",
    "佐賀県内のイベントスペース・ホテル・懇親会会場を検索します。キーワード、カテゴリ、設備条件、料金、収容人数などで絞り込みが可能です。",
    {
      q: z.string().optional().describe("検索キーワード（名前・説明文から部分一致）"),
      type: z.enum(["facility", "hotel", "venue"]).optional()
        .describe("会場種別（facility: イベント施設, hotel: ホテル, venue: 懇親会会場）"),
      city: z.string().optional().describe("市町名（例: 佐賀市, 唐津市）"),
      price_min: z.number().optional().describe("最低料金（円）"),
      price_max: z.number().optional().describe("最高料金（円）"),
      capacity_min: z.number().optional().describe("最小収容人数"),
      capacity_max: z.number().optional().describe("最大収容人数"),
      amenities: z.string().optional()
        .describe("必要な設備（カンマ区切り。例: wifi,projector,parking）"),
      smart_center: z.enum(["true", "false"]).optional()
        .describe("スマートセンター共催可否"),
      sort: z.enum(["created_at", "updated_at", "price_min", "price_max", "capacity_seated", "capacity_standing", "name"])
        .optional().describe("ソート項目（デフォルト: updated_at）"),
      order: z.enum(["asc", "desc"]).optional().describe("ソート順（デフォルト: desc）"),
      page: z.number().optional().describe("ページ番号（デフォルト: 1）"),
      limit: z.number().optional().describe("1ページあたりの件数（デフォルト: 20, 最大: 100）"),
    },
    async (params) => {
      try {
        const result = await apiClient.searchPlaces(params);
        const places = result.data.places;
        const pagination = result.data.pagination;

        if (places.length === 0) {
          return {
            content: [{
              type: "text" as const,
              text: "検索条件に一致する会場が見つかりませんでした。",
            }],
          };
        }

        const summary = places.map((p) => {
          const parts = [
            `📍 ${p.name_ja}`,
            `  種別: ${p.category === "facility" ? "イベント施設" : p.category === "hotel" ? "ホテル" : "懇親会会場"}`,
          ];
          if (p.address_raw) parts.push(`  住所: ${p.address_raw}`);
          if (p.capacity_min || p.capacity_max) {
            parts.push(`  収容人数: ${p.capacity_min ?? "?"}〜${p.capacity_max ?? "?"}名`);
          }
          if (p.price_min || p.price_max) {
            parts.push(`  料金: ${p.price_min ?? "?"}〜${p.price_max ?? "?"}円`);
          }
          parts.push(`  ID: ${p.id}`);
          return parts.join("\n");
        }).join("\n\n");

        const text = `## 検索結果（${pagination.total}件中 ${places.length}件表示 / ページ ${pagination.page}/${pagination.total_pages}）\n\n${summary}`;

        return {
          content: [{ type: "text" as const, text }],
        };
      } catch (error) {
        return {
          content: [{
            type: "text" as const,
            text: `検索中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
          }],
          isError: true,
        };
      }
    }
  );

  // 会場詳細取得ツール
  server.tool(
    "get_place_detail",
    "指定したIDの会場の詳細情報を取得します。",
    {
      id: z.string().describe("会場ID（UUID形式）"),
    },
    async ({ id }) => {
      try {
        const result = await apiClient.getPlace(id);
        return {
          content: [{
            type: "text" as const,
            text: JSON.stringify(result.data, null, 2),
          }],
        };
      } catch (error) {
        return {
          content: [{
            type: "text" as const,
            text: `会場詳細の取得中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
          }],
          isError: true,
        };
      }
    }
  );

  // お知らせ一覧取得ツール
  server.tool(
    "list_announcements",
    "お知らせの一覧を取得します。レベルやアクティブ状態で絞り込みが可能です。",
    {
      level: z.enum(["info", "warning", "critical"]).optional()
        .describe("お知らせレベルで絞り込み"),
      active_only: z.string().optional()
        .describe("アクティブなお知らせのみ表示（true/false）"),
      limit: z.number().optional().describe("取得件数"),
      offset: z.number().optional().describe("オフセット"),
    },
    async (params) => {
      try {
        const result = await apiClient.listAnnouncements(params);
        const announcements = result.data.announcements;

        if (!announcements || announcements.length === 0) {
          return {
            content: [{ type: "text" as const, text: "お知らせはありません。" }],
          };
        }

        const summary = announcements.map((a) => {
          const levelIcon = a.level === "critical" ? "🔴" : a.level === "warning" ? "🟡" : "🔵";
          const parts = [
            `${levelIcon} ${a.title || "(タイトルなし)"}`,
            `  内容: ${a.message_ja}`,
            `  状態: ${a.is_active ? "公開中" : "非公開"}`,
          ];
          if (a.link_url) parts.push(`  リンク: ${a.link_url}`);
          parts.push(`  ID: ${a.id}`);
          return parts.join("\n");
        }).join("\n\n");

        return {
          content: [{ type: "text" as const, text: `## お知らせ一覧（${announcements.length}件）\n\n${summary}` }],
        };
      } catch (error) {
        return {
          content: [{
            type: "text" as const,
            text: `お知らせの取得中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
          }],
          isError: true,
        };
      }
    }
  );

  // リリースノート一覧取得ツール
  server.tool(
    "list_release_notes",
    "リリースノートの一覧を取得します。",
    {},
    async () => {
      try {
        const result = await apiClient.listReleaseNotes();
        const notes = result.data.release_notes;

        if (!notes || notes.length === 0) {
          return {
            content: [{ type: "text" as const, text: "リリースノートはありません。" }],
          };
        }

        const summary = notes.map((n) => {
          const parts = [
            `📋 v${n.version} - ${n.title}`,
            `  状態: ${n.status === "published" ? "公開" : "下書き"}`,
          ];
          if (n.tags && n.tags.length > 0) {
            parts.push(`  タグ: ${n.tags.join(", ")}`);
          }
          parts.push(`  ID: ${n.id}`);
          return parts.join("\n");
        }).join("\n\n");

        return {
          content: [{ type: "text" as const, text: `## リリースノート一覧（${notes.length}件）\n\n${summary}` }],
        };
      } catch (error) {
        return {
          content: [{
            type: "text" as const,
            text: `リリースノートの取得中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
          }],
          isError: true,
        };
      }
    }
  );

  // リリースノート詳細取得ツール
  server.tool(
    "get_release_note",
    "指定したIDのリリースノートの詳細を取得します。",
    {
      id: z.string().describe("リリースノートID（UUID形式）"),
    },
    async ({ id }) => {
      try {
        const result = await apiClient.getReleaseNote(id);
        const note = result.data;
        const text = [
          `## v${note.version} - ${note.title}`,
          `状態: ${note.status === "published" ? "公開" : "下書き"}`,
          note.tags && note.tags.length > 0 ? `タグ: ${note.tags.join(", ")}` : null,
          "",
          note.body_md,
        ].filter(Boolean).join("\n");

        return {
          content: [{ type: "text" as const, text }],
        };
      } catch (error) {
        return {
          content: [{
            type: "text" as const,
            text: `リリースノートの取得中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
          }],
          isError: true,
        };
      }
    }
  );

  // ヘルスチェックツール
  server.tool(
    "check_health",
    "Saga Event Space APIのシステム稼働状況を確認します。",
    {
      detailed: z.boolean().optional().describe("詳細情報を取得するか（true でサービス別状態を取得）"),
    },
    async ({ detailed }) => {
      try {
        if (detailed) {
          const result = await apiClient.checkHealthDetailed();
          const services = Object.entries(result.services)
            .map(([name, svc]) => `  ${name}: ${svc.status === "ok" ? "✅" : "❌"} ${svc.message}`)
            .join("\n");

          return {
            content: [{
              type: "text" as const,
              text: `## システム状態: ${result.status === "ok" ? "✅ 正常" : "⚠️ " + result.status}\n環境: ${result.environment}\nバージョン: ${result.version}\n\nサービス状態:\n${services}`,
            }],
          };
        }

        const result = await apiClient.checkHealth();
        return {
          content: [{
            type: "text" as const,
            text: `システム状態: ${result.status === "ok" ? "✅ 正常" : "⚠️ " + result.status} (${result.environment}, v${result.version})`,
          }],
        };
      } catch (error) {
        return {
          content: [{
            type: "text" as const,
            text: `ヘルスチェック中にエラーが発生しました: ${error instanceof Error ? error.message : String(error)}`,
          }],
          isError: true,
        };
      }
    }
  );
}
