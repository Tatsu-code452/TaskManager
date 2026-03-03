import { TaskApiRequest, TaskApiResponse, UpdateCellRequest, UpdateTaskRequest } from "../../types/api";
import {
    mockActualCells as mockActualCellsDB,
    mockPlanCells as mockPlanCellsDB,
    mockTaskRows as mockTaskRowsDB
} from "./mockDb";

let mockTaskRows = mockTaskRowsDB;
let mockPlanCells = mockPlanCellsDB;
let mockActualCells = mockActualCellsDB;

export const taskApi = () => {
    const fetchTasks = async (params: TaskApiRequest): Promise<TaskApiResponse[]> => {
        const { from, to } = params;
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

    const updateTask = async (taskId: string, param: UpdateTaskRequest): Promise<void> => {
        console.log(taskId, param);
        mockTaskRows = mockTaskRows.map(task => {
            if (task.id !== taskId) return task;

            return {
                ...task,
                actual_progress: param.actual_progress,
            };
        });
    };

    const updateCell = async (taskId: string, param: UpdateCellRequest): Promise<void> => {
        console.log(taskId, param);
        if (param.rowType === "plan") {
            const target = mockPlanCells.find(
                cell => cell.task_id === taskId && cell.date === param.date);

            if (!target && param.value > 0) {
                mockPlanCells.push({ task_id: taskId, date: param.date, hours: param.value });
                return;
            }
            mockPlanCells = mockPlanCells.map(cell => {
                if (cell.task_id !== taskId) return cell;
                if (cell.date !== param.date) return cell;
                if (param.value === 0) return;
                return {
                    ...cell,
                    hours: param.value,
                }
            });
        } else {
            const target = mockActualCells.find(
                cell => cell.task_id === taskId && cell.date === param.date);

            if (!target && param.value > 0) {
                mockActualCells.push({ task_id: taskId, date: param.date, hours: param.value });
                return;
            }
            mockActualCells = mockActualCells.map(cell => {
                if (cell.task_id !== taskId) return cell;
                if (cell.date !== param.date) return cell;
                if (param.value === 0) return;
                return {
                    ...cell,
                    hours: param.value,
                }
            });
        }
    }

    return {
        fetchTasks, updateTask, updateCell
    }
}
