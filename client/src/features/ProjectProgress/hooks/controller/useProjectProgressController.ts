import { useCallback, useMemo } from "react";

import { taskActualCellApi } from "../../../../api/tauri/taskActualCellApi";
import { taskApi } from "../../../../api/tauri/taskApi";
import { taskPlanCellApi } from "../../../../api/tauri/taskPlanCellApi";
import { calcCriticalPath } from "../../domain/calcCriticalPath";
import { fetchTaskModelList } from "../../domain/fetchTaskModelList";
import { regenerateActualCells } from "../../domain/regenerateActualCells";
import { regeneratePlanCells } from "../../domain/regeneratePlanCells";
import { shiftDate } from "../../domain/shiftDate";
import { useCellKeyboardNavigation } from "../handler/useCellKeyboardNavigation";
import { useProjectProgressStates } from "../state/useProjectProgressStates";


export const useProjectProgressController = (projectId: string) => {
    const { pageState, editTarget, dispatch, setEditTarget, collapsedPhases, setCollapsedPhases } =
        useProjectProgressStates();

    const { isStartEdit, getNextCell } = useCellKeyboardNavigation();

    // -------------------------
    // TaskModel[] を読み込む
    // -------------------------
    const loadTasks = useCallback(async () => {
        const tasks = await fetchTaskModelList(projectId);

        const criticalIds = calcCriticalPath(tasks);
        const withCritical = tasks.map((t) => ({
            ...t,
            isCritical: criticalIds.has(t.id),
        }));

        dispatch.setTasks(withCritical);
    }, [projectId, dispatch]);

    // -------------------------
    // 日付レンジ生成
    // -------------------------
    const dates = useMemo(() => {
        const from = new Date(pageState.displayRange.from);
        const to = new Date(pageState.displayRange.to);

        const list: string[] = [];
        const cur = new Date(from);

        while (cur <= to) {
            list.push(cur.toISOString().slice(0, 10));
            cur.setDate(cur.getDate() + 1);
        }

        return list;
    }, [pageState.displayRange]);

    // -------------------------
    // セル編集（計画・実績・進捗）
    // -------------------------
    const handleChangeCell = async (target, newValue) => {
        const { type, taskIndex, date } = target;

        try {
            if (type === "planCell") {
                await taskPlanCellApi.update(taskIndex, date, newValue)
            }

            if (type === "actualCell") {
                await taskActualCellApi.update(taskIndex, date, newValue)
            }

            if (type === "actualProgress") {
                await taskApi.update({ id: taskIndex, project_id: projectId, progress_rate: newValue });
            }

            await loadTasks();
        } catch (e) {
            console.error("update error", e);
        }
    };

    // -------------------------
    // キーボード移動
    // -------------------------
    const handleKeyDownCell = (e) => {
        const td = e.currentTarget;
        const { type, taskIndex, date } = td.dataset;

        if (!type) return;

        const editType = type;

        if (isStartEdit(e)) {
            e.preventDefault();
            setEditTarget({
                type: editType,
                taskIndex,
                date,
                pressedKey: e.key,
            });
            return;
        }

        const next = getNextCell(
            e,
            { type: editType, taskIndex, date },
            pageState.tasks,
            dates
        );

        if (next) {
            e.preventDefault();
            setEditTarget(next);
        }
    };

    // -------------------------
    // バーのドラッグ移動（期間ごと移動）
    // -------------------------
    const onDragMove = async ({ taskId, fromDate, toDate, type }) => {
        const task = pageState.tasks.find((t) => t.id === taskId);
        if (!task) return;

        const diff =
            (new Date(toDate).getTime() - new Date(fromDate).getTime()) /
            (1000 * 60 * 60 * 24);

        if (type === "planCell") {
            const newStart = shiftDate(task.plan.start, diff);
            const newEnd = shiftDate(task.plan.end, diff);

            await taskApi.update({
                id: taskId,
                project_id: projectId,
                planned_start: newStart,
                planned_end: newEnd,
            });

            await regeneratePlanCells(taskId, newStart, newEnd, task.plan.totalHours);
        }

        if (type === "actualCell") {
            const newStart = shiftDate(task.actual.start, diff);
            const newEnd = shiftDate(task.actual.end, diff);

            await taskApi.update({
                id: taskId,
                project_id: projectId,
                actual_start: newStart,
                actual_end: newEnd,
            });

            await regenerateActualCells(
                taskId,
                newStart,
                newEnd,
                task.actual.totalHours
            );
        }

        await loadTasks();
    };

    // -------------------------
    // バーの端ドラッグ（期間伸縮）
    // -------------------------
    const onDragResize = async ({ taskId, toDate, type, edge }) => {
        const task = pageState.tasks.find((t) => t.id === taskId);
        if (!task) return;

        if (type === "planCell") {
            let newStart = task.plan.start;
            let newEnd = task.plan.end;

            if (edge === "start") newStart = toDate;
            if (edge === "end") newEnd = toDate;

            await taskApi.update({
                id: taskId,
                project_id: projectId,
                planned_start: newStart,
                planned_end: newEnd,
            });

            await regeneratePlanCells(taskId, newStart, newEnd, task.plan.totalHours);
        }

        if (type === "actualCell") {
            let newStart = task.actual.start;
            let newEnd = task.actual.end;

            if (edge === "start") newStart = toDate;
            if (edge === "end") newEnd = toDate;

            await taskApi.update({
                id: taskId,
                project_id: projectId,
                actual_start: newStart,
                actual_end: newEnd,
            });

            await regenerateActualCells(
                taskId,
                newStart,
                newEnd,
                task.actual.totalHours
            );
        }

        await loadTasks();
    };

    const togglePhase = (phase: string) => {
        setCollapsedPhases((prev) => ({
            ...prev,
            [phase]: !prev[phase],
        }));
    };

    const toggleAllPhases = () => {
        const allCollapsed = Object.values(collapsedPhases).every((v) => v === true);

        // 全部閉じている → 全展開
        if (allCollapsed) {
            const opened: Record<string, boolean> = {};
            pageState.tasks.forEach((t) => (opened[t.phase] = false));
            setCollapsedPhases(opened);
            return;
        }

        // どれか開いている → 全折りたたみ
        const collapsed: Record<string, boolean> = {};
        pageState.tasks.forEach((t) => (collapsed[t.phase] = true));
        setCollapsedPhases(collapsed);
    };
    return {
        pageState,
        dates,
        editTarget,
        dispatch,
        setEditTarget,
        handleKeyDownCell,
        handleChangeCell,
        onDragMove,
        onDragResize,
        cancelEdit: () => setEditTarget(null),
        loadTasks,
        togglePhase,
        toggleAllPhases,
        allCollapsed: Object.values(collapsedPhases).every((v) => v === true),
        collapsedPhases,
    };
};