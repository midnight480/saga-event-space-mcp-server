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

### 管理機能（APIトークン必須）

| ツール名 | 説明 |
|---------|------|
| `get_audit_logs` | 監査ログ一覧取得 |
| `get_audit_log_stats` | 監査ログ統計取得 |
| `get_deletion_requests` | 削除申請一覧取得 |
| `approve_deletion_request` | 削除申請承認 |
| `reject_deletion_request` | 削除申請拒否 |
| `get_duplicates` | 重複報告一覧取得 |
| `report_duplicate` | 重複報告作成 |
| `resolve_duplicate` | 重複報告解決 |
| `merge_duplicate` | 重複会場マージ |

### ユーザー・認証管理（APIトークン必須）

| ツール名 | 説明 |
|---------|------|
| `get_users` | ユーザー一覧取得 |
| `update_user_role` | ユーザー権限更新 |
| `restore_user` | 削除ユーザー復元 |
| `get_tokens` | APIトークン一覧取得 |
| `create_token` | APIトークン発行 |
| `update_token` | APIトークン名更新 |
| `delete_token` | APIトークン削除 |

### ユーティリティ

| ツール名 | 説明 |
|---------|------|
| `normalize_address` | 日本語住所の正規化 |
| `geocode` | 住所→緯度経度変換 |
| `get_upload_url` | 写真アップロード用URL取得（APIトークン必須） |

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
