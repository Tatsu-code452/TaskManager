import { useMemo, useReducer, useState } from "react";
import { TaskModel } from "../../types/model";
import { EditTarget } from "../../types/types";
import { useProgressPageState } from "./useProgressPageState";

/**
 * 進捗管理画面の状態管理フック
 */
export const useProgressStates = () => {
    const { getMonthRange, createInitialState, createProgressReducer } = useProgressPageState();

    /**
     * 進捗管理画面状態
     */
    const [pageState, dispatchBase] = useReducer(
        createProgressReducer({ getMonthRange, createInitialState }),
        null,
        createInitialState
    );
    const [editTarget, setEditTarget] = useState<EditTarget | null>(null);

    const dispatch = useMemo(() => ({
        /** 初期状態を生成 */
        init: () => dispatchBase({ type: "INIT" }),
        /** タスク一覧設定 */
        setTasks: (tasks: TaskModel[]) =>
            dispatchBase({ type: "SET_TASKS", tasks }),
        /** 表示範囲fromを設定 */
        setFrom: (from: string) => dispatchBase({ type: "SET_FROM", from }),
        /** 表示範囲toを設定 */
        setTo: (to: string) => dispatchBase({ type: "SET_TO", to }),
        /** 基準日を設定 */
        setBaseDate: (baseDate: string) =>
            dispatchBase({ type: "SET_BASE_DATE", baseDate }),
    }), [dispatchBase]);

    return {
        pageState, editTarget,

        dispatch,

        setEditTarget,
    };
};