/**
 * 進捗管理画面の状態（画面構成の最上位単位）
 * - 表示範囲（日付マトリックスの列範囲）
 * - 基準日（進捗率算出に使用）
 * - タスク一覧（計画・実績を含む）
 */
export interface ProgressPageState {
    /** 日付マトリックスの表示範囲 */
    displayRange: DisplayRange;

    /** 進捗率算出の基準日（YYYY-MM-DD） */
    baseDate: string;

    /** タスク行の一覧 */
    tasks: TaskModel[];
}

/**
 * 日付マトリックスの表示範囲
 * - from ～ to の期間が列として表示される
 */
export interface DisplayRange {
    /** 表示開始日（YYYY-MM-DD） */
    from: string;

    /** 表示終了日（YYYY-MM-DD） */
    to: string;
}

/**
 * タスク1行（計画行 + 実績行のセット）
 * - 計画(plan) と 実績(actual) は構造が似ているが責務が異なるため独立させている
 * - 計画はすべて自動算出
 * - 実績は progress のみ手入力、他は自動算出
 */
export interface TaskModel {
    /** タスクID（UUID） */
    id: string;

    /** フェーズ名（例：要件定義） */
    phase: string;

    /** タスク名（例：画面イメージ作成） */
    name: string;

    /** 計画情報（自動算出） */
    plan: TaskPlan;

    /** 実績情報（progress は手入力） */
    actual: TaskActual;
}

/**
 * 計画情報
 * - すべて画面側で自動算出される
 * - progress は基準日までの計画工数から算出
 */
export interface TaskPlan {
    /** 日付ごとの計画工数（0.5h 単位など） */
    cells: TaskMatrixValue[];

    /** 最初に工数が入力された日（自動算出） */
    start?: string;

    /** 最後に工数が入力された日（自動算出） */
    end?: string;

    /** 計画工数の合計（自動算出） */
    totalHours: number;

    /** 計画進捗率（基準日までの計画工数 / 全計画工数 × 100） */
    progress: number;
}

/**
 * 実績情報
 * - progress のみ手入力
 * - start / end / totalHours は画面側で自動算出
 * - end は progress が 100% のときのみ設定される
 */
export interface TaskActual {
    /** 日付ごとの実績工数 */
    cells: TaskMatrixValue[];

    /** 最初に実績が入力された日（基準日までの範囲で自動算出） */
    start?: string;

    /** 最後に実績が入力された日（progress が 100% のときのみ設定） */
    end?: string;

    /** 実績工数の合計（自動算出） */
    totalHours: number;

    /** 実績進捗率（手入力） */
    progress: number;
}

/**
 * タスク1セル（計画 or 実績の1日分の工数）
 */
export interface TaskMatrixValue {
    /** 日付（YYYY-MM-DD） */
    date: string;

    /** 工数（0.5h 単位など） */
    value: number;
}