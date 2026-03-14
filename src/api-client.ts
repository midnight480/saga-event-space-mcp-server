/**
 * Saga Event Space API クライアント
 * 各APIエンドポイントへのHTTPリクエストを管理する
 */

import type {
  SearchParams,
  SearchResponse,
  Place,
  Announcement,
  AnnouncementLevel,
  ReleaseNote,
  HealthResponse,
  DetailedHealthResponse,
  PlaceCategory,
  PlaceStatus,
} from "./types.js";

/** APIクライアントの設定 */
interface ApiClientConfig {
  /** APIのベースURL */
  baseUrl: string;
  /** 認証トークン（オプション） */
  apiToken?: string;
}

export class SagaEventSpaceApiClient {
  private baseUrl: string;
  private apiToken?: string;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, "");
    this.apiToken = config.apiToken;
  }

  /**
   * 認証ヘッダーを含むHTTPリクエストを実行
   */
  private async request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.apiToken) {
      headers["Authorization"] = `Bearer ${this.apiToken}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json() as T;

    if (!response.ok) {
      const errorData = data as unknown as { error?: { message?: string }; message?: string };
      const message =
        errorData?.error?.message ||
        errorData?.message ||
        `API エラー: ${response.status} ${response.statusText}`;
      throw new Error(message);
    }

    return data;
  }

  /**
   * 認証が必要な操作前にトークンの存在を確認
   */
  private requireAuth(): void {
    if (!this.apiToken) {
      throw new Error(
        "この操作にはAPIトークンが必要です。環境変数 SAGA_EVENT_SPACE_API_TOKEN を設定してください。"
      );
    }
  }

  // ========================================
  // ヘルスチェック（PUBLIC）
  // ========================================

  /** 基本ヘルスチェック */
  async checkHealth(): Promise<HealthResponse> {
    return this.request<HealthResponse>("/health");
  }

  /** 詳細ヘルスチェック */
  async checkHealthDetailed(): Promise<DetailedHealthResponse> {
    return this.request<DetailedHealthResponse>("/health/detailed");
  }

  // ========================================
  // 検索（PUBLIC）
  // ========================================

  /** 会場を検索 */
  async searchPlaces(params: SearchParams = {}): Promise<SearchResponse> {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        query.append(key, String(value));
      }
    }
    const queryString = query.toString();
    const path = `/api/v1/search${queryString ? `?${queryString}` : ""}`;
    return this.request<SearchResponse>(path);
  }

  // ========================================
  // 会場（Places）
  // ========================================

  /** 会場詳細を取得（PUBLIC） */
  async getPlace(id: string): Promise<Place> {
    return this.request(`/api/v1/places/${id}`);
  }

  /** 会場を作成（AUTH） */
  async createPlace(data: {
    name_ja: string;
    name_en?: string;
    description_ja?: string;
    description_en?: string;
    category: PlaceCategory;
    address_raw?: string;
    capacity_min?: number;
    capacity_max?: number;
    price_min?: number;
    price_max?: number;
    contact_phone?: string;
    contact_email?: string;
    contact_website?: string;
    status?: PlaceStatus;
  }): Promise<Place> {
    this.requireAuth();
    return this.request("/api/v1/places", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /** 会場を更新（AUTH） */
  async updatePlace(
    id: string,
    data: Partial<{
      name_ja: string;
      name_en: string;
      description_ja: string;
      description_en: string;
      category: PlaceCategory;
      address_raw: string;
      capacity_min: number;
      capacity_max: number;
      price_min: number;
      price_max: number;
      contact_phone: string;
      contact_email: string;
      contact_website: string;
      status: PlaceStatus;
    }>
  ): Promise<Place> {
    this.requireAuth();
    return this.request(`/api/v1/places/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  /** 会場を削除（AUTH） */
  async deletePlace(id: string): Promise<void> {
    this.requireAuth();
    await this.request(`/api/v1/places/${id}`, {
      method: "DELETE",
    });
  }

  /** ステータス統計情報を取得（AUTH） */
  async getPlaceStats(): Promise<Record<string, number>> {
    this.requireAuth();
    return this.request("/api/v1/places/stats/status");
  }

  /** 一括ステータス更新（AUTH） */
  async bulkUpdateStatus(data: {
    place_ids: string[];
    status: PlaceStatus;
    closed_reason?: string;
  }): Promise<void> {
    this.requireAuth();
    await this.request("/api/v1/places/bulk/status", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  // ========================================
  // お知らせ（Announcements）
  // ========================================

  /** お知らせ一覧を取得（PUBLIC） */
  async listAnnouncements(params?: {
    level?: AnnouncementLevel;
    active_only?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ announcements: Announcement[]; total: number; limit: number; offset: number }> {
    const query = new URLSearchParams();
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      }
    }
    const queryString = query.toString();
    const path = `/api/v1/announcements${queryString ? `?${queryString}` : ""}`;
    return this.request(path);
  }

  /** お知らせを作成（AUTH） */
  async createAnnouncement(data: {
    message_ja: string;
    title?: string;
    level?: AnnouncementLevel;
    link_url?: string;
    is_active?: boolean;
    starts_at?: string;
    ends_at?: string;
  }): Promise<Announcement> {
    this.requireAuth();
    return this.request("/api/v1/announcements", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /** お知らせを更新（AUTH） */
  async updateAnnouncement(
    id: string,
    data: Partial<{
      message_ja: string;
      title: string;
      level: AnnouncementLevel;
      link_url: string;
      is_active: boolean;
      starts_at: string;
      ends_at: string;
    }>
  ): Promise<Announcement> {
    this.requireAuth();
    return this.request(`/api/v1/announcements/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  /** お知らせを削除（AUTH） */
  async deleteAnnouncement(id: string): Promise<void> {
    this.requireAuth();
    await this.request(`/api/v1/announcements/${id}`, {
      method: "DELETE",
    });
  }

  // ========================================
  // リリースノート（Release Notes）
  // ========================================

  /** リリースノート一覧を取得（PUBLIC） */
  async listReleaseNotes(): Promise<{ release_notes: ReleaseNote[]; total: number; limit: number; offset: number }> {
    return this.request("/api/v1/release-notes");
  }

  /** リリースノート詳細を取得（PUBLIC） */
  async getReleaseNote(id: string): Promise<ReleaseNote> {
    return this.request(`/api/v1/release-notes/${id}`);
  }

  /** リリースノートを作成（AUTH） */
  async createReleaseNote(data: {
    version: string;
    title: string;
    body_md: string;
    tags?: string[];
    status?: "draft" | "published";
  }): Promise<ReleaseNote> {
    this.requireAuth();
    return this.request("/api/v1/release-notes", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /** リリースノートを更新（AUTH） */
  async updateReleaseNote(
    id: string,
    data: Partial<{
      version: string;
      title: string;
      body_md: string;
      tags: string[];
      status: "draft" | "published";
    }>
  ): Promise<ReleaseNote> {
    this.requireAuth();
    return this.request(`/api/v1/release-notes/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  /** リリースノートを削除（AUTH） */
  async deleteReleaseNote(id: string): Promise<void> {
    this.requireAuth();
    await this.request(`/api/v1/release-notes/${id}`, {
      method: "DELETE",
    });
  }
}
