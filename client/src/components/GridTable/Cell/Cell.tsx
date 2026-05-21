import React from "react";
import styles from "../GridTable.module.css";

export type CellProps = React.HTMLAttributes<HTMLDivElement> & {
    type?: "header" | "body";
    children?: React.ReactNode;
};

export const Cell = React.memo(
    (
        { type = "body", children, className, style, ...rest }: CellProps,
        cellProps?: React.HTMLAttributes<HTMLDivElement>,
    ) => {
        return (
            <div
                className={`${styles.cell} ${styles[type]} ${className ?? ""}`}
                style={style}
                {...rest}
                {...cellProps}
            >
                {children}
            </div>
        );
    },
);
