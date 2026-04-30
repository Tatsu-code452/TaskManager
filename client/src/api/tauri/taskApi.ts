import { invoke } from "@tauri-apps/api/core";
import { TaskPayload, TaskRow } from "../../types/db/task";
import { TaskActualRow } from "../../types/db/taskActual";
import { TaskPlanRow } from "../../types/db/taskPlan";

type FetchResult = {
    task: TaskRow,
    plan: TaskPlanRow[],
    actual: TaskActualRow[],
}
export const taskApi = {
    list: async (projectId: string): Promise<TaskRow[]> => {
        return await invoke("list_tasks", { projectId });
    },
    fetch: async (projectId: string): Promise<FetchResult[]> => {
        return await invoke("fetch_task_and_cells", { projectId });
    },
    create: async (task: TaskPayload) => {
        return await invoke("create_task", { payload: task });
    },

    update: async (task: TaskPayload) => {
        return await invoke("update_task", { payload: task });
    },

    delete: async (projectId: string, id: string) => {
        return await invoke("delete_task", { id, projectId });
    },
};