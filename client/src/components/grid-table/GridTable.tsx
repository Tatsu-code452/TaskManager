import React from "react";
import GridBody from "./GridBody";
import GridHeader from "./GridHeader";
import styles from "./GridTable.module.css";
import { GridTableProps } from "./types";

export const GridTable = (props: GridTableProps) => {
    const {
        columns,
        rowCount,
        cellRenderer,
        onKeyDown,
        onPointerDown,
        tableStyle,
        headerRowStyle,
        bodyRowStyle,
    } = props;

    const gridColumns = columns.map((c) => `${c.width}px`).join(" ");

    return (
        <div
            className={`${styles.grid_table} ${tableStyle?.className ?? ""}`}
            style={tableStyle?.style}
        >
            <GridHeader
                columns={columns}
                gridColumns={gridColumns}
                headerRowStyle={headerRowStyle}
            />

            <GridBody
                columns={columns}
                rowCount={rowCount}
                cellRenderer={cellRenderer}
                gridColumns={gridColumns}
                onKeyDown={onKeyDown}
                onPointerDown={onPointerDown}
                bodyRowStyle={bodyRowStyle}
            />
        </div>
    );
};

export default React.memo(GridTable);
