/**
 * @test-import vi.mock("@tauri-apps/api/core", () => ({
 * @test-import   invoke: vi.fn(),
 * @test-import }));
 * @test-import import { invoke } from "@tauri-apps/api/core";
 * @test-import import * as db from "../../types/db/task";
 * @test-var-block mock
 * vi.mock("@tauri-apps/api/core", () => ({
 *   invoke: vi.fn(),
 * }));
 * const id = "1";
 * const projectId = "1111";
 * const task: api.TaskPayload = {
 *   id: "1",
 *   project_id: "1111",
 * };
 * const results: db.TaskRow[] = [];
 * afterEach(() => {
 *  vi.restoreAllMocks();
 * }); 
 * @end-test-var-block
 * @test-return list results
 * @test-return create "ok"
 * @test-return update "ok"
 * @test-return delete "ok"
 */
import { invoke } from "@tauri-apps/api/core";
import { TaskKey, TaskRow, TaskValue } from "../../types/db/task";

export type TaskPayload = Partial<TaskValue> & TaskKey;

export const taskApi = {
    list: async (projectId: string): Promise<TaskRow[]> => {
        return await invoke("list_tasks", { projectId });
    },

    create: async (task: TaskPayload) => {
        return await invoke("create_task", { payload: task });
    },

    update: async (task: TaskPayload) => {
        return await invoke("update_task", { payload: task });
    },

    delete: async (projectId: string, id: string) => {
        return await invoke("delete_task", { id, projectId });
    },
};