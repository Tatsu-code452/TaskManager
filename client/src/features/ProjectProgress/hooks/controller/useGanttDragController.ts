// src/hooks/controller/useGanttDragController.ts
import { taskApi } from "../../../../api/tauri/taskApi";
import { TaskPayload } from "../../../../types/db/task";
import { fetchTaskModelList } from "../../domain/repository/taskRepository";
import { calcDiffDays, shiftDate } from "../../domain/utils/date";
import { PageStateDispatch } from "../../types/contract";
import { GanttDrag } from "../../types/hooks";
import { TaskModel } from "../../types/model";
import { usePointerDrag } from "../handler/usePointerDrag";
import { useTooltip } from "../handler/useTooltip";


export const useGanttDragController = (
    projectId: string,
    tasks: TaskModel[],
    pageStateDispatch: PageStateDispatch,
) => {
    const taskMap = Object.fromEntries(tasks.map((t) => [t.id, t]));

    const drag = usePointerDrag<GanttDrag>();
    const tooltip = useTooltip();
    const apiTask = taskApi;

    const onPointerDown = (params: GanttDrag, e: React.PointerEvent) => {
        drag.onPointerDown(params, e);
    };


    const updateCurrentDate = (date: string) => {
        const dragState = drag.state.current;
        if (!dragState.dragging) return;
        if (!dragState.data) return;
        dragState.data.currentDate = date;
    };
    const onGlobalPointerMove = (e: React.PointerEvent) => {
        drag.onPointerMove((dragData, ev) => {
            const currentDate = tooltip.getDateFromPointer(ev);
            if (!currentDate) return;

            // ここで dragData に紐づける
            dragData.currentDate = currentDate;
            tooltip.preview(dragData, ev);
        }, e);
    };

    const onGlobalPointerUp = (e: React.PointerEvent) => {
        drag.onPointerUp((dragData) => {
            queueMicrotask(() => handleDrop(dragData));

            // tooltip の非表示は “次のフレーム” に回す
            requestAnimationFrame(() => {
                tooltip.hide();
            });
        }, e);
    };

    const handleDrop = async (dragData: GanttDrag) => {
        const dropDate = dragData.currentDate;
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

        pageStateDispatch.setTasks(await fetchTaskModelList(projectId));
    };

    return {
        onPointerDown,
        onGlobalPointerMove,
        onGlobalPointerUp,
        tooltip,
        updateCurrentDate,
    };
};