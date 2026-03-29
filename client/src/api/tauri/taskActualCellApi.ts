/**
 * @test-import vi.mock("@tauri-apps/api/core", () => ({
 * @test-import   invoke: vi.fn(),
 * @test-import }));
 * @test-import import { invoke } from "@tauri-apps/api/core";
 * @test-import import * as db from "../../types/db/taskActual";
 * @test-var-block mock
 * vi.mock("@tauri-apps/api/core", () => ({
 *   invoke: vi.fn(),
 * }));
 * const id = "1";
 * const taskId = "12345";
 * const date = "2026-01-01";
 * const hours = 5.0;
 * const results: db.TaskActualRow[] = [];
 * afterEach(() => {
 *  vi.restoreAllMocks();
 * }); 
 * @end-test-var-block
 * @test-return list results
 * @test-return update "ok"
 */
import { invoke } from "@tauri-apps/api/core";
import { TaskActualRow } from "../../types/db/taskActual";

export const taskActualCellApi = {
    list: async (taskId: string): Promise<TaskActualRow[]> => {
        return await invoke("list_task_actual_cells", { taskId });
    },
    update: async (taskId: string, date: string, hours: number) => {
        return await invoke("update_task_plan_cell", { taskId, date, hours });
    },
};