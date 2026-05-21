import React from "react";
import styles from "../GridTable.module.css";

export type Props = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
};

export const Row = React.memo(
    ({ children, className, style, ...rest }: Props) => {
        return (
            <div
                className={`${styles.row} ${className ?? ""}`}
                style={style}
                {...rest}
            >
                {children}
            </div>
        );
    },
);
