#!/usr/bin/env node

/**
 * Saga Event Space MCP サーバ
 * 佐賀県内のイベントスペース・ホテル・懇親会会場情報を管理するAPIのMCPサーバ
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SagaEventSpaceApiClient } from "./api-client.js";
import { registerSearchTools } from "./tools/search.js";
import { registerPlaceTools } from "./tools/places.js";
import { registerAnnouncementTools } from "./tools/announcements.js";
import { registerReleaseNoteTools } from "./tools/release-notes.js";

/** デフォルトのAPI URL */
const DEFAULT_BASE_URL = "https://saga-event-space.midnight480.com";

async function main(): Promise<void> {
  // 環境変数から設定を読み取り
  const baseUrl = process.env.SAGA_EVENT_SPACE_BASE_URL || DEFAULT_BASE_URL;
  const apiToken = process.env.SAGA_EVENT_SPACE_API_TOKEN;

  // APIクライアントの初期化
  const apiClient = new SagaEventSpaceApiClient({
    baseUrl,
    apiToken,
  });

  // MCPサーバの作成
  const server = new McpServer({
    name: "saga-event-space",
    version: "1.0.0",
  });

  // ツールの登録
  registerSearchTools(server, apiClient);
  registerPlaceTools(server, apiClient);
  registerAnnouncementTools(server, apiClient);
  registerReleaseNoteTools(server, apiClient);

  // stdioトランスポートで起動
  const transport = new StdioServerTransport();
  await server.connect(transport);

  // 起動ログ（stderrに出力、stdoutはMCPプロトコル通信用）
  console.error(`Saga Event Space MCP サーバを起動しました`);
  console.error(`API URL: ${baseUrl}`);
  console.error(`認証: ${apiToken ? "有効（トークン設定済み）" : "無効（検索のみ利用可能）"}`);
}

main().catch((error) => {
  console.error("MCPサーバの起動に失敗しました:", error);
  process.exit(1);
});
