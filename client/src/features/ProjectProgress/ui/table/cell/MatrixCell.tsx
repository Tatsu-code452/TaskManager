import React from "react";
import { GanttParams } from "../../../types/contract";
import styles from "./styles.module.css";

interface MatrixCellProps {
    params: GanttParams;
    CellVisualRenderer: () => JSX.Element;
    CellDragHandleRenderer: (props: { params: GanttParams }) => JSX.Element;
    CellEditorRenderer: (props: { params: GanttParams }) => JSX.Element;
    CellInteractionRenderer: (props: { params: GanttParams }) => JSX.Element;
}

// import はそのまま
export const MatrixCell = ({
    params,
    CellVisualRenderer,
    CellDragHandleRenderer,
    CellEditorRenderer,
    CellInteractionRenderer,
}: MatrixCellProps) => {
    return (
        <div
            className={styles.matrix_cell}
            data-task-id={params.taskId}
            data-date={params.date}
            data-is-plan={params.isPlan}
        >
            <CellVisualRenderer />
            <CellDragHandleRenderer params={params} />
            <CellEditorRenderer params={params} />
            <CellInteractionRenderer params={params} />
        </div>
    );
};

export default React.memo(MatrixCell);
