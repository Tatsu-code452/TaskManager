import React from "react";
import { isCellDelayed } from "../../../domain/service/delay";
import { useCellController } from "../../../hooks/controller/useCellController";
import { useCellKeyboard as useCellKeyboardController } from "../../../hooks/controller/useCellKeyboard";
import { EditDispatch } from "../../../types/contract";
import { GanttParams } from "../../../types/gantt";
import { TaskModel } from "../../../types/model";
import { EditTarget } from "../../../types/types";
import { GanttDragController } from "../../../types/uiApi";
import CellDragHandle from "./CellDragHandle";
import CellEditor from "./CellEditor";
import CellInteraction from "./CellInteraction";
import CellVisual from "./CellVisual";
import GanttCell from "./GanttCell";

export const CreateCellRenderers = ({
    params,
    task,
    baseDate,
    dates,
    editDispatch,
    editTarget,
    onPointerDown,
    onUpdateCurrentDate,
    onLoadTasks,
}: {
    params: GanttParams;
    task: TaskModel;
    baseDate: string;
    dates: string[];
    editDispatch: EditDispatch;
    editTarget: EditTarget | null;
    onPointerDown: GanttDragController["onPointerDown"];
    onUpdateCurrentDate: GanttDragController["updateCurrentDate"];
    onLoadTasks: () => void;
}) => {
    const { date, isPlan } = params;
    const delay = isCellDelayed(task, date);
    const timeline = isPlan ? task.plan : task.actual;
    const initialValue: number | null = timeline.cells[date] ?? null;
    const startDate = timeline.start;
    const endDate = timeline.end;

    const {
        onCommit,
        handleUpdateCurrentData,
        handlePointerDown,
        handleStartEdit,
        handleCellBlur,
        createRef,
        focusCell,
        isEditing,
    } = useCellController({
        editDispatch,
        editTarget,
        params,
        initialValue,
        onLoadTasks,
        onPointerDown,
        onUpdateCurrentDate,
    });

    const { onCellKeyDown } = useCellKeyboardController(
        onCommit,
        focusCell,
        dates,
        initialValue,
    );

    const cellVisualRenderer = React.useCallback(
        () => (
            <CellVisual
                value={initialValue}
                isPlan={isPlan}
                isToday={date === baseDate}
                isDelayed={delay}
            />
        ),
        [baseDate, date, isPlan, delay, initialValue],
    );

    const cellDragHandleRenderer = React.useCallback(
        () => (
            <CellDragHandle
                isStart={date === startDate}
                isEnd={date === endDate}
                onPointerDown={(edge, e) =>
                    handlePointerDown("resize", edge, e)
                }
                onPointerEnter={handleUpdateCurrentData}
            />
        ),
        [date, startDate, endDate, handlePointerDown, handleUpdateCurrentData],
    );

    const cellEditorRenderer = React.useCallback(
        () =>
            isEditing(params) && (
                <CellEditor
                    initialValue={initialValue}
                    onCellKeyDown={(e) => onCellKeyDown(params, e)}
                    onBlur={handleCellBlur}
                />
            ),
        [params, isEditing, onCellKeyDown, handleCellBlur, initialValue],
    );

    const cellInteractionRenderer = React.useCallback(
        ({ date }: { date: string }) => (
            <CellInteraction
                date={date}
                ref={createRef}
                onPointerDown={(e) => handlePointerDown("move", null, e)}
                onClick={handleStartEdit}
                onPointerEnter={handleUpdateCurrentData}
            />
        ),
        [
            handlePointerDown,
            handleStartEdit,
            createRef,
            handleUpdateCurrentData,
        ],
    );

    const matrixCellRenderer = React.useCallback(
        ({ params }: { params: GanttParams }) => (
            <GanttCell
                params={params}
                CellVisualRenderer={cellVisualRenderer}
                CellDragHandleRenderer={cellDragHandleRenderer}
                CellEditorRenderer={cellEditorRenderer}
                CellInteractionRenderer={cellInteractionRenderer}
            />
        ),
        [
            cellDragHandleRenderer,
            cellEditorRenderer,
            cellInteractionRenderer,
            cellVisualRenderer,
        ],
    );

    return {
        matrixCellRenderer,
    };
};
