import React, { useEffect, useRef } from "react";
import { GanttParams } from "../../../types/contract";
import { MatrixCellController } from "../../../types/uiApi";
import styles from "./styles.module.css";

interface CellEditorProps {
    initialValue: number | null;
    params: GanttParams;
    onCellKeyDown: MatrixCellController["onCellKeyDown"];
    onCommit: MatrixCellController["onCommit"];
}

export const CellEditor = ({
    initialValue,
    params,
    onCellKeyDown,
    onCommit,
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
            onKeyDown={(e) => onCellKeyDown(params, e)}
            onBlur={(e) => onCommit(params, Number(e.target.value))}
        />
    );
};

export default React.memo(CellEditor);
