import { TaskApiRequest, TaskApiResponse, UpdateTaskRequest } from "../types/api";

/**
 * タスク一覧取得
 * - GET /api/tasks?from=...&to=...
 * - 計画セル・実績セルは表示範囲に絞られて返ってくる
 * 
 * @param params リクエストデータ
 * @returns タスク一覧
 */
export const fetchTasks = async (params: TaskApiRequest): Promise<TaskApiResponse[]> => {
    const q = new URLSearchParams({
        from: params.from,
        to: params.to,
    }).toString();
    const res = await fetch(`/api/tasks?${q}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to fetch tasks");

    return res.json();
};

/**
 * タスク本体の更新
 * - PUT /api/tasks/:id
 * - 更新対象は TaskModel だが、実際にサーバへ送るのは
 *   phase / name / actual_progress のみ（セルは別 API）
 * 
 * @param taskId タスクID（UUID）
 * @param param リクエストデータ
 */
export const updateTask = async (taskId: string, param: UpdateTaskRequest): Promise<void> => {
    const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(param),
    });

    if (!res.ok) throw new Error("Failed to update task");
};