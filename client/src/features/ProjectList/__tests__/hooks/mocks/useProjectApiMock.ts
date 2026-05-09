import { resetMocks } from "@features/ProjectList/__tests__/utils";

export const useProjectApiMock = {
    createProject: vi.fn(),
    updateProject: vi.fn(),
    deleteProject: vi.fn(),
    searchProjects: vi.fn(),
};

vi.mock("@features/ProjectList/hooks/handler/useProjectApi", () => ({
    useProjectApi: () => useProjectApiMock,
}));

export const setupUseProjectApiMock = () => resetMocks(useProjectApiMock);