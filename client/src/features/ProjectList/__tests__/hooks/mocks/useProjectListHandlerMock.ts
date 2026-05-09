import { resetMocks } from "@features/ProjectList/__tests__/utils";

export const useMessageMock = {
  Messages: {},
  getMessage: vi.fn((code, ...args) => `MSG:${code}:${args.join(",")}`),
};

export const useProjectListHandlerMock = {
  handleValidate: vi.fn(() => true),
  handleSubmit: vi.fn(),
  deleteProject: vi.fn(),
  searchProjects: vi.fn(),
}

vi.mock("@hooks/useMessage", () => ({
  ...useMessageMock,
}));

vi.mock("@features/ProjectList/hooks/handler/useProjectListHandler", () => ({
  useProjectListHandler: () => useProjectListHandlerMock,
}));

export const setupUseProjectListHandlerMock = () => resetMocks([useProjectListHandlerMock]);

