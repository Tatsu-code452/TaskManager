import React, { useCallback } from "react";
import { CellDrag, CellParams, EditTarget } from "../../types/type";
import { useCellEdit } from "../handler/";

export const useCellController = ({
    startEdit,
    endEdit,
    onLoadTasks,
    onPointerDown,
    onUpdateCurrentDate,
}: {
    startEdit: (editTarget: EditTarget) => void;
    endEdit: () => void;
    onLoadTasks: () => void;
    onPointerDown: (params: CellDrag, e: React.PointerEvent) => void;
    onUpdateCurrentDate: (date: string) => void;
}) => {
    const { onStartEdit, onCommit, isEditing, focusCell, registerCellRef } =
        useCellEdit(
            startEdit,
            endEdit,
            onLoadTasks,
        );

    const handleUpdateCurrentData = React.useCallback((date: string) => {
        onUpdateCurrentDate(date);
    }, [onUpdateCurrentDate]);

    const handlePointerDown = useCallback(
        (params: CellDrag, e: React.PointerEvent) => {
            onPointerDown(params, e);
        },
        [onPointerDown],
    );

    const handleStartEdit = useCallback(
        (params: CellParams) => onStartEdit(params),
        [onStartEdit],
    );

    const handleCellBlur = React.useCallback(
        (params: CellParams, initialValue: number | null, e: React.FocusEvent<HTMLInputElement>) => {
            const raw = e.target.value;
            const value = raw === "" ? null : Number(raw);
            onCommit(params, value, initialValue);
        },
        [onCommit],
    );

    const createRef = useCallback(
        (params: CellParams, el: HTMLDivElement) => registerCellRef(params, el),
        [registerCellRef],
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