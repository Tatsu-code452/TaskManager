import { useCallback } from "react";
import { recalcTask } from "../../domain/calc";
import { formatDate } from "../../domain/dateUtils";
import { DisplayRange, ProgressPageState } from "../../types/model";
import { ProgressAction } from "../../types/types";

export const useProgressPageState = () => {

    /**
    * 基準日の月に対応する、開始・終了日を返す
    */
    const getMonthRange = useCallback((baseDate: string): DisplayRange => {
        const firstDate = baseDate.slice(0, 8) + "01";
        const firstDay = new Date(firstDate);
        firstDay.setMonth(firstDay.getMonth() + 1);
        firstDay.setDate(0);
        const lastDate = formatDate(firstDay);
        return { from: firstDate, to: lastDate };
    }, []);

    /**
     * 初期状態を生成
     */
    const createInitialState = useCallback((): ProgressPageState => {
        // const today = new Date();
        // const baseDate = formatDate(today);
        const baseDate = "2026-02-15";
        return {
            displayRange: getMonthRange(baseDate),
            baseDate,
            tasks: [],
        };
    }, [getMonthRange]);

    /**
     * 進捗管理画面状態更新Reducer
     * @param state 進捗管理画面状態
     * @param action アクション
     * @param helpers 内部用ヘルパー
     * @returns 進捗管理画面状態
     */
    const progressReducer = (
        state: ProgressPageState,
        action: ProgressAction,
        helpers: {
            createInitialState: () => ProgressPageState;
            getMonthRange: (baseDate: string) => DisplayRange;
        }
    ): ProgressPageState => {
        switch (action.type) {
            case "INIT":
                return helpers.createInitialState();

            case "SET_TASKS":
                return { ...state, tasks: action.tasks };

            case "SET_FROM":
                return {
                    ...state,
                    displayRange: { ...state.displayRange, from: action.from },
                };

            case "SET_TO":
                return {
                    ...state,
                    displayRange: { ...state.displayRange, to: action.to },
                };

            case "SET_BASE_DATE":
                return {
                    ...state,
                    baseDate: action.baseDate,
                    displayRange: helpers.getMonthRange(action.baseDate),
                    tasks: state.tasks.map(t => recalcTask(t, action.baseDate)),
                };

            default:
                return state;
        }
    };

    /**
     * 進捗管理画面状態更新Reducer作成
     * @param helpers 内部用ヘルパー
     * @returns 進捗管理画面状態更新Reducer
     */
    const createProgressReducer = (helpers: {
        createInitialState: () => ProgressPageState;
        getMonthRange: (baseDate: string) => DisplayRange;
    }) =>
        (state: ProgressPageState, action: ProgressAction): ProgressPageState =>
            progressReducer(state, action, helpers);

    return {
        getMonthRange, createInitialState, createProgressReducer,
    }
}