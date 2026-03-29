import { ProgressPageState } from "../../types/model";
import { ProgressAction } from "../../types/types";

export const useStateReducer = () => {
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
            initProgressPageState: () => ProgressPageState;
        }
    ): ProgressPageState => {
        switch (action.type) {
            case "INIT":
                return helpers.initProgressPageState();

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
                    baseDate: action.baseDate
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
        initProgressPageState: () => ProgressPageState;
    }) =>
        (state: ProgressPageState, action: ProgressAction): ProgressPageState =>
            progressReducer(state, action, helpers);

    return {
        createProgressReducer,
    }
}