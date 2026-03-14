/**
 * Saga Event Space API の型定義
 */

/** 会場種別 */
export type PlaceCategory = "facility" | "hotel" | "venue";

/** 会場ステータス */
export type PlaceStatus = "draft" | "published" | "archived" | "closed" | "temporarily_closed";

/** ジオコードソース */
export type GeocodeSource = "nominatim" | "manual";

/** アメニティ設備 */
export interface Amenities {
  wifi?: 0 | 1;
  power_outlet?: 0 | 1;
  parking?: 0 | 1;
  screen?: 0 | 1;
  display?: 0 | 1;
  projector?: 0 | 1;
  microphone?: 0 | 1;
  whiteboard?: 0 | 1;
  air_conditioning?: 0 | 1;
  kitchen?: 0 | 1;
  catering?: 0 | 1;
  wheelchair_accessible?: 0 | 1;
  smoking_area?: 0 | 1;
  non_smoking?: 0 | 1;
  live_streaming?: 0 | 1;
  recording?: 0 | 1;
  sound_system?: 0 | 1;
  lighting?: 0 | 1;
  stage?: 0 | 1;
}

/** 会場の住所情報 */
export interface PlaceAddress {
  raw?: string;
  city?: string;
  prefecture?: string;
}

/** 会場情報 */
export interface Place {
  id: string;
  name_ja: string;
  name_en?: string | null;
  description_ja?: string | null;
  description_en?: string | null;
  category: PlaceCategory;
  address?: PlaceAddress | null;
  address_raw?: string | null;
  address_normalized?: string | null;
  address_keys?: Record<string, unknown> | null;
  latitude?: number | null;
  longitude?: number | null;
  geocode_accuracy?: number | null;
  geocode_source?: GeocodeSource | null;
  capacity_min?: number | null;
  capacity_max?: number | null;
  price_min?: number | null;
  price_max?: number | null;
  amenities?: Amenities;
  contact_phone?: string | null;
  contact_email?: string | null;
  contact_website?: string | null;
  sns_x?: string | null;
  sns_facebook?: string | null;
  sns_instagram?: string | null;
  business_hours?: Record<string, unknown> | null;
  smart_center_collaboration?: boolean;
  has_wifi?: boolean;
  has_power_outlets?: boolean;
  has_screen?: boolean;
  has_display?: boolean;
  has_projector?: boolean;
  status?: PlaceStatus;
  created_at?: string;
  updated_at?: string;
}

/** お知らせレベル */
export type AnnouncementLevel = "info" | "warning" | "critical";

/** お知らせ */
export interface Announcement {
  id: string;
  title?: string | null;
  message_ja: string;
  level: AnnouncementLevel;
  link_url?: string | null;
  is_active: boolean;
  starts_at?: string | null;
  ends_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

/** リリースノートステータス */
export type ReleaseNoteStatus = "draft" | "published";

/** リリースノート */
export interface ReleaseNote {
  id: string;
  version: string;
  title: string;
  body_md: string;
  tags?: string[];
  status: ReleaseNoteStatus;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

/** ヘルスチェックレスポンス */
export interface HealthResponse {
  status: "ok" | "degraded" | "error";
  timestamp: string;
  environment: string;
  version: string;
}

/** 詳細ヘルスチェックレスポンス */
export interface DetailedHealthResponse extends HealthResponse {
  services: {
    supabase: { status: string; message: string; timestamp: string };
    kv: { status: string; message: string; timestamp: string };
    r2: { status: string; message: string; timestamp: string };
  };
}

/** 検索パラメータ */
export interface SearchParams {
  q?: string;
  type?: PlaceCategory;
  city?: string;
  price_min?: number;
  price_max?: number;
  capacity_min?: number;
  capacity_max?: number;
  amenities?: string;
  payment_methods?: string;
  smart_center?: "true" | "false";
  status?: "draft" | "published" | "archived";
  sort?: "created_at" | "updated_at" | "price_min" | "price_max" | "capacity_seated" | "capacity_standing" | "name";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

/** 検索結果レスポンス */
export interface SearchResponse {
  success: boolean;
  data: {
    places: Place[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      total_pages: number;
    };
  };
}

/** APIエラーレスポンス */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}
