// src/hooks/controller/useGanttDragController.ts
import { taskApi } from "../../../../api/tauri/taskApi";
import { TaskPayload } from "../../../../types/db/task";
import { calcDiffDays, shiftDate } from "../../domain/utils/date";
import { GanttDrag } from "../../types/hooks";
import { TaskModel } from "../../types/model";
import { usePointerDrag } from "../handler/usePointerDrag";
import { useTooltip } from "../handler/useTooltip";


export const useGanttDragController = (
    projectId: string,
    tasks: TaskModel[],
    onInit: () => void,
) => {
    const taskMap = Object.fromEntries(tasks.map((t) => [t.id, t]));

    const drag = usePointerDrag<GanttDrag>();
    const tooltip = useTooltip();
    const apiTask = taskApi;

    const onPointerDown = (params: GanttDrag, e: React.PointerEvent) => {
        drag.onPointerDown(
            {
                taskId: params.taskId,
                date: params.date,
                isPlan: params.isPlan,
                mode: params.mode,
                edge: params.edge,
            },
            e,
        );
    };

    const handleDrop = async (dragData: GanttDrag, e: React.PointerEvent) => {
        const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
        if (!target) return;

        const cell = target.closest("td[data-task-id][data-date]") as HTMLElement | null;
        if (!cell) return;

        const dropDate = cell.dataset.date;
        if (!dropDate) return;

        const task = taskMap[dragData.taskId];
        if (!task) return;

        const diff = calcDiffDays(dragData.date, dropDate);
        let params: Partial<TaskPayload> = {};

        if (dragData.mode === "move") {
            params = dragData.isPlan
                ? {
                    planned_start: shiftDate(task.plan.start, diff),
                    planned_end: shiftDate(task.plan.end, diff),
                }
                : {
                    actual_start: shiftDate(task.actual.start, diff),
                    actual_end: shiftDate(task.actual.end, diff),
                };
        } else if (dragData.mode === "resize") {
            if (dragData.isPlan && dragData.edge === "start") {
                params = { planned_start: shiftDate(task.plan.start, diff) };
            } else if (dragData.isPlan && dragData.edge === "end") {
                params = { planned_end: shiftDate(task.plan.end, diff) };
            } else if (!dragData.isPlan && dragData.edge === "start") {
                params = { actual_start: shiftDate(task.actual.start, diff) };
            } else if (!dragData.isPlan && dragData.edge === "end") {
                params = { actual_end: shiftDate(task.actual.end, diff) };
            }
        }

        await apiTask.update({
            id: dragData.taskId,
            project_id: projectId,
            ...params,
        });

        onInit();
    };

    const onGlobalPointerMove = (e: React.PointerEvent) => {
        drag.onPointerMove((dragData, ev) => {
            tooltip.preview(dragData, ev);
        }, e);
    };

    const onGlobalPointerUp = (e: React.PointerEvent) => {
        drag.onPointerUp((dragData, ev) => {
            handleDrop(dragData, ev);
            tooltip.hide();
        }, e);
    };

    return {
        onPointerDown,
        onGlobalPointerMove,
        onGlobalPointerUp,
        tooltip,
    };
};