import { CellPos, ColumnDef } from "../types";

export function getCellPosFromPointer(
    e: PointerEvent,
    columns: ColumnDef[],
    rowHeight: number
): CellPos | null {
    const x = e.clientX;
    const y = e.clientY;

    // colIndex
    let col = 0;
    let acc = 0;
    for (const colDef of columns) {
        acc += colDef.width;
        if (x < acc) break;
        col++;
    }

    const row = Math.floor(y / rowHeight);

    return { row, col };
}
