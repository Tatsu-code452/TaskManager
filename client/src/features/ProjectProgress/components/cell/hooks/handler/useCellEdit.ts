import { taskActualCellApi } from "../../../../../../api/tauri/taskActualCellApi";
import { taskPlanCellApi } from "../../../../../../api/tauri/taskPlanCellApi";
import { CellParams, EditTarget } from "../../types/type";
import { useCellRef } from "./useCellRef";

export const useCellEdit = (
    startEdit: (editTarget: EditTarget) => void,
    endEdit: () => void,
    onLoadTasks: () => void,
) => {
    const apiTaskPlan = taskPlanCellApi;
    const apiTaskActual = taskActualCellApi;
    const { registerCellRef, focusCell } = useCellRef();
    // -----------------------------
    // 編集開始・終了
    // -----------------------------
    const onStartEdit = (params: CellParams) => {
        startEdit({
            taskId: params.taskId,
            date: params.date,
            type: params.isPlan ? "planCell" : "actualCell",
        });
        focusCell(params);
    };

    const onCancelEdit = () => endEdit();

    const onCommit = async (params: CellParams, value: number | null, initValue: number | null) => {
        const { taskId, date, isPlan } = params;
        const targetApi = isPlan ? apiTaskPlan : apiTaskActual;

        onCancelEdit();

        if (value === null) {
            await targetApi.delete(taskId, date);
        } else {
            if (initValue === null) {
                await targetApi.create({ task_id: taskId, date, hours: value });
            } else {
                await targetApi.update(taskId, date, value);
            }
        }

        // TODO サーバ側でタスク工数合計再計算

        onLoadTasks();
    }

    // -----------------------------
    // 編集中判定
    // -----------------------------
    const isEditing = (editTarget: EditTarget | null, params: CellParams) => {
        const { taskId, date, isPlan } = params;

        if (!editTarget) return false;
        return (
            editTarget.taskId === taskId &&
            editTarget.date === date &&
            editTarget.type === (isPlan ? "planCell" : "actualCell")
        );
    };

    return {
        onStartEdit,
        onCancelEdit,
        onCommit,
        isEditing,
        focusCell,
        registerCellRef,
    };
}