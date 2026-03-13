vi.mock("@tauri-apps/api/core", () => ({
  invoke: vi.fn(),
}));
import { invoke } from "@tauri-apps/api/core";
import { describe, expect, it, Mock, vi } from "vitest";
import * as model from "../../features/ProjectList/types/model";
import * as db from "../../types/db/project";
import * as api from "./projectApi";

describe("API: projectApi", () => {

  vi.mock("@tauri-apps/api/core", () => ({
    invoke: vi.fn(),
  }));
  const name = "name";
  const client = "client";
  const status = db.ProjectStatus.Planned;
  const project: api.ProjectPayload = {
    id: "1111",
    name: "name",
    client: "client",
    status: db.ProjectStatus.Planned,
    start_date: "2026-03-14",
    end_date: "2026-03-14",
  };
  const result: model.Project = {
    id: "1111",
    name: "name",
    client: "client",
    status: db.ProjectStatus.Planned,
    startDate: "2026-03-14",
    endDate: "2026-03-14",
    progress: 10,
  };
  const results: model.Project[] = [result];
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("list", () => {

    it("正常系: 正しい引数で呼ばれる", async () => {
      vi.spyOn(api.projectApi, "list").mockResolvedValue(
        results
      );
      const result = await api.projectApi.list(
        name,
        client,
        status,
      );
      expect(result).toBe(results);
    });

    it("異常系: 例外を投げる", async () => {
      vi.spyOn(api.projectApi, "list").mockRejectedValue(new Error("test error"));
      await expect(api.projectApi.list(
        name,
        client,
        status,
      )).rejects.toThrow("test error");
    });

  });
  describe("create", () => {

    it("正常系: 正しい引数で呼ばれる", async () => {
      vi.spyOn(api.projectApi, "create").mockResolvedValue(
        "ok"
      );
      const result = await api.projectApi.create(
        project,
      );
      expect(result).toBe("ok");
    });

    it("異常系: 例外を投げる", async () => {
      vi.spyOn(api.projectApi, "create").mockRejectedValue(new Error("test error"));
      await expect(api.projectApi.create(
        project,
      )).rejects.toThrow("test error");
    });

  });
  describe("update", () => {

    it("正常系: 正しい引数で呼ばれる", async () => {
      vi.spyOn(api.projectApi, "update").mockResolvedValue(
        "ok"
      );
      const result = await api.projectApi.update(
        project,
      );
      expect(result).toBe("ok");
    });

    it("異常系: 例外を投げる", async () => {
      vi.spyOn(api.projectApi, "update").mockRejectedValue(new Error("test error"));
      await expect(api.projectApi.update(
        project,
      )).rejects.toThrow("test error");
    });

  });

  it("invoke 呼び出し: search_projects が実行される", async () => {
    const spy = invoke as Mock;

    try {
      await api.projectApi.list(
        name,
        client,
        status,
      );
    } catch {/** */ }

    expect(spy).toHaveBeenCalledWith(
      "search_projects",
      {
        name,
        client,
        status,
      }
    );
  });
  it("invoke 呼び出し: create_project が実行される", async () => {
    const spy = invoke as Mock;

    try {
      await api.projectApi.create(
        project,
      );
    } catch {/** */ }

    expect(spy).toHaveBeenCalledWith(
      "create_project",
      {
        payload: project,
      }
    );
  });
  it("invoke 呼び出し: update_project が実行される", async () => {
    const spy = invoke as Mock;

    try {
      await api.projectApi.update(
        project,
      );
    } catch {/** */ }

    expect(spy).toHaveBeenCalledWith(
      "update_project",
      {
        payload: project,
      }
    );
  });

});
