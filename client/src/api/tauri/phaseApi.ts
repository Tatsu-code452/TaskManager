/**
 * @test-import vi.mock("@tauri-apps/api/core", () => ({
 * @test-import   invoke: vi.fn(),
 * @test-import }));
 * @test-import import { invoke } from "@tauri-apps/api/core";
 * @test-import import * as db from "../../types/db/phase";
 * @test-var-block mock
 * vi.mock("@tauri-apps/api/core", () => ({
 *   invoke: vi.fn(),
 * }));
 * const id = "1";
 * const projectId = "1111";
 * const phase: api.PhasePayload = {
 *   id: "1",
 *   project_id: "1111",
 * };
 * afterEach(() => {
 *  vi.restoreAllMocks();
 * });  
 * @end-test-var-block
 * @test-var const results: db.PhaseRow[] = [];
 * @test-return list results
 * @test-return create "ok"
 * @test-return update "ok"
 * @test-return delete "ok"
 */
import { invoke } from "@tauri-apps/api/core";
import { PhaseKey, PhaseRow, PhaseValue } from "../../types/db/phase";

export type PhasePayload = Partial<PhaseValue> & PhaseKey;

export const phaseApi = {
    list: async (projectId: string): Promise<PhaseRow[]> => {
        return await invoke("list_phases", { projectId });
    },

    create: async (phase: PhasePayload) => {
        return await invoke("create_phase", { payload: phase });
    },

    update: async (phase: PhasePayload) => {
        return await invoke("update_phase", { payload: phase });
    },

    delete: async (projectId: string, id: string) => {
        return await invoke("delete_phase", { id, projectId });
    },
};