import { useCallback, useMemo } from "react";
import { taskService } from "../../domain/taskService";
import { toTaskModel } from "../../domain/toTaskModel";
import { UpdateCellRequest, UpdateTaskRequest } from "../../types/api";
import { DisplayRange } from "../../types/model";

export const useTaskService = () => {
    const service = useMemo(() => taskService(), []);

    const fetchTasks = useCallback(async (displayRange: DisplayRange, baseDate: string) => {
        const tasks = await service.fetchTasks(displayRange);
        return tasks.map((task) => toTaskModel(task, baseDate));
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
        updateTask,
        updateCell,
    }
}