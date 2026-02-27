/**
 * TASK テーブル（タスク本体）
 * - 計画/実績のセルは別テーブルで管理するため、ここには保持しない
 * - actual_progress のみ手入力で保持し、他は画面側で自動算出する
 */
export interface TaskRow {
    /** タスクID（UUID） */
    id: string;

    /** フェーズ名（例：要件定義） */
    phase: string;

    /** タスク名（例：画面イメージ作成） */
    name: string;

    /** 実績進捗率（NUMERIC → number）。手入力で DB に保存される唯一の進捗値 */
    actual_progress: number;

    /** 作成日時（ISO8601） */
    created_at: string;

    /** 更新日時（ISO8601） */
    updated_at: string;
}

/**
 * TASK_PLAN_CELLS テーブル（計画工数）
 * - 1日1レコード
 * - hours=0 の場合はレコードを作らない（0 は未入力扱い）
 */
export interface TaskPlanCellRow {
    /** タスクID（UUID） */
    task_id: string;

    /** 日付（YYYY-MM-DD） */
    date: string;

    /** 計画工数（NUMERIC → number）。0.5h などの小数を許容 */
    hours: number;
}

/**
 * TASK_ACTUAL_CELLS テーブル（実績工数）
 * - 計画と同じ構造
 * - 実績は基準日までの値で開始/終了/工数を算出する
 */
export interface TaskActualCellRow {
    /** タスクID（UUID） */
    task_id: string;

    /** 日付（YYYY-MM-DD） */
    date: string;

    /** 実績工数（NUMERIC → number） */
    hours: number;
}