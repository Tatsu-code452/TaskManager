import { useCallback, useEffect, useMemo, useRef } from "react";

import { fetchTaskModelList } from "../../domain/repository/taskRepository";
import { formatDate } from "../../domain/utils/date";
import { useProjectProgressStates } from "../state/useProjectProgressStates";

export const useProjectProgressController = (projectId: string) => {
    const {
        pageState,
        pageStateDispatch,
        editDispatch,
        collapseDispatch,
        selectors
    } = useProjectProgressStates();

    // -------------------------
    // TaskModel[] を読み込む
    // -------------------------
    const onLoadTasks = useCallback(async () => {
        const tasks = await fetchTaskModelList(projectId);
        pageStateDispatch.setTasks(tasks);
    }, [projectId, pageStateDispatch]);

    // -------------------------
    // 日付レンジ生成
    // -------------------------
    const dates = useMemo(() => {
        const from = new Date(pageState.displayRange.from);
        const to = new Date(pageState.displayRange.to);

        const list: string[] = [];
        const current = new Date(from);
        while (current <= to) {
            list.push(formatDate(current));
            current.setDate(current.getDate() + 1);
        }

        return list;
    }, [pageState.displayRange]);

    // 初回ロード
    const loadingRef = useRef(false);

    useEffect(() => {
        if (loadingRef.current) return;
        loadingRef.current = true;

        onLoadTasks().finally(() => {
            loadingRef.current = false;
        });
    }, [onLoadTasks]);

    return {
        pageState,
        dates,
        pageStateDispatch,
        editDispatch,
        collapseDispatch,
        selectors,

        onLoadTasks,
    };
};