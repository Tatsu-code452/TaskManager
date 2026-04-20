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

export const createMatrixCellRenderers = ({
    params,
    value,
    task,
    baseDate,
    onPointerDown,
}: {
    params: GanttParams;
    value: number | null;
    task: TaskModel;
    baseDate: string;
    onPointerDown: GanttDragController["onPointerDown"];
}) => {
    const { date, isPlan } = params;

    const cellVisualRenderer = () => (
        <CellVisual
            value={value}
            isPlan={isPlan}
            isToday={date === baseDate}
            isDelayed={isCellDelayed(task, date)}
        />
    );

    const timeline = params.isPlan ? task.plan : task.actual;
    const startDate = timeline.start;
    const endDate = timeline.end;

    const cellDragHandleRenderer = ({ params }: { params: GanttParams }) => (
        <CellDragHandle
            params={params}
            isStart={date === startDate}
            isEnd={date === endDate}
            onPointerDown={onPointerDown}
        />
    );

    const cellEditorRenderer = ({
        params,
        onCellKeyDown,
    }: {
        params: GanttParams;
        onCellKeyDown: MatrixCellController["onCellKeyDown"];
    }) => (
        <CellEditor
            initialValue={value}
            params={params}
            onCellKeyDown={onCellKeyDown}
        />
    );

    const cellInteractionRenderer = ({
        params,
        register,
        onCellKeyDown,
    }: {
        params: GanttParams;
        register: (el: HTMLElement | null) => void;
        onCellKeyDown: MatrixCellController["onCellKeyDown"];
    }) => (
        <CellInteraction
            params={params}
            ref={register}
            onPointerDown={onPointerDown}
            onKeyDown={onCellKeyDown}
        />
    );

    return {
        cellVisualRenderer,
        cellDragHandleRenderer,
        cellEditorRenderer,
        cellInteractionRenderer,
    };
};

export type TableBodyRowHelperResult = ReturnType<
    typeof createMatrixCellRenderers
>;
