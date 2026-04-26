import { isCellDelayed } from "../../../domain/service/delay";
import { GanttParams } from "../../../types/contract";
import { TaskModel } from "../../../types/model";
import {
    GanttDragController,
    MatrixCellController,
} from "../../../types/uiApi";
import CellDragHandle from "./CellDragHandle";
import CellEditor from "./CellEditor";
import CellInteraction from "./CellInteraction";
import CellVisual from "./CellVisual";
import MatrixCell from "./MatrixCell";

export const createMatrixCellRenderers = ({
    params,
    task,
    baseDate,
    onPointerDown,
    registerCellRef,
    onStartEdit,
    isEditing,
    onCommit,
    onCellKeyDown,
    updateCurrentDate,
}: {
    params: GanttParams;
    task: TaskModel;
    baseDate: string;
    onPointerDown: GanttDragController["onPointerDown"];
    registerCellRef: MatrixCellController["registerCellRef"];
    onStartEdit: MatrixCellController["onStartEdit"];
    isEditing: MatrixCellController["isEditing"];
    onCommit: MatrixCellController["onCommit"];
    onCellKeyDown: MatrixCellController["onCellKeyDown"];
    updateCurrentDate: (date: string) => void; // ★ dragData を更新する関数
}) => {
    const { date, isPlan } = params;
    const timeline = isPlan ? task.plan : task.actual;
    const startDate = timeline.start;
    const endDate = timeline.end;
    const value: number | null = timeline.cells[date] ?? null;

    const cellVisualRenderer = () => (
        <CellVisual
            value={value}
            isPlan={isPlan}
            isToday={date === baseDate}
            isDelayed={isCellDelayed(task, date)}
        />
    );

    const cellDragHandleRenderer = ({ params }: { params: GanttParams }) => (
        <CellDragHandle
            params={params}
            isStart={date === startDate}
            isEnd={date === endDate}
            onPointerDown={onPointerDown}
            updateCurrentDate={updateCurrentDate}
        />
    );

    const cellEditorRenderer = ({ params }: { params: GanttParams }) =>
        isEditing(params) && (
            <CellEditor
                initialValue={value}
                params={params}
                onCellKeyDown={onCellKeyDown}
                onCommit={onCommit}
            />
        );

    const cellInteractionRenderer = ({ params }: { params: GanttParams }) => (
        <CellInteraction
            params={params}
            ref={(el) => registerCellRef(params, el)}
            onPointerDown={onPointerDown}
            onKeyDown={onCellKeyDown}
            onStartEdit={onStartEdit}
            updateCurrentDate={updateCurrentDate}
        />
    );

    const matrixCellRenderer = ({ params }: { params: GanttParams }) => (
        <MatrixCell
            params={params}
            CellVisualRenderer={cellVisualRenderer}
            CellDragHandleRenderer={() => cellDragHandleRenderer({ params })}
            CellEditorRenderer={() => cellEditorRenderer({ params })}
            CellInteractionRenderer={() => cellInteractionRenderer({ params })}
        />
    );

    return {
        cellVisualRenderer,
        cellDragHandleRenderer,
        cellEditorRenderer,
        cellInteractionRenderer,
        matrixCellRenderer,
    };
};

export type TableBodyRowHelperResult = ReturnType<
    typeof createMatrixCellRenderers
>;
