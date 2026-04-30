import React, { useRef } from "react";
import styles from "./GridTable.module.css";
import { BodyCell } from "./parts/BodyCell";
import { CellPos, CellRenderer, ColumnDef, Style } from "./types";
import { GridFocusManager } from "./utils/GridFocusManager";

const GridBody = ({
    columns,
    rowCount,
    cellRenderer,
    gridColumns,
    onKeyDown,
    onPointerDown,
    bodyRowStyle,
}: {
    columns: ColumnDef[];
    rowCount: number;
    cellRenderer: CellRenderer;
    gridColumns: string;
    onKeyDown?: (pos: CellPos, e: React.KeyboardEvent) => void;
    onPointerDown?: (pos: CellPos, e: React.PointerEvent) => void;
    bodyRowStyle?: Style | ((row: number) => Style);
}) => {
    const focusManager = useRef(new GridFocusManager()).current;
    // const leafColumns = useMemo(() => flattenColumns(columns), [columns]);

    const CreateCell = ({ col, pos }: { col: ColumnDef; pos: CellPos }) => (
        <BodyCell
            col={col}
            pos={pos}
            focusManager={focusManager}
            cellRenderer={cellRenderer}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
        />
    );

    const CreateRow = ({ row }: { row: number }) => {
        const rowStyleObj =
            typeof bodyRowStyle === "function"
                ? bodyRowStyle(row)
                : bodyRowStyle;

        return (
            <div
                className={`${styles.grid_row} ${rowStyleObj?.className ?? ""}`}
                style={{
                    ...rowStyleObj?.style,
                    gridTemplateColumns: gridColumns,
                }}
            >
                {/* {leafColumns.map((col, colIndex) => ( */}
                {columns.map((col, colIndex) => (
                    <CreateCell
                        key={`${row}-${colIndex}-CreateCell`}
                        col={col}
                        pos={{ row, col: colIndex }}
                    />
                ))}
            </div>
        );
    };

    return (
        <div>
            <div className={styles.grid_body}>
                {Array.from({ length: rowCount }).map((_, row) => (
                    <CreateRow key={`${row}-CreateRow`} row={row} />
                ))}
            </div>
        </div>
    );
};

export default React.memo(GridBody);
