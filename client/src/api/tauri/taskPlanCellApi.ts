/**
 * @test-import vi.mock("@tauri-apps/api/core", () => ({
 * @test-import   invoke: vi.fn(),
 * @test-import }));
 * @test-import import { invoke } from "@tauri-apps/api/core";
 * @test-import import * as db from "../../types/db/taskPlan";
 * @test-var-block mock
 * const id = "1";
 * const taskId = "12345";
 * const date = "2026-01-01";
 * const hours = 5.0;
 * const results: db.TaskPlanRow[] = [];
 * afterEach(() => {
 *  vi.restoreAllMocks();
 * }); 
 * @end-test-var-block
 * @test-return list results
 * @test-return update "ok"
 */
import { invoke } from "@tauri-apps/api/core";
import { TaskPlanRow } from "../../types/db/taskPlan";

export const taskPlanCellApi = {
    list: async (taskId: string): Promise<TaskPlanRow[]> => {
        return await invoke("list_task_plan_cells", { taskId });
    },
    update: async (taskId: string, date: string, hours: number) => {
        return await invoke("update_task_plan_cell", { taskId, date, hours });
    },
};