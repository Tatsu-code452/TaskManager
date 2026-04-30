import { taskApi } from "../../../../api/tauri/taskApi";
import { TaskModel } from "../../components/cell";
import { toTaskModelFromRows } from "../model/toTaskModelFromRows";
import { calcCriticalPath } from "../service/criticalPath";

export const fetchTaskModelList = async (projectId: string): Promise<TaskModel[]> => {
    const tasks = await taskApi.fetch(projectId);
    const models = await Promise.all(
        tasks.map(async (task) => {
            return (toTaskModelFromRows(task.task, task.plan, task.actual));
        })
    );

    const criticalIds = calcCriticalPath(models);

    return models.map((t) => ({
        ...t,
        isCritical: criticalIds.has(t.id),
    }));
};