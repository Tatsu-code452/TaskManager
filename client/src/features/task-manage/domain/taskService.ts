import { taskApi as mockTaskApi } from "./mock/mockApi";
import { taskApi } from "./taskApi";

const isTest = true;
const _taskApi = (isTest ? mockTaskApi : taskApi);

export const taskService = () => {
    const api = _taskApi();
    return {
        fetchTasks: api.fetchTasks,
        updateTask: api.updateTask,
        updateCell: api.updateCell,
    }
}