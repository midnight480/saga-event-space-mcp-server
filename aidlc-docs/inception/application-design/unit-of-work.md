# Unit Definitions and Responsibilities

## Overview
This document defines the logical units of work for updating the Saga Event Space MCP Server. Since this is a single application (monolithic deployable), these units represent logical development phases and modular groupings within the codebase.

## Code Organization Strategy
Based on the approved unit plan, the code will be organized by domain-specific files within the `src/tools/` directory, and all tool registrations will be managed via a new `src/tools/index.ts` helper, keeping the main `src/index.ts` clean.

## Unit 1: Base Integration (API Client & Types)
**Description**: Updates to the foundational API client and type definitions to support all new backend endpoints.
**Responsibilities**:
- Extend `src/types.ts` with new interfaces (e.g., `AuditLog`, `User`, `Token`, `Duplicate`, etc.)
- Extend `src/api-client.ts` with new API call methods corresponding to the new worker endpoints.

## Unit 2: Administrative Tools
**Description**: New MCP tools for administrative tasks.
**Responsibilities**:
- `src/tools/audit-logs.ts`: 監査ログの取得・統計ツール
- `src/tools/deletion-requests.ts`: 削除申請の管理（一覧、承認、拒否）ツール
- `src/tools/duplicates.ts`: 重複会場の報告・解決・マージツール

## Unit 3: User & Auth Tools
**Description**: New MCP tools for managing users, accounts, and API tokens.
**Responsibilities**:
- `src/tools/users.ts`: ユーザー一覧、権限変更、リストアツール
- `src/tools/accounts.ts`: アカウントのプロフィール取得、更新、ログイン履歴ツール
- `src/tools/tokens.ts`: PAT（Personal Access Token）の発行・管理ツール

## Unit 4: Utility & Existing Tools Refactoring
**Description**: New utility tools and refactoring of existing tools.
**Responsibilities**:
- `src/tools/address.ts`: 住所正規化ツール
- `src/tools/geocoding.ts`: ジオコーディングツール
- `src/tools/uploads.ts`: 画像アップロード処理
- 既存ツール（`places`, `search`, `announcements`, `release-notes`）のファイル分割（必要に応じて）

## Unit 5: Tool Registration Refactoring
**Description**: Centralization of tool registration logic.
**Responsibilities**:
- `src/tools/index.ts`: 各ツールモジュールから定義とハンドラーを集約するヘルパーの実装
- `src/index.ts`: ヘルパーを使用してサーバーにツールを一括登録するクリーンアップ
