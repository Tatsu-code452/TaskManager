import React from "react";
import styles from "../GridTable.module.css";
import { ColumnDef } from "../types";

export const HeaderCell = ({ col }: { col: ColumnDef }) => {
    const hasChildren = col.children && col.children.length > 0;
    const styleObj = col.headerCellStyle;

    return (
        <div
            className={`${styles.grid_cell} ${styleObj?.className ?? ""}`}
            style={styleObj?.style}
        >
            {col.header}

            {hasChildren && (
                <>
                    {col.children.map((child, index) => (
                        <HeaderCell key={`${child.id}-${index}`} col={child} />
                    ))}
                </>
            )}
        </div>
    );
};

export default React.memo(HeaderCell);
