import { taskActualCellApi } from "../../../../api/tauri/taskActualCellApi";
import { taskApi } from "../../../../api/tauri/taskApi";
import { taskPlanCellApi } from "../../../../api/tauri/taskPlanCellApi";
import { regenerateCells } from "../../domain/service/regenerateCells";
import { ProgressPageState } from "../../types/model";

export const useTaskCellDrag = (projectId: string, pageState: ProgressPageState, loadTasks: () => Promise<void>) => {
    const updateTaskActual = async (task, newStart, newEnd) => {
        await taskApi.update({
            id: task.id,
            project_id: projectId,
            actual_start: newStart,
            actual_end: newEnd,
        });

        await regenerateCells(
            taskActualCellApi.update,
            task.id,
            newStart,
            newEnd,
            task.actual.totalHours
        );
    }

    const updateTaskPlan = async (task, newStart, newEnd) => {
        await taskApi.update({
            id: task.id,
            project_id: projectId,
            planned_start: newStart,
            planned_end: newEnd,
        });

        await regenerateCells(
            taskPlanCellApi.update,
            task.id,
            newStart,
            newEnd,
            task.plan.totalHours
        );
    }

    const shiftDate = (date: string, diff: number) => {
        const d = new Date(date);
        d.setDate(d.getDate() + diff);
        return d.toISOString().slice(0, 10);
    };

    // -------------------------
    // バーのドラッグ移動（期間ごと移動）
    // -------------------------
    const onDragMove = async ({ taskId, fromDate, toDate, type }:
        {
            taskId: string;
            fromDate: string;
            toDate: string;
            type: string;
        }
    ) => {
        const task = pageState.tasks.find((t) => t.id === taskId);
        if (!task) return;

        const diff =
            (new Date(toDate).getTime() - new Date(fromDate).getTime()) /
            (1000 * 60 * 60 * 24);

        if (type === "planCell")
            await updateTaskPlan(
                task,
                shiftDate(task.plan.start, diff),
                shiftDate(task.plan.end, diff)
            );
        if (type === "actualCell")
            await updateTaskActual(
                task,
                shiftDate(task.actual.start, diff),
                shiftDate(task.actual.end, diff)
            );

        await loadTasks();
    };

    // -------------------------
    // バーの端ドラッグ（期間伸縮）
    // -------------------------
    const onDragResize = async ({ taskId, toDate, type, edge }:
        {
            taskId: string;
            toDate: string;
            type: string;
            edge: string;
        }
    ) => {
        const task = pageState.tasks.find((t) => t.id === taskId);
        if (!task) return;

        if (type === "planCell") {
            const newStart = edge === "start" ?
                toDate :
                task.plan.start;
            const newEnd = edge === "end" ?
                toDate :
                task.plan.end;
            await updateTaskPlan(task, newStart, newEnd);
        }

        if (type === "actualCell") {
            const newStart = edge === "start" ?
                toDate :
                task.actual.start;
            const newEnd = edge === "end" ?
                toDate :
                task.actual.end;

            await updateTaskActual(task, newStart, newEnd);
        }

        await loadTasks();
    };

    return {
        onDragMove, onDragResize
    }
}