const navigateMock = vi.fn();

// ------------------------------
// API モック（import より前）
// ------------------------------
vi.mock("../../../api/tauri/projectApi", () => {
    const mock = {
        list: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        search: vi.fn(),
    };
    return { projectApi: mock };
});

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => navigateMock,
    };
});

import { projectApi } from "../../../api/tauri/projectApi";

export const createMock = () => {
    return {
        listMock: vi.mocked(projectApi.search),
        createMock: vi.mocked(projectApi.create),
        updateMock: vi.mocked(projectApi.update),
        navigateMock,
    };
}


