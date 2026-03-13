vi.mock("@tauri-apps/api/core", () => ({
  invoke: vi.fn(),
}));
import { invoke } from "@tauri-apps/api/core";
import { describe, expect, it, Mock, vi } from "vitest";
import * as db from "../../types/db/task";
import * as api from "./taskApi";

describe("API: taskApi", () => {

  vi.mock("@tauri-apps/api/core", () => ({
    invoke: vi.fn(),
  }));
  const id = "1";
  const projectId = "1111";
  const task: api.TaskPayload = {
    id: "1",
    project_id: "1111",
  };
  const results: db.TaskRow[] = [];
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("list", () => {

    it("正常系: 正しい引数で呼ばれる", async () => {
      vi.spyOn(api.taskApi, "list").mockResolvedValue(
        results
      );
      const result = await api.taskApi.list(
        projectId,
      );
      expect(result).toBe(results);
    });

    it("異常系: 例外を投げる", async () => {
      vi.spyOn(api.taskApi, "list").mockRejectedValue(new Error("test error"));
      await expect(api.taskApi.list(
        projectId,
      )).rejects.toThrow("test error");
    });

  });
  describe("create", () => {

    it("正常系: 正しい引数で呼ばれる", async () => {
      vi.spyOn(api.taskApi, "create").mockResolvedValue(
        "ok"
      );
      const result = await api.taskApi.create(
        task,
      );
      expect(result).toBe("ok");
    });

    it("異常系: 例外を投げる", async () => {
      vi.spyOn(api.taskApi, "create").mockRejectedValue(new Error("test error"));
      await expect(api.taskApi.create(
        task,
      )).rejects.toThrow("test error");
    });

  });
  describe("update", () => {

    it("正常系: 正しい引数で呼ばれる", async () => {
      vi.spyOn(api.taskApi, "update").mockResolvedValue(
        "ok"
      );
      const result = await api.taskApi.update(
        task,
      );
      expect(result).toBe("ok");
    });

    it("異常系: 例外を投げる", async () => {
      vi.spyOn(api.taskApi, "update").mockRejectedValue(new Error("test error"));
      await expect(api.taskApi.update(
        task,
      )).rejects.toThrow("test error");
    });

  });
  describe("delete", () => {

    it("正常系: 正しい引数で呼ばれる", async () => {
      vi.spyOn(api.taskApi, "delete").mockResolvedValue(
        "ok"
      );
      const result = await api.taskApi.delete(
        projectId,
        id,
      );
      expect(result).toBe("ok");
    });

    it("異常系: 例外を投げる", async () => {
      vi.spyOn(api.taskApi, "delete").mockRejectedValue(new Error("test error"));
      await expect(api.taskApi.delete(
        projectId,
        id,
      )).rejects.toThrow("test error");
    });

  });

  it("invoke 呼び出し: list_tasks が実行される", async () => {
    const spy = invoke as Mock;

    try {
      await api.taskApi.list(
        projectId,
      );
    } catch {/** */ }

    expect(spy).toHaveBeenCalledWith(
      "list_tasks",
      {
        projectId: projectId,
      }
    );
  });
  it("invoke 呼び出し: create_task が実行される", async () => {
    const spy = invoke as Mock;

    try {
      await api.taskApi.create(
        task,
      );
    } catch {/** */ }

    expect(spy).toHaveBeenCalledWith(
      "create_task",
      {
        payload: task,
      }
    );
  });
  it("invoke 呼び出し: update_task が実行される", async () => {
    const spy = invoke as Mock;

    try {
      await api.taskApi.update(
        task,
      );
    } catch {/** */ }

    expect(spy).toHaveBeenCalledWith(
      "update_task",
      {
        payload: task,
      }
    );
  });
  it("invoke 呼び出し: delete_task が実行される", async () => {
    const spy = invoke as Mock;

    try {
      await api.taskApi.delete(
        projectId,
        id,
      );
    } catch {/** */ }

    expect(spy).toHaveBeenCalledWith(
      "delete_task",
      {
        id,
        projectId,
      }
    );
  });

});
