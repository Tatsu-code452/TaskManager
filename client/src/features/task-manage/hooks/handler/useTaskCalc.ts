import { useCallback } from "react";
import { eachDay } from "../../domain/dateUtils";
import { DisplayRange } from "../../types/model";

export const useTaskCalc = () => {
    const calcDates = useCallback(
        (range: DisplayRange) => eachDay(range.from, range.to), []
    );

    return {
        calcDates
    }
}