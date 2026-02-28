import { useState } from "react";
import { recalcTask } from "../domain/calc";
import { formatDate } from "../domain/dateUtils";
import { ProgressPageState, TaskModel } from "../types/model";

export type EditTarget =
    | { type: "planCell"; taskIndex: number; date: string }
    | { type: "actualCell"; taskIndex: number; date: string }
    | { type: "actualProgress"; taskIndex: number };

/**
* 当月の開始・終了日を返す
*/
const getThisMonthRange = (baseDate: string) => {
    const firstDate = baseDate.slice(0, 8) + "01";
    const firstDay = new Date(firstDate);
    firstDay.setMonth(firstDay.getMonth() + 1);
    firstDay.setDate(0);
    const lastDate = formatDate(firstDay);
    return { from: firstDate, to: lastDate };
};

/**
 * 初期状態を生成
 */
const createInitialState = (): ProgressPageState => {
    const today = new Date();
    const baseDate = formatDate(today);
    return {
        displayRange: getThisMonthRange(baseDate),
        baseDate,
        tasks: [],
    };
};


/**
 * 進捗管理画面の状態管理フック
 */
export const useProgressStates = () => {
    /**
     * 進捗管理画面状態
     */
    const [progressPageState, setProgressPageState] = useState<ProgressPageState | null>(createInitialState());
    const [edit, setEdit] = useState<EditTarget | null>(null);

    /**
     * 初期状態を生成
     */
    const initState = () => setProgressPageState(createInitialState());

    /**
     * タスク一覧設定
     */
    const setTasks = (tasks: TaskModel[]) => {
        setProgressPageState(prev => ({
            ...prev, tasks: tasks,
        }))
    };

    /**
     * displayRange の部分更新
     */
    const updateDisplayRange = (patch: Partial<ProgressPageState["displayRange"]>) => {
        setProgressPageState(prev => ({
            ...prev!,
            displayRange: {
                ...prev!.displayRange,
                ...patch,
            },
        }));
    };

    /**
     * 表示範囲fromを設定
     */
    const setFrom = (value: string) => updateDisplayRange({ from: value });


    /**
     * 表示範囲toを設定
     */
    const setTo = (value: string) => updateDisplayRange({ to: value });

    /**
     * 基準日を設定
     */
    const setBaseDate = (value: string) => {
        setProgressPageState((prev) => ({
            ...prev,
            baseDate: value,
            tasks: prev.tasks.map((t) =>
                recalcTask(t, value),
            ),
        }))
    };

    return {
        state: progressPageState,
        edit,
        editState: {
            initState,
            setStateAll: setProgressPageState,
            setFrom, setTo,
            setBaseDate,
            setTasks,
        },
        setEdit,
    };
};