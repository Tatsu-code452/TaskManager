vi.mock("../../../../api/tauri/taskApi", () => ({
    taskApi: {
        list: vi.fn(() => Promise.resolve({})),
        update: vi.fn(() => Promise.resolve({})),
        create: vi.fn(() => Promise.resolve({})),
        delete: vi.fn(() => Promise.resolve({})),
    },
}));

vi.mock("../../../../api/tauri/taskPlanCellApi", () => ({
    taskPlanCellApi: {
        list: vi.fn(() => Promise.resolve({})),
        update: vi.fn(() => Promise.resolve({})),
        create: vi.fn(() => Promise.resolve({})),
        delete: vi.fn(() => Promise.resolve({})),
    },
}));

vi.mock("../../../../api/tauri/taskActualCellApi", () => ({
    taskActualCellApi: {
        list: vi.fn(() => Promise.resolve({})),
        update: vi.fn(() => Promise.resolve({})),
        create: vi.fn(() => Promise.resolve({})),
        delete: vi.fn(() => Promise.resolve({})),
    },
}));

import { taskActualCellApi } from "../../../../api/tauri/taskActualCellApi";
import { taskApi } from "../../../../api/tauri/taskApi";
import { taskPlanCellApi } from "../../../../api/tauri/taskPlanCellApi";

export const createMockApi = () => {
    return {
        taskApi: vi.mocked(taskApi),
        taskPlanCellApi: vi.mocked(taskPlanCellApi),
        taskActualCellApi: vi.mocked(taskActualCellApi),
    }
}

