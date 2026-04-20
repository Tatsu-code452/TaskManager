import { useMemo, useReducer, useState } from "react";
import { TaskModel } from "../../types/model";
import { EditTarget } from "../../types/types";
import { useStateInitializer } from "./useStateInitializer";
import { useStateReducer } from "./useStateReducer";

export const useProjectProgressStates = () => {
    const [editTarget, setEditTarget] = useState<EditTarget>(null);
    const [collapsedPhases, setCollapsedPhases] = useState<Record<string, boolean>>({});

    const { initProgressPageState } = useStateInitializer();
    const { createProgressReducer } = useStateReducer();

    const [pageState, dispatchBase] = useReducer(
        createProgressReducer({ initProgressPageState }),
        null,
        initProgressPageState
    );
    // 状態変更を行うメソッド群を生成
    const pageStateDispatch = useMemo(
        () => ({
            init: () => dispatchBase({ type: "INIT" }),
            setTasks: (tasks: TaskModel[]) => dispatchBase({ type: "SET_TASKS", tasks }),
            setFrom: (from: string) => dispatchBase({ type: "SET_FROM", from }),
            setTo: (to: string) => dispatchBase({ type: "SET_TO", to }),
            setBaseDate: (baseDate: string) =>
                dispatchBase({ type: "SET_BASE_DATE", baseDate }),
        }),
        [dispatchBase]
    );

    const editDispatch = useMemo(() => ({
        startEdit: (editTarget: EditTarget) => setEditTarget(editTarget),
        endEdit: () => setEditTarget(null),
    }), []);

    const collapseDispatch = useMemo(() => ({
        togglePhase: (phase: string) => {
            setCollapsedPhases(prev => ({
                ...prev,
                [phase]: !prev[phase],
            }));
        },
        toggleAllPhases: (tasks: TaskModel[]) => {
            setCollapsedPhases(prev => {
                const allCollapsed = Object.values(prev).every(v => v === true);
                const next: Record<string, boolean> = {};
                tasks.forEach(t => next[t.phase] = !allCollapsed);
                return next;
            });
        },
    }), []);

    const selectors = useMemo(() => ({
        editTarget,
        isEditing: !!editTarget,
        collapsedPhases,
        allCollapsed: Object.values(collapsedPhases).every(v => v),
    }), [editTarget, collapsedPhases]);

    return {
        pageState,
        pageStateDispatch,
        editDispatch,
        collapseDispatch,
        selectors
    };
};