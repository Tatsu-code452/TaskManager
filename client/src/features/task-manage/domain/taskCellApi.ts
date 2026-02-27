import { UpdateCellRequest } from "../types/api";

/**
 * 計画セル・実績セルの更新
 * - PATCH /api/tasks/:taskId/cell
 * - value=0 の場合はサーバ側で DELETE に変換される
 * 
 * @param taskId タスクID（UUID）
 * @param params リクエストデータ
 */
export const updateCell = async (taskId: string, params: UpdateCellRequest): Promise<void> => {
    const res = await fetch(`/api/tasks/${taskId}/cell`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
    });

    if (!res.ok) throw new Error("Failed to update cell");
};