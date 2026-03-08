// import { taskApi as mockTaskApi } from "./mock/mockApi";
import { taskApi } from "./taskApi";
import { taskApi as taskApiTauri } from "./taskApiTauri";

const isDesktop = "__TAURI_INTERNALS__" in window;
const _taskApi = (isDesktop ? taskApiTauri : taskApi);

export const taskService = () => {
    const api = _taskApi();
    return {
        fetchTasks: api.fetchTasks,
        createTasks: api.createTasks,
        updateTask: api.updateTask,
        updateCell: api.updateCell,
    }
}