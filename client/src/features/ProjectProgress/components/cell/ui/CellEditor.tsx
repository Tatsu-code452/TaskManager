import React, { useEffect, useRef } from "react";
import styles from "../styles.module.css";

export const CellEditor = ({
    initialValue,
    onCellKeyDown,
    onBlur,
}: {
    initialValue: number | null;
    onCellKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}) => {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        ref.current?.focus();
        ref.current?.select();
    }, []);

    return (
        <input
            ref={ref}
            type="number"
            className={styles.cell_editor}
            defaultValue={initialValue ?? ""}
            onKeyDown={onCellKeyDown}
            onBlur={onBlur}
        />
    );
};

export default React.memo(CellEditor);
