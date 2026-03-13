import { EditTarget } from "../../types/types";

export const useCellKeyboardNavigation = () => {
    const isStartEdit = (e: React.KeyboardEvent) => {
        if (e.key === "Process") return false; // IME対策
        return (
            e.key === "F2" ||
            (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey)
        );
    };

    const buildFlatCellList = (
        tasks: { id: string }[],
        dates: string[]
    ) => {
        const list: Array<EditTarget> = [];

        for (const task of tasks) {
            // planRow
            for (const d of dates) {
                list.push({ type: "planCell", taskIndex: task.id, date: d });
            }

            // actualRow
            for (const d of dates) {
                list.push({ type: "actualCell", taskIndex: task.id, date: d });
            }

            // actualProgress（actualRow の最後）
            list.push({ type: "actualProgress", taskIndex: task.id });
        }

        return list;
    };

    const getNextCell = (
        e: React.KeyboardEvent,
        current: EditTarget,
        tasks: { id: string }[],
        dates: string[]
    ): EditTarget | null => {
        const flat = buildFlatCellList(tasks, dates);

        const index = flat.findIndex((c) => {
            if (c.type !== current.type) return false;
            if (c.taskIndex !== current.taskIndex) return false;
            if ("date" in c && "date" in current) return c.date === current.date;
            return !("date" in c) && !("date" in current);
        });

        if (index === -1) return null;

        // Tab / Shift+Tab
        if (e.key === "Tab") {
            const nextIndex = e.shiftKey ? index - 1 : index + 1;
            return flat[nextIndex] ?? null;
        }

        // ArrowRight / ArrowLeft（date を持つセルのみ）
        if (current.type === "planCell" || current.type === "actualCell") {
            const idx = dates.indexOf(current.date);

            if (e.key === "ArrowRight") {
                const nextDate = dates[idx + 1];
                if (nextDate) return { ...current, date: nextDate };
            }

            if (e.key === "ArrowLeft") {
                const prevDate = dates[idx - 1];
                if (prevDate) return { ...current, date: prevDate };
            }
        }

        return null;
    };
    return { isStartEdit, getNextCell };
};