import { useMessageMock } from "@features/ProjectList/__tests__/hooks/mockCommon";

vi.mock("@hooks/useMessage", () => ({
  ...useMessageMock
}));

vi.mock("@features/ProjectList/hooks/handler/useProjectApi", () => ({
  useProjectApi: vi.fn(),
}));

import { useProjectApi } from "@features/ProjectList/hooks/handler/useProjectApi";
import { useProjectApiMock } from "./mock";
import { setupMocks } from "./utils";

export const setup = () => setupMocks([{ target: useProjectApi, mock: useProjectApiMock }]);
