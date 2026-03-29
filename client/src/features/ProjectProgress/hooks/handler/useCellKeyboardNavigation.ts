import { EditTarget } from "../../types/types";

export const useCellKeyboardNavigation = () => {
    // 編集開始入力
    const isStartEdit = (e: React.KeyboardEvent) => {
        if (e.key === "Process") return false; // IME対策
        return (
            e.key === "F2" ||
            (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey)
        );
    };

    //タブ移動用先を示すリスト作成
    const buildFlatCellList = (
        tasks: { id: string }[],
        dates: string[]
    ) => {
        const list: EditTarget[] = [];

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
        // 移動先リスト取得
        const flat = buildFlatCellList(tasks, dates);

        // 現在の位置を探索
        const index = flat.findIndex((c) => {
            // 現在セルが工数セルかどうか、dateの有無で確認
            const isMatrix = ("date" in c) && ("date" in current);

            if ((c.type === current.type) &&
                (c.taskIndex !== current.taskIndex)) {
                if ((!isMatrix) ||
                    (isMatrix && (c.date === current.date))) {
                    return true;
                }
            }

            return false;
        });

        if (index === -1) return null;

        // Tab / Shift+Tab
        if (e.key === "Tab") {
            const nextIndex = e.shiftKey ? index - 1 : index + 1;
            return flat[nextIndex] ?? null;
        }

        // ArrowRight / ArrowLeft（date を持つセルのみ）
        if (current.type === "planCell" || current.type === "actualCell") {
            if (e.key === "ArrowRight") {
                return flat[index + 1] ?? null;
            }

            if (e.key === "ArrowLeft") {
                return flat[index - 1] ?? null;
            }
        }

        return null;
    };
    return { isStartEdit, getNextCell };
};