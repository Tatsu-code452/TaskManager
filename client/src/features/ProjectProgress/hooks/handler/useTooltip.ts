import { useState } from "react";
import { GanttDrag } from "../../types/hooks";
import { TooltipState } from "../../types/uiApi";

export const useTooltip = () => {
    const [tooltip, setTooltip] = useState<TooltipState>(null);

    const preview = (drag: GanttDrag, e: React.PointerEvent) => {
        const currentDate = getDateFromPointer(e);
        if (!currentDate) return;

        setTooltip({
            from: drag.date,
            to: currentDate,
            mode: drag.mode,
            edge: drag.edge,
            x: e.clientX + 12,
            y: e.clientY + 12,
            visible: true
        });
    };

    const getDateFromPointer = (e: React.PointerEvent): string | null => {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const cell = el?.closest("td[data-date]") as HTMLElement | null;
        return cell?.dataset.date ?? null;
    };

    const hide = () => {
        setTooltip((t) => ({
            ...t,
            visible: false,
        }));
    };

    return {
        state: tooltip,
        preview, hide
    }
}