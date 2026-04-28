// src/hooks/controller/useGanttDragController.ts
import { useCallback, useMemo } from "react";
import { taskApi } from "../../../../api/tauri/taskApi";
import { TaskPayload } from "../../../../types/db/task";
import { calcDiffDays, shiftDate } from "../../domain/utils/date";
import { GanttDrag } from "../../types/gantt";
import { TaskModel } from "../../types/model";
import { usePointerDrag } from "../handler/usePointerDrag";
import { useTooltip } from "../handler/useTooltip";


export const useGanttDragController = (
    projectId: string,
    tasks: TaskModel[],
    onLoadTasks: () => Promise<void>,
) => {
    const taskMap = useMemo(
        () => Object.fromEntries(tasks.map((t) => [t.id, t])),
        [tasks],
    );

    const handleDrop = useCallback(
        async (dragData: GanttDrag) => {
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

            await taskApi.update({
                id: dragData.taskId,
                project_id: projectId,
                ...params,
            });

            await onLoadTasks();
        },
        [taskMap, projectId, onLoadTasks],
    );

    const drag = usePointerDrag<GanttDrag>();
    const tooltip = useTooltip();

    const onPointerDown = useCallback(
        (params: GanttDrag, e: React.PointerEvent) => {
            drag.onPointerDown(params, e);
        },
        [drag],
    );

    const onUpdateCurrentDate = useCallback((date: string) => {
        const s = drag.state.current;
        if (!s.dragging || !s.data) return;
        s.data.currentDate = date;
    }, [drag]);

    const onGlobalPointerMove = useCallback(
        (e: React.PointerEvent) => {
            drag.onPointerMove((dragData, ev) => {
                // currentDate はセル側で更新済み
                tooltip.preview(dragData, ev);
            }, e);
        },
        [drag, tooltip],
    );

    const onGlobalPointerUp = useCallback(
        (e: React.PointerEvent) => {
            drag.onPointerUp((dragData) => {
                queueMicrotask(() => handleDrop(dragData));

                requestAnimationFrame(() => {
                    tooltip.hide();
                });
            }, e);
        },
        [drag, tooltip, handleDrop],
    );


    return {
        onPointerDown,
        onGlobalPointerMove,
        onGlobalPointerUp,
        tooltip,
        onUpdateCurrentDate,
    };
};