import { useRef } from "react";
import { taskActualCellApi } from "../../../../api/tauri/taskActualCellApi";
import { taskPlanCellApi } from "../../../../api/tauri/taskPlanCellApi";
import { EditDispatch, GanttParams } from "../../types/contract";
import { EditTarget } from "../../types/types";
import { keyboardBind } from "../handler/keyboardBind";

export const useMatrixCellController = (
    editDispatch: EditDispatch,
    editTarget: EditTarget | null,
    taskOrder: string[],
    dateList: string[],
) => {
    const apiTaskPlan = taskPlanCellApi;
    const apiTaskActual = taskActualCellApi;

    // -----------------------------
    // 編集開始・終了
    // -----------------------------
    const onStartEdit = (params: GanttParams) => {
        editDispatch.startEdit({
            taskIndex: params.taskId,
            date: params.date,
            type: params.isPlan ? "planCell" : "actualCell",
        });
        focusCell(params);
    };

    const onCancelEdit = () => editDispatch.endEdit();

    const onCommit = async (params: GanttParams, value: number | null) => {
        const { taskId, date, isPlan } = params;
        const targetApi = isPlan ? apiTaskPlan : apiTaskActual;

        if (value === null) {
            await targetApi.delete(taskId, date);
        } else {
            await targetApi.update(taskId, date, value);
        }
        // TODO サーバ側でタスク工数合計再計算
    }


    // -----------------------------
    // 編集中判定
    // -----------------------------
    const isEditing = (params: GanttParams) => {
        const { taskId, date, isPlan } = params;

        if (!editTarget) return false;
        if (editTarget.type === "actualProgress") return false;
        return (
            editTarget.taskIndex === taskId &&
            editTarget.date === date &&
            editTarget.type === (isPlan ? "planCell" : "actualCell")
        );
    };

    // -----------------------------
    // キーボード操作
    // -----------------------------
    const onCellKeyDown = (params: GanttParams, e: React.KeyboardEvent) => {
        // 編集中は CellEditor が処理するので無効化
        if (isEditing(params)) return;

        e.preventDefault();

        const kb = keyboardBind({
            ...editKeys(params),
            ...moveKeys(params),
        });
        kb.handleKeyDown(e);
    };

    const editKeys = (params: GanttParams) => ({
        Enter: () => onStartEdit(params),
        Delete: () => onCommit(params, null),
        Backspace: () => onCommit(params, null),
    });

    const moveKeys = (params: GanttParams) => ({
        Tab: () => move(params, "right"),
        "Shift+Tab": () => move(params, "left"),
        ArrowLeft: () => move(params, "left"),
        ArrowRight: () => move(params, "right"),
        ArrowUp: () => move(params, "up"),
        ArrowDown: () => move(params, "down"),
    });

    const move = (params: GanttParams, direction: "left" | "right" | "up" | "down") => {
        const next = getNextCell(params, direction);
        if (next) focusCell(next);
    }

    const getNextCell = (
        params: GanttParams,
        direction: "left" | "right" | "up" | "down"
    ): GanttParams | null => {
        const { taskId, date, isPlan } = params;

        if (direction === "left" || direction === "right") {
            const dateIndex = dateList.indexOf(date);
            const nextDateIndex =
                direction === "left" ? dateIndex - 1 : dateIndex + 1;

            if (nextDateIndex < 0 || dateList.length <= nextDateIndex) return null;
            return { taskId, date: dateList[nextDateIndex], isPlan };
        }

        if (direction === "up" || direction === "down") {
            const taskIndex = taskOrder.indexOf(taskId);
            const rowIndex = taskIndex * 2 + (isPlan ? 0 : 1);
            const nextRowIndex = direction === "up" ? rowIndex - 1 : rowIndex + 1;

            if (nextRowIndex < 0 || nextRowIndex >= taskOrder.length * 2) return null;

            const nextTaskIndex = Math.floor(nextRowIndex / 2);
            const nextIsPlan = nextRowIndex % 2 === 0;

            return {
                taskId: taskOrder[nextTaskIndex],
                date,
                isPlan: nextIsPlan,
            };
        }

        return null;
    };

    const cellRefMap = useRef<Record<string, HTMLElement>>({});

    const registerCellRef = (
        params: GanttParams,
        el: HTMLElement | null,
    ) => {
        const key = `${params.taskId}-${params.date}-${params.isPlan}`;
        if (el) {
            cellRefMap.current[key] = el;
        }
    };

    const focusCell = (params: GanttParams) => {
        const { taskId, date, isPlan } = params;
        const key = `${taskId}-${date}-${isPlan}`;
        const el = cellRefMap.current[key];
        el?.focus();
    };

    return {
        onStartEdit,
        onCommit,
        onCancelEdit,
        onCellKeyDown,
        registerCellRef,
        isEditing,
    };
};
