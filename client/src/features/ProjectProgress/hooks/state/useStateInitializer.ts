import { useCallback } from "react";
import { DisplayRange, ProgressPageState } from "../../types/model";

export const useStateInitializer = () => {
    const formatDate = (d: Date): string => d.toISOString().slice(0, 10);

    /**
    * 基準日の月に対応する、開始・終了日を返す
    */
    const initDisplayRange = useCallback((baseDate: string): DisplayRange => {
        const baseDay = new Date(baseDate);
        baseDay.setMonth(baseDay.getMonth() - 1);
        baseDay.setDate(1);

        const firstDate = formatDate(baseDay);
        const firstDay = new Date(firstDate);
        firstDay.setMonth(firstDay.getMonth() + 3);
        firstDay.setDate(0);
        const lastDate = formatDate(firstDay);

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