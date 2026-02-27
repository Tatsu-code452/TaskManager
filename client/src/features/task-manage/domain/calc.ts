import { TaskActual, TaskMatrixValue, TaskModel, TaskPlan } from "../types/model";

/**
 * 工数合計を取得
 * @param xs 工数
 * @returns 工数合計
 */
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

/**
 * タスクの開始、終了日を計算
 * @param cells タスクのセルデータ
 * @returns タスク開始、終了日
 */
const calcStartEnd = (cells: TaskMatrixValue[]) => {
    const nonZero = cells.filter(c => c.value > 0).sort((a, b) => a.date.localeCompare(b.date));
    if (nonZero.length === 0) return { start: undefined, end: undefined };
    return {
        start: nonZero[0].date,
        end: nonZero[nonZero.length - 1].date,
    };
};

/**
 * タスク1行データの計画データ再計算
 * @param plan タスク1行データの計画データ
 * @param baseDate 基準日
 * @returns タスク1行データの計画データ（計画データ再計算後）
 */
export const recalcPlan = (plan: TaskPlan, baseDate: string): TaskPlan => {
    const total = sum(plan.cells.map(c => c.value));
    const cellsUntilBase = plan.cells.filter(c => c.date <= baseDate);
    const totalUntilBase = sum(cellsUntilBase.map(c => c.value));

    const progress = total === 0 ? 0 : Math.round((totalUntilBase / total) * 100);
    const { start, end } = calcStartEnd(plan.cells);

    return {
        ...plan,
        start: start,
        end: end,
        totalHours: total,
        progress: progress,
    };
};

/**
 * タスク1行データの実績データ再計算
 * @param actual タスク1行データの実績データ
 * @param baseDate 基準日
 * @returns タスク1行データの実績データ（実績データ再計算後）
 */
export const recalcActual = (actual: TaskActual, baseDate: string): TaskActual => {
    const total = sum(actual.cells.map(c => c.value));
    const cellsUntilBase = actual.cells.filter(c => c.date <= baseDate);

    const { start, end } = calcStartEnd(cellsUntilBase);

    const dispEnd = actual.progress === 100 ? end : undefined;

    return {
        ...actual,
        start: start,
        end: dispEnd,
        totalHours: total,
    };
};

/**
 * タスク1行データの再計算
 * @param task タスク1行データ
 * @param baseDate 基準日
 * @returns タスク1行データ（再計算後）
 */
export const recalcTask = (task: TaskModel, baseDate: string): TaskModel => {
    const plan = recalcPlan(task.plan, baseDate);
    const actual = recalcActual(task.actual, baseDate);
    return {
        ...task,
        plan: plan,
        actual: actual,
    };
};