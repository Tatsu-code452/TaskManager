vi.mock("../../../../../api/tauri/projectApi", () => ({
    projectApi: {
        create: vi.fn(),
        update: vi.fn(),
        search: vi.fn(),
    }
}));

import { projectApi } from "../../../../../api/tauri/projectApi";

export const createProjectApiMock = () => projectApi;

