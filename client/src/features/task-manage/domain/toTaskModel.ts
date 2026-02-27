import { TaskApiResponse } from "../types/api";
import { TaskActual, TaskModel, TaskPlan } from "../types/model";
import { recalcTask } from "./calc";

/**
 * 進捗管理画面データ作成
 * @param api タスクAPIレスポンス
 * @param baseDate 基準日
 * @returns タスク1行データ
 */
export const toTaskModel = (api: TaskApiResponse, baseDate: string): TaskModel => {
    const plan: TaskPlan = {
        cells: api.planCells.map(c => ({ date: c.date, value: c.hours })),
        start: undefined,
        end: undefined,
        totalHours: 0,
        progress: 0,
    }

    const actual: TaskActual = {
        cells: api.actualCells.map(c => ({ date: c.date, value: c.hours })),
        start: undefined,
        end: undefined,
        totalHours: 0,
        progress: api.actual_progress,
    }

    const model: TaskModel = {
        id: api.id,
        phase: api.phase,
        name: api.name,

        plan,
        actual,
    };

    return recalcTask(model, baseDate);
};