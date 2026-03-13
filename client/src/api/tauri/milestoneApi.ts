/**
 * @test-import vi.mock("@tauri-apps/api/core", () => ({
 * @test-import   invoke: vi.fn(),
 * @test-import }));
 * @test-import import { invoke } from "@tauri-apps/api/core";
 * @test-import import * as db from "../../types/db/milestone";
 * @test-var-block mock
 * vi.mock("@tauri-apps/api/core", () => ({
 *   invoke: vi.fn(),
 * }));
 * const id = "1";
 * const projectId = "1111";
 * const milestone: api.MilestonePayload = {
 *   id: "1",
 *   project_id: "1111",
 * };
 * const results: db.MilestoneRow[] = [];
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
import { MilestoneKey, MilestoneRow, MilestoneValue } from "../../types/db/milestone";

export type MilestonePayload = Partial<MilestoneValue> & MilestoneKey;

export const milestoneApi = {
    list: async (projectId: string): Promise<MilestoneRow[]> => {
        return await invoke("list_milestones", { projectId });
    },

    create: async (milestone: MilestonePayload) => {
        return await invoke("create_milestone", { payload: milestone });
    },

    update: async (milestone: MilestonePayload) => {
        return await invoke("update_milestone", { payload: milestone });
    },

    delete: async (projectId: string, id: string) => {
        return await invoke("delete_milestone", { id, projectId });
    },
};