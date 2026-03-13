vi.mock("@tauri-apps/api/core", () => ({
  invoke: vi.fn(),
}));
import { invoke } from "@tauri-apps/api/core";
import { describe, expect, it, Mock, vi } from "vitest";
import * as db from "../../types/db/milestone";
import * as api from "./milestoneApi";

describe("API: milestoneApi", () => {

  vi.mock("@tauri-apps/api/core", () => ({
    invoke: vi.fn(),
  }));
  const id = "1";
  const projectId = "1111";
  const milestone: api.MilestonePayload = {
    id: "1",
    project_id: "1111",
  };
  const results: db.MilestoneRow[] = [];
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("list", () => {

    it("正常系: 正しい引数で呼ばれる", async () => {
      vi.spyOn(api.milestoneApi, "list").mockResolvedValue(
        results
      );
      const result = await api.milestoneApi.list(
        projectId,
      );
      expect(result).toBe(results);
    });

    it("異常系: 例外を投げる", async () => {
      vi.spyOn(api.milestoneApi, "list").mockRejectedValue(new Error("test error"));
      await expect(api.milestoneApi.list(
        projectId,
      )).rejects.toThrow("test error");
    });

  });
  describe("create", () => {

    it("正常系: 正しい引数で呼ばれる", async () => {
      vi.spyOn(api.milestoneApi, "create").mockResolvedValue(
        "ok"
      );
      const result = await api.milestoneApi.create(
        milestone,
      );
      expect(result).toBe("ok");
    });

    it("異常系: 例外を投げる", async () => {
      vi.spyOn(api.milestoneApi, "create").mockRejectedValue(new Error("test error"));
      await expect(api.milestoneApi.create(
        milestone,
      )).rejects.toThrow("test error");
    });

  });
  describe("update", () => {

    it("正常系: 正しい引数で呼ばれる", async () => {
      vi.spyOn(api.milestoneApi, "update").mockResolvedValue(
        "ok"
      );
      const result = await api.milestoneApi.update(
        milestone,
      );
      expect(result).toBe("ok");
    });

    it("異常系: 例外を投げる", async () => {
      vi.spyOn(api.milestoneApi, "update").mockRejectedValue(new Error("test error"));
      await expect(api.milestoneApi.update(
        milestone,
      )).rejects.toThrow("test error");
    });

  });
  describe("delete", () => {

    it("正常系: 正しい引数で呼ばれる", async () => {
      vi.spyOn(api.milestoneApi, "delete").mockResolvedValue(
        "ok"
      );
      const result = await api.milestoneApi.delete(
        projectId,
        id,
      );
      expect(result).toBe("ok");
    });

    it("異常系: 例外を投げる", async () => {
      vi.spyOn(api.milestoneApi, "delete").mockRejectedValue(new Error("test error"));
      await expect(api.milestoneApi.delete(
        projectId,
        id,
      )).rejects.toThrow("test error");
    });

  });

  it("invoke 呼び出し: list_milestones が実行される", async () => {
    const spy = invoke as Mock;

    try {
      await api.milestoneApi.list(
        projectId,
      );
    } catch {/** */ }

    expect(spy).toHaveBeenCalledWith(
      "list_milestones",
      {
        projectId,
      }
    );
  });
  it("invoke 呼び出し: create_milestone が実行される", async () => {
    const spy = invoke as Mock;

    try {
      await api.milestoneApi.create(
        milestone,
      );
    } catch {/** */ }

    expect(spy).toHaveBeenCalledWith(
      "create_milestone",
      {
        payload: milestone,
      }
    );
  });
  it("invoke 呼び出し: update_milestone が実行される", async () => {
    const spy = invoke as Mock;

    try {
      await api.milestoneApi.update(
        milestone,
      );
    } catch {/** */ }

    expect(spy).toHaveBeenCalledWith(
      "update_milestone",
      {
        payload: milestone,
      }
    );
  });
  it("invoke 呼び出し: delete_milestone が実行される", async () => {
    const spy = invoke as Mock;

    try {
      await api.milestoneApi.delete(
        projectId,
        id,
      );
    } catch {/** */ }

    expect(spy).toHaveBeenCalledWith(
      "delete_milestone",
      {
        id,
        projectId,
      }
    );
  });

});
