import React from "react";
import { useMatrixCellController } from "../../../hooks/controller/useMatrixCellController";
import { EditDispatch, GanttParams } from "../../../types/contract";
import { EditTarget } from "../../../types/types";
import styles from "./styles.module.css";

interface MatrixCellProps {
    dateList: string[];
    editDispatch: EditDispatch;
    editTarget: EditTarget;
    taskOrder: string[];

    params: GanttParams;
    CellVisualRenderer: () => JSX.Element;
    CellDragHandleRenderer: (props: { params: GanttParams }) => JSX.Element;
    CellEditorRenderer: (props: {
        params: GanttParams;
        onCellKeyDown: (params: GanttParams, e: React.KeyboardEvent) => void;
    }) => JSX.Element;
    CellInteractionRenderer: (props: {
        params: GanttParams;
        register: (el: HTMLElement | null) => void;
        onCellKeyDown: (params: GanttParams, e: React.KeyboardEvent) => void;
    }) => JSX.Element;
    DragTooltipRenderer: () => JSX.Element;
}

// import はそのまま
export const MatrixCell = ({
    dateList,
    editDispatch,
    editTarget,
    taskOrder,

    params,
    CellVisualRenderer,
    CellDragHandleRenderer,
    CellEditorRenderer,
    CellInteractionRenderer,
    DragTooltipRenderer,
}: MatrixCellProps) => {
    const { onCellKeyDown, registerCellRef, isEditing } =
        useMatrixCellController(editDispatch, editTarget, taskOrder, dateList);

    return (
        <td
            className={styles.matrix_cell}
            data-task-id={params.taskId}
            data-date={params.date}
            data-is-plan={params.isPlan}
        >
            <CellVisualRenderer />
            <CellDragHandleRenderer params={params} />

            {isEditing(params) && (
                <CellEditorRenderer
                    params={params}
                    onCellKeyDown={onCellKeyDown}
                />
            )}

            <CellInteractionRenderer
                params={params}
                register={(el) => registerCellRef(params, el)}
                onCellKeyDown={onCellKeyDown}
            />

            <DragTooltipRenderer />
        </td>
    );
};

export default React.memo(MatrixCell);
