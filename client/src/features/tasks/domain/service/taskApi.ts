import { createTask, createTasks, listTasks, removeTask, updateTask } from "../../../../api";
import { mockTaskApi } from "./mock/mockTaskApi";

const USE_MOCK = true;

export const _taskApi = {
    listTasks,
    createTask,
    createTasks,
    updateTask,
    deleteTask: removeTask,
}

export const taskApi = USE_MOCK ? mockTaskApi : _taskApi;