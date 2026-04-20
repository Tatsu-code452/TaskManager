import { TaskModel } from "../../types/model";
import { toDate } from "../utils/date";

export const isCellDelayed = (
    task: TaskModel,
    date: string
): boolean => {
    const planned = task.plan.cells[date] ?? null;
    const actual = task.actual.cells[date] ?? null;

    return actual !== null && planned === null;
};

export const isStartDelayed = (task: TaskModel): boolean => {
    const planStart = toDate(task.plan.start);
    const actualStart = toDate(task.actual.start);

    if (!planStart || !actualStart) return false;

    return actualStart > planStart;
};

export const isWorkloadDelayed = (task: TaskModel): boolean => {
    const planHours = task.plan.totalHours ?? 0;
    const actualHours = task.actual.totalHours ?? 0;

    return actualHours > planHours;
};

export const isEndDelayed = (task: TaskModel): boolean => {
    const planEnd = toDate(task.plan.end);
    const actualEnd = toDate(task.actual.end);

    if (!planEnd || !actualEnd) return false;

    return actualEnd > planEnd;
};

export const getDelayStatus = (task: TaskModel) => {
    return {
        startDelayed: isStartDelayed(task),
        workloadDelayed: isWorkloadDelayed(task),
        endDelayed: isEndDelayed(task),
    };
};

