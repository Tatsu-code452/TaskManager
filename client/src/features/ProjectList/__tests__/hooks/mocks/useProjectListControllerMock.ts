import { resetMocks } from "@features/ProjectList/__tests__/utils";

export const useProjectListControllerMock = vi.fn();

vi.mock("@features/ProjectList/hooks/controller/useProjectListController", () => ({
  useProjectListController: useProjectListControllerMock,
}));

export const setupUseProjectListControllerMock = () => resetMocks([useProjectListControllerMock]);
