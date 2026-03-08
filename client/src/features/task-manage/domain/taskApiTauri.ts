import { invoke } from "@tauri-apps/api/core";
import { TaskApiRequest, TaskApiResponse, UpdateCellRequest, UpdateTaskRequest } from "../types/api";
import { TaskRow } from "../types/db";

export const taskApi = () => {
    const fetchTasks = async (params: TaskApiRequest): Promise<TaskApiResponse[]> => {
        return await invoke("fetch_tasks", { ...params });
    };

    const createTasks = async (tasks: Partial<TaskRow>[]): Promise<void> => {
                console.log(tasks);
        await invoke("create_tasks", { tasks });
    }

    const updateTask = async (taskId: string, param: UpdateTaskRequest): Promise<void> => {
        await invoke("update_task", { taskId, param });
    };

    const updateCell = async (taskId: string, params: UpdateCellRequest): Promise<void> => {
        await invoke("update_cell", { taskId, param: params });
    };

    return {
        fetchTasks, createTasks, updateTask, updateCell,
    }
}