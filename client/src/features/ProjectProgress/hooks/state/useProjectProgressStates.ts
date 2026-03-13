import { useMemo, useReducer, useState } from "react";
import { useProgressPageState } from "./useProgressPageState";

export const useProjectProgressStates = () => {
    const { getMonthRange, createInitialState, createProgressReducer } =
        useProgressPageState();

    const [pageState, dispatchBase] = useReducer(
        createProgressReducer({ getMonthRange, createInitialState }),
        null,
        createInitialState
    );

    const [editTarget, setEditTarget] = useState(null);

    const [collapsedPhases, setCollapsedPhases] = useState<Record<string, boolean>>({});

    const dispatch = useMemo(
        () => ({
            init: () => dispatchBase({ type: "INIT" }),
            setTasks: (tasks) => dispatchBase({ type: "SET_TASKS", tasks }),
            setFrom: (from) => dispatchBase({ type: "SET_FROM", from }),
            setTo: (to) => dispatchBase({ type: "SET_TO", to }),
            setBaseDate: (baseDate) =>
                dispatchBase({ type: "SET_BASE_DATE", baseDate }),
        }),
        [dispatchBase]
    );

    return { pageState, editTarget, dispatch, setEditTarget, collapsedPhases, setCollapsedPhases };
};