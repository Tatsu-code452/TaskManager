import React, { useCallback } from "react";
import { EditDispatch } from "../../types/contract";
import { Edge, GanttDrag, GanttParams } from "../../types/gantt";
import { EditTarget } from "../../types/types";
import { useCellEdit } from "../handler/useCellEdit";

export const useCellController = ({
    editDispatch,
    editTarget,
    params,
    initialValue,
    onLoadTasks,
    onPointerDown,
    onUpdateCurrentDate,
}: {
    editDispatch: EditDispatch,
    editTarget: EditTarget | null,
    params: GanttParams;
    initialValue: number | null;
    onLoadTasks: () => void;
    onPointerDown: (params: GanttDrag, e: React.PointerEvent) => void;
    onUpdateCurrentDate: (date: string) => void;
}) => {
    const { onStartEdit, onCommit, isEditing, focusCell, registerCellRef } =
        useCellEdit(
            editDispatch,
            editTarget,
            onLoadTasks,
        );

    const handleUpdateCurrentData = React.useCallback(() => {
        onUpdateCurrentDate(params.date);
    }, [params.date, onUpdateCurrentDate]);

    const handlePointerDown = useCallback(
        (mode: GanttDrag["mode"], edge: Edge | null, e: React.PointerEvent) => {
            onPointerDown({ ...params, mode, edge }, e);
        },
        [params, onPointerDown],
    );

    const handleStartEdit = useCallback(
        () => onStartEdit(params),
        [onStartEdit, params],
    );

    const handleCellBlur = React.useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            const raw = e.target.value;
            const value = raw === "" ? null : Number(raw);
            onCommit(params, value, initialValue);
        },
        [params, onCommit, initialValue],
    );

    const createRef = useCallback(
        (el: HTMLDivElement) => registerCellRef(params, el),
        [registerCellRef, params],
    );

    return {
        onCommit,
        handleUpdateCurrentData,
        handlePointerDown,
        handleStartEdit,
        handleCellBlur,
        createRef,
        focusCell,
        isEditing,
    }
}