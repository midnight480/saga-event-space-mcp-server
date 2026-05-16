# Requirements Analysis

## Intent Analysis
- **User Request**: `/Users/tetsuya/Documents/src/saga-event-space/saga-event-space-worker のAPIエンドポイントを参照してMCP Serverを最新化してください。`
- **Request Type**: Enhancement / Update
- **Scope Estimate**: System-wide (API client, types, tools)
- **Complexity Estimate**: Moderate

## API Changes to Support
Based on the analysis of `saga-event-space-worker`, the backend API has the following feature areas which are either missing or partially implemented in the MCP Server:
- `places` (Some new endpoints might exist, need checking)
- `search` (Currently supported)
- `announcements` (Currently supported)
- `release-notes` (Currently supported)
- `address` & `geocoding` (New)
- `duplicates` (New - Report, resolve, merge, detect duplicates)
- `tokens` (New - Manage PAT tokens)
- `uploads` (New - Photo uploads)
- `audit-logs` (New - Access audit logs and statistics)
- `accounts` & `users` (New - Manage profiles, roles, restore)
- `deletion-requests` (New - Manage place deletion requests)

## Functional Requirements
1. **API Client Update**:
   - `src/api-client.ts` を更新し、上記の新しいエンドポイント（監査ログ、重複管理、削除申請、ユーザー/アカウント管理、トークン管理など）を呼び出せるようにする。
   - 必要なデータ型（`src/types.ts`）を `saga-event-space-worker` のスキーマに合わせて追加・更新する。

2. **MCP ツールの追加**:
   - `src/tools/` 以下に新しいツールの定義ファイル（例: `audit-logs.ts`, `duplicates.ts`, `deletion-requests.ts`, `users.ts` など）を作成し、MCPサーバーに登録する。
   - `src/index.ts` でこれらのツール群を読み込み・登録する。

## Non-Functional Requirements
1. **セキュリティ拡張機能**:
   - ユーザーの選択により無効（PoC向け）となっているため、厳密なセキュリティチェックはスキップする。
2. **プロパティベーステスト (PBT)**:
   - ユーザーの選択により部分的（純粋関数およびシリアライズ用）に適用する。複雑なビジネスロジックはないが、APIレスポンスのパースやシリアライズ部分で利用を検討する。
3. **互換性**:
   - 既存のツール定義（search, places, announcements, release-notes）を破壊しないようにする。

## Next Steps
- User Stories を作成するか、すぐに Workflow Planning に移る。
- APIの変更点が多いため、実装プランを立ててコンポーネントごとにコード生成を行う。
