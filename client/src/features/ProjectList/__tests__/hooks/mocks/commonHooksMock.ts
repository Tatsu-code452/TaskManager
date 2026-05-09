export const useStateObjMock = {
    dispatch: {
        state: [],
        setState: vi.fn(),
    }
}

export const useSearchMock = {
    dispatch: {
        state: null,
        setField: vi.fn(),
        setAll: vi.fn(),
        reset: vi.fn(),
        save: vi.fn(),
        remove: vi.fn(),
        apply: vi.fn(),
    }
}

export const modalStateMock = {
    isOpen: false,
    data: null,
    initialForm: null,
    isDirty: false,
};

export const useModalMock = {
    dispatch: {
        state: {
            isOpen: false,
            data: null,
            initialForm: null,
            isDirty: false,
        },
        open: {
            new: vi.fn(),
            edit: vi.fn(),
        },
        reset: vi.fn(),
        close: vi.fn(),
        confirmClose: vi.fn(),
        overlayClickClose: vi.fn(),
        setDirty: vi.fn(),
    }
}

export const useFormMock = {
    dispatch: {
        state: null,
        isDirty: false,
        setField: vi.fn(),
        setAll: vi.fn(),
        reset: vi.fn(),
        validate: vi.fn(),
    }
}

export const usePaginationMock = {
    dispatch: {
        state: null,
        setPage: vi.fn(),
        setLimit: vi.fn(),
        next: vi.fn(),
        prev: vi.fn(),
        reset: vi.fn(),
        updateTotal: vi.fn(),
    }
}

vi.mock("@hooks/useStateObj", () => ({
    useStateObj: useStateObjMock,
}));

vi.mock("@hooks/useSearch", () => ({
    useSearch: useSearchMock,
}));

vi.mock("@hooks/useModal", () => ({
    useModal: useModalMock,
}));

vi.mock("@hooks/useForm", () => ({
    useForm: useFormMock,
}));

vi.mock("@hooks/usePagination", () => ({
    usePagination: usePaginationMock,
}));

