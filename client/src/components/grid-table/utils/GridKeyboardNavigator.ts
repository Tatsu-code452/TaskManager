import { CellPos } from "../types";

export const GridKeyboardNavigator = {
    move(pos: CellPos, key: string): CellPos {
        switch (key) {
            case "ArrowLeft": return { row: pos.row, col: pos.col - 1 };
            case "ArrowRight": return { row: pos.row, col: pos.col + 1 };
            case "ArrowUp": return { row: pos.row - 1, col: pos.col };
            case "ArrowDown": return { row: pos.row + 1, col: pos.col };
            default: return pos;
        }
    },
};
