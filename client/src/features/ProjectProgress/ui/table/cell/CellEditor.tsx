import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";

interface CellEditorProps {
    initialValue: number | null;
    onCellKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const CellEditor = ({
    initialValue,
    onCellKeyDown,
    onBlur,
}: CellEditorProps) => {
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
