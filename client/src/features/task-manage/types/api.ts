/**
 * タスクAPIレスポンス
 * - DB の TaskRow + 計画セル + 実績セル をまとめた構造
 * - 画面側で TaskModel に変換し、自動算出を行う
 */
export interface TaskApiResponse {
    /** タスクID（UUID） */
    id: string;

    /** フェーズ名 */
    phase: string;

    /** タスク名 */
    name: string;

    /** 実績進捗率（手入力） */
    actual_progress: number;

    /** 計画セル一覧（表示範囲内のみ） */
    planCells: {
        /** 日付（YYYY-MM-DD） */
        date: string;

        /** 計画工数 */
        hours: number;
    }[];

    /** 実績セル一覧（表示範囲内のみ） */
    actualCells: {
        /** 日付（YYYY-MM-DD） */
        date: string;

        /** 実績工数 */
        hours: number;
    }[];
}

/**
 * セル更新リクエスト（PATCH /api/tasks/:id/cell）
 * - 計画 or 実績の1セルだけを更新する
 * - hours=0 の場合は DELETE 扱い
 */
export interface UpdateCellRequest {
    /** 対象日付（YYYY-MM-DD） */
    date: string;

    /** 計画セル or 実績セル */
    rowType: "plan" | "actual";

    /** 工数（0 の場合は削除扱い） */
    value: number;
}

/**
 * タスク更新リクエスト（PUT /api/tasks/:id）
 * - タスク本体の更新（主に actual_progress の更新）
 * - 計画/実績セルは別 API（PATCH）で更新する
 */
export interface UpdateTaskRequest {
    /** フェーズ名 */
    phase: string;

    /** タスク名 */
    name: string;

    /** 実績進捗率（手入力） */
    actual_progress: number;
}