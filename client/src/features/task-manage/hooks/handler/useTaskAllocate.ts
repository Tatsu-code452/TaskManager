import { useCallback } from "react";
import { allocate } from "../../domain/allocate";

export const useTaskAllocate = () => {
    const { allocatePlannedHours } = allocate();

    return {
        allocatePlannedHours: useCallback(allocatePlannedHours, [allocatePlannedHours]),
    }
}