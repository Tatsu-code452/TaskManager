import { payloads } from "@features/ProjectList/__tests__/hooks/define";
import { ProjectStatus } from "../../../../../types/db/project";
import { resetMocks } from "../../utils";
import { useFormMock, useModalMock, usePaginationMock, useSearchMock } from "./commonHooksMock";

export const useProjectListStatesMock = {
    projects: {
        state: [],
        setState: vi.fn(),
    },
    search: {
        ...useSearchMock.dispatch,
        state: { name: "", client: "", status: ProjectStatus.All },
    },
    modal: {
        ...useModalMock.dispatch,
    },
    form: {
        ...useFormMock.dispatch,
        state: payloads.empty,
        isDirty: false,
    },
    pagination: {
        ...usePaginationMock.dispatch,
        state: { page: 1, limit: 30, totalPages: 1, totalItems: 0 },
        next: vi.fn(() => 2),
        prev: vi.fn(() => 1),
    },
};

vi.mock("@features/ProjectList/hooks/state/useProjectListStates", () => ({
    useProjectListStates: () => useProjectListStatesMock,
}));

export const setupUseProjectListStatesMock = () => resetMocks([useProjectListStatesMock]);
