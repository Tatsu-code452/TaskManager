import Task from "../../../../types/task.interface";
import { formatDate } from "./converter/date";
import { taskFieldMap as db } from "./taskFieldMap";

export const taskToViewData = (task: Task) => {
    const priority = Math.min(5, Math.max(1, task[db.priority]));

    return {
        name: task.name,

        projectId: task[db.projectId],
        phaseId: task[db.phaseId],
        categoryId: task[db.categoryId],
        userId: task[db.userId],

        planned: `${formatDate(task[db.plannedStart])} → ${formatDate(task[db.plannedEnd])}`,
        actual: `${formatDate(task[db.actualStart])} → ${formatDate(task[db.actualEnd])}`,

        progressRate: task[db.progressRate],
        priority,
    };
};