import React from "react";
import styles from "./GridTable.module.css";
import { HeaderCell } from "./parts/HeaderCell";
import { ColumnDef, Style } from "./types";

const GridHeader = ({
    columns,
    gridColumns,
    headerRowStyle,
}: {
    columns: ColumnDef[];
    gridColumns: string;
    headerRowStyle?: Style;
}) => {
    const rowStyleObj = headerRowStyle;

    return (
        <div
            className={`${styles.grid_header} ${rowStyleObj?.className ?? ""}`}
            style={{ ...rowStyleObj?.style, gridTemplateColumns: gridColumns }}
        >
            {columns.map((col) => (
                <HeaderCell key={col.id} col={col} />
            ))}
        </div>
    );
};

export default React.memo(GridHeader);
