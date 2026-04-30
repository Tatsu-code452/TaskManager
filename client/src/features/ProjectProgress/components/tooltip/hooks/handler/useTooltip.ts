import { useRef } from "react";
import { CellDrag } from "../../../cell";
import { TooltipState } from "../../types/type";

export const useTooltip = () => {
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const dataRef = useRef<TooltipState | null>(null);
    const preview = (drag: CellDrag, e: React.PointerEvent) => {
        dataRef.current = {
            from: drag.date,
            to: drag.currentDate ?? drag.date,
            mode: drag.mode,
            edge: drag.edge,
            x: e.clientX + 12,
            y: e.clientY + 12,
            visible: true,
        };

        const el = tooltipRef.current;
        if (!el) return;

        el.style.transform = `translate(${dataRef.current.x}px, ${dataRef.current.y}px)`;
        el.style.display = "block";
        el.textContent = `${drag.date} → ${drag.currentDate}`;
    };

    const hide = () => {
        const el = tooltipRef.current;
        if (el) el.style.display = "none";
    };

    return { state: tooltipRef, preview, hide };
};
