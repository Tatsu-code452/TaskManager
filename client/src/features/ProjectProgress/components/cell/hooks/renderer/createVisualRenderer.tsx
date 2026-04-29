import { useCallback } from "react";
import CellVisual from "../../ui/CellVisual";

export const useVisualRenderer = () =>
    useCallback(
        (initialValue: number | null, className: string) => (
            <CellVisual value={initialValue} className={className} />
        ),
        [],
    );
