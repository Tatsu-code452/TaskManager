import { invoke } from "@tauri-apps/api/core";
import { TaskPlanRow } from "../../types/db/taskPlan";

export const taskPlanCellApi = {
    list: async (taskId: string): Promise<TaskPlanRow[]> => {
        return await invoke("list_task_plan_cells", { taskId });
    },
    create: async (payload: TaskPlanRow) => {
        return await invoke("create_task_plan_cell", { payload });
    },
    update: async (taskId: string, date: string, hours: number) => {
        return await invoke("update_task_plan_cell", { taskId, date, hours });
    },
    delete: async (taskId: string, date: string) => {
        return await invoke("delete_task_plan_cell", { taskId, date });
    },
};