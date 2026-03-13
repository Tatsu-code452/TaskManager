import { TaskModel } from "../types/model";

export const isDelayedCell = (task: TaskModel, date: string) => {
    const planned = task.plan.cells.find(c => c.date === date)?.value ?? null;
    const actual = task.actual.cells.find(c => c.date === date)?.value ?? null;

    return actual !== null && planned === null;
};