import { taskService } from "../domain/taskService";

export const useTaskService = () => {
    const service = taskService();
    return {
        fetchTasks: service.fetchTasks,
    }
}