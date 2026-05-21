import React from "react";
import styles from "./GridTable.module.css";

export type Props = React.HTMLAttributes<HTMLDivElement> & {
    columns: string; // grid-template-columns をそのまま受け取る
    children?: React.ReactNode;
};

export const GridTable = React.memo(
    ({ columns, children, className, style, ...rest }: Props) => {
        return (
            <div
                className={`${styles.table} ${className ?? ""}`}
                style={{ gridTemplateColumns: columns, ...style }}
                {...rest}
            >
                {children}
            </div>
        );
    },
);
