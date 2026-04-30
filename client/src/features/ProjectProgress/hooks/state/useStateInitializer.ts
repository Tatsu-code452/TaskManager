import { useCallback } from "react";
import { formatDate, shiftDate, toFirstDateOnMonth } from "../../domain/utils/date";
import { DisplayRange, ProgressPageState } from "../../types/model";

export const useStateInitializer = () => {

    /**
    * 基準日の月に対応する、開始・終了日を返す
    */
    const initDisplayRange = useCallback((baseDate: string): DisplayRange => {
        const baseDay = toFirstDateOnMonth(new Date(baseDate));
        const firstDate = formatDate(baseDay);
        const THREE_MONTHS = 90;
        const lastDate = shiftDate(firstDate, THREE_MONTHS);
        return { from: firstDate, to: lastDate };
    }, []);

    /**
     * 初期状態を生成
     */
    const initProgressPageState = useCallback((): ProgressPageState => {
        const baseDate = formatDate(new Date());

        return {
            displayRange: initDisplayRange(baseDate),
            baseDate,
            tasks: [],
        };
    }, [initDisplayRange]);

    return {
        initProgressPageState
    }
}