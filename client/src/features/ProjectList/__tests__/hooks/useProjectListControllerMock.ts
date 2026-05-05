vi.mock("@features/ProjectList/hooks/handler/useProjectListHandler", () => ({
  useProjectListHandler: vi.fn(),
}));
vi.mock("@features/ProjectList/hooks/state/useProjectListStates", () => ({
  useProjectListStates: vi.fn(),
}));

import { useProjectListHandler } from "@features/ProjectList/hooks/handler/useProjectListHandler";
import { useProjectListStates } from "@features/ProjectList/hooks/state/useProjectListStates";
import { useProjectListHandlerMock, useProjectListStatesMock } from "./mock";
import { setupMocks } from "./utils";

export const setup = () => setupMocks([
  { target: useProjectListHandler, mock: useProjectListHandlerMock },
  { target: useProjectListStates, mock: useProjectListStatesMock },
]);
