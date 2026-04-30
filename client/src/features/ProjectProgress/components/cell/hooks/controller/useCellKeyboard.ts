import { CellParams } from "../../types/type";
import { useKeyboardBind } from "../handler";

export const useCellKeyboard = (
    onCommit: (params: CellParams, value: number | null, initialValue: number | null) => Promise<void>,
    onFocusCell: (params: CellParams) => void,
    dates: string[],
) => {
    // -----------------------------
    // キーボード操作
    // -----------------------------
    const keyboard = useKeyboardBind();

    const onCellKeyDown = (params: CellParams, initialValue: number | null, e: React.KeyboardEvent) => {
        const allowInputKeys = [
            "Backspace",
            "Delete",
            "ArrowUp",
            "ArrowDown",
        ];

        // 数字 or input に任せるキーは return
        if (/^[0-9]$/.test(e.key) || allowInputKeys.includes(e.key)) {
            return;
        }

        e.preventDefault();

        keyboard.handleKeyDown({
            ...bindKeys(params, initialValue),
        }, e);
    };

    const bindKeys = (params: CellParams, initialValue: number | null) => ({
        Enter: () => move(params, "right"),
        Escape: () => onCommit(params, null, initialValue),
        Tab: () => move(params, "right"),
        "Shift+Tab": () => move(params, "left"),
        ArrowLeft: () => move(params, "left"),
        ArrowRight: () => move(params, "right"),
    });

    const move = (params: CellParams, direction: "left" | "right") => {
        const next = getNextCell(params, direction);
        if (next) onFocusCell(next);
    }

    const getNextCell = (
        params: CellParams,
        direction: "left" | "right"
    ): CellParams | null => {
        const dateIndex = dates.indexOf(params.date);
        const nextDateIndex =
            direction === "left" ? dateIndex - 1 : dateIndex + 1;
        if (nextDateIndex < 0 || dates.length <= nextDateIndex) return null;

        return { ...params, date: dates[nextDateIndex] };
    };

    return {
        onCellKeyDown,
    }
}