import React from "react";
import {
    GanttParams
} from "../../../types/gantt";
import styles from "./styles.module.css";

interface Props {
    params: GanttParams;
    CellVisualRenderer: () => JSX.Element;
    CellDragHandleRenderer: () => JSX.Element;
    CellEditorRenderer: () => JSX.Element;
    CellInteractionRenderer: (props: { date: string }) => JSX.Element;
}

export const GanttCell = ({
    params,
    CellVisualRenderer,
    CellDragHandleRenderer,
    CellEditorRenderer,
    CellInteractionRenderer,
}: Props) => {
    return (
        <div
            className={styles.matrix_cell}
            data-task-id={params.taskId}
            data-date={params.date}
            data-is-plan={params.isPlan}
        >
            <CellVisualRenderer />
            <CellDragHandleRenderer />
            <CellEditorRenderer />
            <CellInteractionRenderer date={params.date} />
        </div>
    );
};

export default React.memo(GanttCell);
