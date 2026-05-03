import { useEffect, useMemo, useState } from "react";

type CreateForm<T> = {
    mode: "new";
    form: T;
};

type UpdateForm<T, K> = {
    mode: "edit";
    key: K;
    form: T;
};

export type ModalData<T, K> = CreateForm<T> | UpdateForm<T, K>;

export type ModalState<T, K> = {
    isOpen: boolean;
    data: ModalData<T, K> | null;
    initialForm: T | null;
    isDirty: boolean;
};

const createInitialState = <T, K>(): ModalState<T, K> => ({
    isOpen: false,
    data: null,
    initialForm: null,
    isDirty: false,
});

export const useModal = <T, K>() => {
    const [state, setState] = useState<ModalState<T, K>>(createInitialState());

    // -----------------------------
    // メソッド群（useMemo で安定化）
    // -----------------------------
    const dispatch = useMemo(() => {
        const openNew = (form: T) => {
            setState({
                isOpen: true,
                data: { mode: "new", form },
                initialForm: form,
                isDirty: false,
            });
        };

        const openEdit = (key: K, form: T) => {
            setState({
                isOpen: true,
                data: { mode: "edit", key, form },
                initialForm: form,
                isDirty: false,
            });
        };

        const reset = () => {
            if (!state.initialForm || !state.data) return;

            if (state.data.mode === "new") {
                setState({
                    ...state,
                    data: { mode: "new", form: state.initialForm },
                    isDirty: false,
                });
            } else {
                setState({
                    ...state,
                    data: {
                        mode: "edit",
                        key: state.data.key,
                        form: state.initialForm,
                    },
                    isDirty: false,
                });
            }
        };

        const confirmClose = () => {
            if (state.isDirty) {
                const ok = window.confirm("変更があります。閉じてもよいですか？");
                if (!ok) return;
            }
            setState(createInitialState());
        };

        const close = () => {
            setState(createInitialState());
        };

        const overlayClickClose = () => {
            confirmClose();
        };

        const setDirty = (dirty: boolean) => {
            setState({ ...state, isDirty: dirty });
        };

        return {
            state,
            open: {
                new: openNew,
                edit: openEdit,
            },
            reset,
            close,
            confirmClose,
            overlayClickClose,
            setDirty,
        };
    }, [state]);

    // -----------------------------
    // ESC キー
    // -----------------------------
    useEffect(() => {
        if (!state.isOpen) return;

        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                dispatch.confirmClose();
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [state.isOpen, dispatch]);

    return { dispatch };
};
