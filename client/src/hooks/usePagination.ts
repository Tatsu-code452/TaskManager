import { useMemo, useState } from "react";

export type PaginationState = {
    page: number;
    totalPages: number;
    totalItems: number;
    limit: number;
};

const createInitialState = (defaultLimit: number): PaginationState => ({
    page: 1,
    totalPages: 1,
    totalItems: 0,
    limit: defaultLimit,
});

export const usePagination = (defaultLimit = 20) => {
    const [state, setState] = useState<PaginationState>(
        createInitialState(defaultLimit)
    );

    const setField = useMemo(
        () => <K extends keyof PaginationState>(
            key: K, value: PaginationState[K]
        ) => setState((prev) => ({ ...prev, [key]: value }))
        , []
    );

    const dispatch = useMemo(() => {
        const setPage = (page: number) =>
            setField("page", Math.max(1, Math.min(page, state.totalPages)));
        const next = () => {
            const nextPage = Math.min(state.page + 1, state.totalPages);
            setField("page", nextPage);
            return nextPage;
        };
        const prev = () => {
            const prevPage = Math.max(state.page - 1, 1);
            setField("page", prevPage);
            return prevPage;
        };
        const reset = () =>
            setState(createInitialState(defaultLimit));

        const setLimit = (limit: number) => {
            setState((prev) => ({
                ...prev,
                page: 1,
                totalPages: Math.max(1, Math.ceil(prev.totalItems / limit)),
                limit,
            }));
        };

        const updateTotal = (totalItems: number) => {
            const totalPages = Math.max(1, Math.ceil(totalItems / state.limit));
            setState((prev) => ({
                ...prev,
                page: Math.min(prev.page, totalPages),
                totalPages,
                totalItems,
            }));
        };

        return {
            state,
            setPage,
            setLimit,

            next,
            prev,
            reset,
            updateTotal,
        };
    }, [state]);

    return { dispatch };
};
