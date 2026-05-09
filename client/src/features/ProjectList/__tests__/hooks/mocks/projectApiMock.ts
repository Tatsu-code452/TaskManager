import { resetMocks } from "@features/ProjectList/__tests__/utils";

export const projectApiMock = {
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    search: vi.fn(),
};

vi.mock("@api/projectApi", () => ({
    projectApi: projectApiMock,
}));

export const setupProjectApiMock = () => resetMocks(projectApiMock)