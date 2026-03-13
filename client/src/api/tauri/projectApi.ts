/**
 * @test-import vi.mock("@tauri-apps/api/core", () => ({
 * @test-import   invoke: vi.fn(),
 * @test-import }));
 * @test-import import { invoke } from "@tauri-apps/api/core";
 * @test-import import * as model from "../../features/ProjectList/types/model";
 * @test-import import * as db from "../../types/db/project";
 * @test-var-block mock
 * vi.mock("@tauri-apps/api/core", () => ({
 *   invoke: vi.fn(),
 * }));
 * const name = "name";
 * const client = "client";
 * const status = db.ProjectStatus.Planned;
 * const project: api.ProjectPayload = {
 *   id: "1111",
 *   name: "name",
 *   client: "client",
 *   status: db.ProjectStatus.Planned,
 *   start_date: "2026-03-14",
 *   end_date: "2026-03-14",
 * };
 * const result: model.Project = {
 *   id: "1111",
 *   name: "name",
 *   client: "client",
 *   status: db.ProjectStatus.Planned,
 *   startDate: "2026-03-14",
 *   endDate: "2026-03-14",
 *   progress: 10,
 * };
 * const results: model.Project[] = [result];
 * afterEach(() => {
 *  vi.restoreAllMocks();
 * }); 
 * @end-test-var-block
 * @test-return list results
 * @test-return create "ok"
 * @test-return update "ok"
 */

import { invoke } from "@tauri-apps/api/core";
import { Project, toProject } from "../../features/ProjectList/types/model";
import { ProjectKey, ProjectRow, ProjectStatus, ProjectValue } from "../../types/db/project";

export type ProjectPayload = Partial<ProjectValue> & ProjectKey;

export const projectApi = {
    list: async (name: string, client: string, status: ProjectStatus): Promise<Project[]> => {
        const response = await invoke<ProjectRow[]>("search_projects", {
            name,
            client,
            status,
        });
        return response.map(toProject);
    },
    create: async (project: ProjectPayload) => {
        const response = await invoke("create_project", { payload: project });
        return response;
    },
    update: async (project: ProjectPayload) => {
        const response = await invoke("update_project", { payload: project });
        return response;
    },
}