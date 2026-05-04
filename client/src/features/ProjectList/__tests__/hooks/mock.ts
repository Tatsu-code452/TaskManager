import { ProjectStatus } from "../../../../types/db/project";
import { payloads } from "./define";

export const useProjectListHandlerMock = {
    handleValidate: vi.fn(() => true),
    handleSubmit: vi.fn(),
    searchProjects: vi.fn(),
}

export const useProjectListStatesMock = {
    projects: {
        state: [],
        setState: vi.fn(),
    },
    search: {
        state: { name: "", client: "", status: ProjectStatus.All },
        setField: vi.fn(),
        setAll: vi.fn(),
        reset: vi.fn(),
        save: vi.fn(),
        remove: vi.fn(),
        apply: vi.fn(),
    },
    modal: {
        state: {
            isOpen: false,
            data: null,
            initialForm: null,
            isDirty: false
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
    },
    form: {
        state: payloads.empty,
        isDirty: false,
        setField: vi.fn(),
        setAll: vi.fn(),
        reset: vi.fn(),
        validate: vi.fn(),
    },
    pagination: {
        state: { page: 1, limit: 30, totalPages: 1, totalItems: 0 },
        setPage: vi.fn(),
        setLimit: vi.fn(),
        next: vi.fn(() => 2),
        prev: vi.fn(() => 1),
        reset: vi.fn(),
        updateTotal: vi.fn(),
    },
};

export const useProjectApiMock = {
    createProject: vi.fn(),
    updateProject: vi.fn(),
    searchProjects: vi.fn(),
};
