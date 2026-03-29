import { useMemo, useReducer, useState } from "react";
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
    const dispatch = useMemo(
        () => ({
            init: () => dispatchBase({ type: "INIT" }),
            setTasks: (tasks) => dispatchBase({ type: "SET_TASKS", tasks }),
            setFrom: (from) => dispatchBase({ type: "SET_FROM", from }),
            setTo: (to) => dispatchBase({ type: "SET_TO", to }),
            setBaseDate: (baseDate) =>
                dispatchBase({ type: "SET_BASE_DATE", baseDate }),
            startEdit: (editTarget) => setEditTarget(editTarget),
            endEdit: () => setEditTarget(null),

        }),
        [dispatchBase]
    );

    return {
        pageState,
        editTarget, setEditTarget,
        collapsedPhases, setCollapsedPhases,
        dispatch
    };
};