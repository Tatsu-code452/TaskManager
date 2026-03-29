import { taskActualCellApi } from "../../../api/tauri/taskActualCellApi";
import { taskApi } from "../../../api/tauri/taskApi";
import { taskPlanCellApi } from "../../../api/tauri/taskPlanCellApi";
import { TaskRow } from "../../../types/db/task";
import { TaskActualRow } from "../../../types/db/taskActual";
import { TaskPlanRow } from "../../../types/db/taskPlan";
import { TaskModel } from "../types/model";
import { calcCriticalPath } from "./calcCriticalPath";
import { toTaskModelFromRows } from "./toTaskModelFromRows";

export const fetchTaskModelList = async (projectId: string): Promise<TaskModel[]> => {

    const result: TaskModel[] = [];

    const tasks: TaskRow[] = await taskApi.list(projectId);
    for (const task of tasks) {
        const planCells: TaskPlanRow[] = await taskPlanCellApi.list(task.id);
        const actualCells: TaskActualRow[] = await taskActualCellApi.list(task.id);
        result.push(toTaskModelFromRows(task, planCells, actualCells));
    }
    const criticalIds = calcCriticalPath(result);

    return result.map((t) => ({
        ...t,
        isCritical: criticalIds.has(t.id),
    }));
};