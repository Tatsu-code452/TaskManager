import React from "react";
import styles from "../GridTable.module.css";
import { CellPos, CellRenderer, ColumnDef } from "../types";
import { GridFocusManager } from "../utils/GridFocusManager";

export const BodyCell = ({
    col,
    pos,
    focusManager,
    cellRenderer,
    onKeyDown,
    onPointerDown,
}: {
    col: ColumnDef;
    pos: CellPos;
    focusManager: GridFocusManager;
    cellRenderer: CellRenderer;
    onKeyDown?: (pos: CellPos, e: React.KeyboardEvent) => void;
    onPointerDown?: (pos: CellPos, e: React.PointerEvent) => void;
}) => {
    const styleObj =
        typeof col.bodyCellStyle === "function"
            ? col.bodyCellStyle(pos)
            : col.bodyCellStyle;
    const cell = cellRenderer(pos);
    if (cell === "") return;
    return (
        <div
            className={`${styles.grid_cell} ${styleObj?.className ?? ""}`}
            style={styleObj?.style}
            tabIndex={0}
            ref={(el) => focusManager.register(pos, el)}
            onKeyDown={(e) => onKeyDown?.(pos, e)}
            onPointerDown={(e) => onPointerDown?.(pos, e)}
        >
            {cell}
        </div>
    );
};

export default React.memo(BodyCell);
