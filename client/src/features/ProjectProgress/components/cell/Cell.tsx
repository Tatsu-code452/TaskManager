import React from "react";
import styles from "./styles.module.css";
import { CellParams } from "./types/type";

interface Props {
    params: CellParams;
    CellVisualRenderer: () => JSX.Element;
    CellDragHandleRenderer: () => JSX.Element;
    CellEditorRenderer: () => JSX.Element;
    CellInteractionRenderer: () => JSX.Element;
}

export const Cell = ({
    params,
    CellVisualRenderer,
    CellDragHandleRenderer,
    CellEditorRenderer,
    CellInteractionRenderer,
}: Props) => {
    return (
        <div
            className={styles.cell}
            data-task-id={params.taskId}
            data-date={params.date}
            data-is-plan={params.isPlan}
        >
            <CellVisualRenderer />
            <CellDragHandleRenderer />
            <CellEditorRenderer />
            <CellInteractionRenderer />
        </div>
    );
};

export default React.memo(Cell);
