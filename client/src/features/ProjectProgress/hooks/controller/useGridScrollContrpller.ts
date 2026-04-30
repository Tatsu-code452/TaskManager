import { useEffect, useRef } from "react";

export const useGridScrollContrpller = () => {
    const wbsRef = useRef<HTMLDivElement>(null);
    const ganttRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wbs = wbsRef.current;
        const gantt = ganttRef.current;
        if (!wbs || !gantt) return;

        let isSyncing = false;

        const sync = (from: HTMLElement, to: HTMLElement) => {
            if (isSyncing) return;
            isSyncing = true;
            to.scrollTop = from.scrollTop;
            requestAnimationFrame(() => {
                isSyncing = false;
            });
        };

        const onWbsScroll = () => sync(wbs, gantt);
        const onGanttScroll = () => sync(gantt, wbs);

        wbs.addEventListener("scroll", onWbsScroll);
        gantt.addEventListener("scroll", onGanttScroll);

        return () => {
            wbs.removeEventListener("scroll", onWbsScroll);
            gantt.removeEventListener("scroll", onGanttScroll);
        };
    }, []);

    return {
        wbsRef,
        ganttRef,
    }
}