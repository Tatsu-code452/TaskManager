import { TaskApiResponse } from "../../types/api";
import { mockActualCells, mockPlanCells, mockTaskRows } from "./mockDb";

export const mockFetchTasks = (from: string, to: string): TaskApiResponse[] => {
    return mockTaskRows.map(task => {
        const planCells = mockPlanCells
            .filter(c => c.task_id === task.id && c.date >= from && c.date <= to)
            .map(c => ({ date: c.date, hours: c.hours }));

        const actualCells = mockActualCells
            .filter(c => c.task_id === task.id && c.date >= from && c.date <= to)
            .map(c => ({ date: c.date, hours: c.hours }));

        return {
            id: task.id,
            phase: task.phase,
            name: task.name,
            actual_progress: task.actual_progress,
            planCells,
            actualCells,
        };
    });
};