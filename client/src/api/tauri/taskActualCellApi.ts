import { invoke } from "@tauri-apps/api/core";
import { TaskActualRow } from "../../types/db/taskActual";

export const taskActualCellApi = {
    list: async (taskId: string): Promise<TaskActualRow[]> => {
        return await invoke("list_task_actual_cells", { taskId });
    },
    create: async (payload: TaskActualRow) => {
        return await invoke("create_task_actual_cell", { payload });
    },
    update: async (taskId: string, date: string, hours: number) => {
        return await invoke("update_task_actual_cell", { taskId, date, hours });
    },
    delete: async (taskId: string, date: string) => {
        return await invoke("delete_task_actual_cell", { taskId, date });
    },
};