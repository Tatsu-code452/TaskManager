import { useCallback, useEffect, useMemo, useRef } from "react";

import { taskActualCellApi } from "../../../../api/tauri/taskActualCellApi";
import { taskApi } from "../../../../api/tauri/taskApi";
import { taskPlanCellApi } from "../../../../api/tauri/taskPlanCellApi";
import { fetchTaskModelList } from "../../domain/fetchTaskModelList";
import { EditTarget } from "../../types/types";
import { useCellKeyboardNavigation } from "../handler/useCellKeyboardNavigation";
import { useCollapsedPhases } from "../handler/useCollapsedPhases";
import { useTaskCellDrag } from "../handler/useTaskCellDrag";
import { useProjectProgressStates } from "../state/useProjectProgressStates";


export const useProjectProgressController = (projectId: string) => {
    const { pageState, editTarget, dispatch, setEditTarget, collapsedPhases, setCollapsedPhases } =
        useProjectProgressStates();

    const tasks = pageState.tasks;
    const { isStartEdit, getNextCell } = useCellKeyboardNavigation();
    const { allCollapsed, toggleAllPhases, togglePhase } = useCollapsedPhases({ tasks, collapsedPhases, setCollapsedPhases });

    // -------------------------
    // TaskModel[] を読み込む
    // -------------------------
    const loadTasks = useCallback(async () => {
        const tasks = await fetchTaskModelList(projectId);
        dispatch.setTasks(tasks);
    }, [projectId, dispatch]);

    const { onDragMove, onDragResize } = useTaskCellDrag(projectId, pageState, loadTasks);

    // -------------------------
    // 日付レンジ生成
    // -------------------------
    const dates = useMemo(() => {
        const from = new Date(pageState.displayRange.from);
        const to = new Date(pageState.displayRange.to);

        const list: string[] = [];
        const current = new Date(from);

        while (current <= to) {
            list.push(current.toISOString().slice(0, 10));
            current.setDate(current.getDate() + 1);
        }

        return list;
    }, [pageState.displayRange]);

    // -------------------------
    // セル編集（計画・実績・進捗）
    // -------------------------
    const handleChangeCell = async (target: EditTarget, newValue: number) => {
        if (!target) return;

        try {
            switch (target.type) {
                case "planCell":
                    await taskPlanCellApi.update(target.taskIndex, target.date, newValue);
                    break;
                case "actualCell":
                    await taskActualCellApi.update(target.taskIndex, target.date, newValue)
                    break;
                case "actualProgress":
                    await taskApi.update({ id: target.taskIndex, project_id: projectId, progress_rate: newValue });
                    break;
                default:
                    break;
            }

            dispatch.endEdit();
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

        if (isStartEdit(e)) {
            e.preventDefault();
            dispatch.startEdit({
                type: type,
                taskIndex,
                date,
                pressedKey: e.key,
            });
            return;
        }

        const next = getNextCell(
            e,
            { type: type, taskIndex, date },
            pageState.tasks,
            dates
        );

        if (next) {
            e.preventDefault();
            dispatch.startEdit(next);
        }
    };

    // 初回ロード
    const loadingRef = useRef(false);

    useEffect(() => {
        if (loadingRef.current) return;
        loadingRef.current = true;

        loadTasks().finally(() => {
            loadingRef.current = false;
        });
    }, [loadTasks]);

    return {
        pageState,
        dates,
        editTarget,
        dispatch,

        loadTasks,

        setEditTarget,

        handleKeyDownCell,
        handleChangeCell,

        onDragMove,
        onDragResize,

        togglePhase,
        toggleAllPhases,
        allCollapsed,
        collapsedPhases,
    };
};