# saga-event-space-mcp-server

佐賀県内のイベントスペース・ホテル・懇親会会場情報を管理する [Saga Event Space API](https://saga-event-space.midnight480.com) の MCP（Model Context Protocol）サーバです。

Claude Desktop、Kiro-CLI（Amazon Q Developer for CLI）などの MCP クライアントから利用できます。

## 利用可能なツール

### 検索・参照

| ツール名 | 説明 |
|---------|------|
| `search_places` | 会場をキーワード・カテゴリ・設備条件で検索 |
| `get_place_detail` | 指定IDの会場詳細取得 |
| `list_announcements` | お知らせ一覧取得 |
| `list_release_notes` | リリースノート一覧取得 |
| `get_release_note` | リリースノート詳細取得 |
| `check_health` | システム稼働状況確認 |

### 会場管理（APIトークン必須）

| ツール名 | 説明 |
|---------|------|
| `create_place` | 新規会場作成 |
| `update_place` | 会場情報更新 |
| `delete_place` | 会場削除 |
| `get_place_stats` | ステータス統計 |
| `bulk_update_status` | 一括ステータス更新 |

### お知らせ管理（APIトークン必須）

| ツール名 | 説明 |
|---------|------|
| `create_announcement` | お知らせ作成 |
| `update_announcement` | お知らせ更新 |
| `delete_announcement` | お知らせ削除 |

### リリースノート管理（APIトークン必須）

| ツール名 | 説明 |
|---------|------|
| `create_release_note` | リリースノート作成 |
| `update_release_note` | リリースノート更新 |
| `delete_release_note` | リリースノート削除 |

## セットアップ

### npx で利用（推奨）

```bash
npx saga-event-space-mcp-server
```

### ローカルビルド

```bash
git clone https://github.com/midnight480/saga-event-space-mcp-server.git
cd saga-event-space-mcp-server
npm install
npm run build
npm start
```

### Docker で利用

```bash
docker run -i --rm \
  -e SAGA_EVENT_SPACE_API_TOKEN=your-api-token-here \
  midnight480/saga-event-space-mcp-server
```

## MCP クライアント設定

### Claude Desktop

`claude_desktop_config.json` に以下を追加してください。

#### npx の場合

```json
{
  "mcpServers": {
    "saga-event-space": {
      "command": "npx",
      "args": ["-y", "saga-event-space-mcp-server"],
      "env": {
        "SAGA_EVENT_SPACE_API_TOKEN": "your-api-token-here"
      }
    }
  }
}
```

#### Docker の場合

```json
{
  "mcpServers": {
    "saga-event-space": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "SAGA_EVENT_SPACE_API_TOKEN",
        "midnight480/saga-event-space-mcp-server"
      ],
      "env": {
        "SAGA_EVENT_SPACE_API_TOKEN": "your-api-token-here"
      }
    }
  }
}
```

### Kiro-CLI（Amazon Q Developer for CLI）

`.kiro/settings.json` にMCPサーバ設定を追加してください。

```json
{
  "mcpServers": {
    "saga-event-space": {
      "command": "npx",
      "args": ["-y", "saga-event-space-mcp-server"],
      "env": {
        "SAGA_EVENT_SPACE_API_TOKEN": "your-api-token-here"
      }
    }
  }
}
```

## 環境変数

| 環境変数 | 必須 | 説明 |
|---------|------|------|
| `SAGA_EVENT_SPACE_API_TOKEN` | **はい** | APIアクセストークン（検索含む全操作に必要） |
| `SAGA_EVENT_SPACE_BASE_URL` | いいえ | APIのベースURL（デフォルト: `https://saga-event-space.midnight480.com`） |

## 開発

```bash
# 依存関係のインストール
npm install

# 開発モード（TypeScript ウォッチ）
npm run dev

# ビルド
npm run build

# MCP Inspector でテスト
npx @modelcontextprotocol/inspector node dist/index.js
```

## ライセンス

MIT
