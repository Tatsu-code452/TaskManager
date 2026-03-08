import { useCallback, useMemo } from "react";
import { taskService } from "../../domain/taskService";
import { toTaskModel } from "../../domain/toTaskModel";
import { CreateTaskRequest, UpdateCellRequest, UpdateTaskRequest } from "../../types/api";
import { TaskRow } from "../../types/db";
import { DisplayRange } from "../../types/model";

export const useTaskService = () => {
    const service = useMemo(() => taskService(), []);

    const fetchTasks = useCallback(async (displayRange: DisplayRange, baseDate: string) => {
        const tasks = await service.fetchTasks(displayRange);
        console.log(tasks);
        return tasks.map((task) => toTaskModel(task, baseDate));
    }, [service]);

    const createTasks = useCallback(async (tasks: CreateTaskRequest[]) => {
        const toTask = (task: CreateTaskRequest): Partial<TaskRow> => {
            return {
                phase: task.phase,
                name: task.name,
                planned_start: task.planned_start,
                planned_end: task.planned_end,
                actual_progress: task.actual_progress,
            };
        }
        await service.createTasks(tasks.map(task => toTask(task)));
    }, [service]);

    const updateTask = useCallback(async (taskId: string, phase: string, name: string, actual_progress: number) => {
        const param: UpdateTaskRequest = { phase, name, actual_progress };
        await service.updateTask(taskId, param);
    }, [service]);

    const updateCell = useCallback(async (taskId: string, rowType, date: string, value: number): Promise<void> => {
        const param: UpdateCellRequest = { rowType, date, value };
        await service.updateCell(taskId, param);
    }, [service]);

    return {
        fetchTasks,
        createTasks,
        updateTask,
        updateCell,
    }
}