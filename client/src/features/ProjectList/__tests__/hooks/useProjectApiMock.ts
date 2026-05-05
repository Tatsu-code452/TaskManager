import { projectApiMock } from "./mockCommon";

vi.mock("@api/projectApi", () => ({
    projectApi: { ...projectApiMock }
}));

import { projectApi } from "@api/projectApi";

export const setup = () => projectApi;

