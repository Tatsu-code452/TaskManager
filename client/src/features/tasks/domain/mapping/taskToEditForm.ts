import Task from "../../../../types/task.interface";
import { toDateInputValue } from "./converter/date";
import { toString } from "./converter/string";
import { taskFieldMap as db } from "./taskFieldMap";

export const taskToEditForm = (task: Task) => {
    return {
        name: toString(task.name),

        projectId: toString(task[db.projectId]),
        phaseId: toString(task[db.phaseId]),
        categoryId: toString(task[db.categoryId]),
        userId: toString(task[db.userId]),

        plannedStart: toDateInputValue(task[db.plannedStart]),
        plannedEnd: toDateInputValue(task[db.plannedEnd]),
        actualStart: toDateInputValue(task[db.actualStart]),
        actualEnd: toDateInputValue(task[db.actualEnd]),

        progressRate: task[db.progressRate] ?? 0,
        priority: task[db.priority] ?? 1,
    };
};