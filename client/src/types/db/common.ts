export interface Timestamps {
    created_at: string;
    updated_at: string;
}

export enum TagType {
    Domain = "Domain", // 技術領域 (Frontend, Backend, DB, API, UI, Rust, React)
    Area = "Area",   // 業務領域 (仕様, 設計, 実装, テスト)
    Topic = "Topic",  // テーマ (採番, バリデーション, 認証, 権限)
}

export type Tag = {
    tag_type: TagType,
    value: string,
};
