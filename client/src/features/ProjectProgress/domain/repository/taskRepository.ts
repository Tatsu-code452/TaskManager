import { taskActualCellApi } from "../../../../api/tauri/taskActualCellApi";
import { taskApi } from "../../../../api/tauri/taskApi";
import { taskPlanCellApi } from "../../../../api/tauri/taskPlanCellApi";
import { TaskRow } from "../../../../types/db/task";
import { TaskModel } from "../../types/model";
import { toTaskModelFromRows } from "../model/toTaskModelFromRows";
import { calcCriticalPath } from "../service/criticalPath";

export const fetchTaskModelList = async (projectId: string): Promise<TaskModel[]> => {
    const tasks: TaskRow[] = await taskApi.list(projectId);

    const models = await Promise.all(
        tasks.map(async (task) => {
            const planCells = await taskPlanCellApi.list(task.id);
            const actualCells = await taskActualCellApi.list(task.id);
            return (toTaskModelFromRows(task, planCells, actualCells));
        })
    );

    const criticalIds = calcCriticalPath(models);

    return models.map((t) => ({
        ...t,
        isCritical: criticalIds.has(t.id),
    }));
};