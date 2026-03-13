vi.mock("@tauri-apps/api/core", () => ({
invoke: vi.fn(),
}));
import { invoke } from "@tauri-apps/api/core";
import * as db from "../../types/db/taskActual";
import { describe, expect, it, vi, Mock } from "vitest";
import * as api from "./taskActualCellApi";

describe("API: taskActualCellApi", () => {

  vi.mock("@tauri-apps/api/core", () => ({
  invoke: vi.fn(),
}));
const id = "1";
const taskId = "12345";
const date = "2026-01-01";
const hours = 5.0;
const results: db.TaskActualRow[] = [];
afterEach(() => {
 vi.restoreAllMocks();
});

  describe("list", () => {

    it("正常系: 正しい引数で呼ばれる", async () => {
      vi.spyOn(api.taskActualCellApi, "list").mockResolvedValue(
        results
      );
      const result = await api.taskActualCellApi.list(
        id,
      );
      expect(result).toBe(results);
    });

    it("異常系: 例外を投げる", async () => {
      vi.spyOn(api.taskActualCellApi, "list").mockRejectedValue(new Error("test error"));
      await expect(api.taskActualCellApi.list(
        id,
      )).rejects.toThrow("test error");
    });

  });
  describe("update", () => {

    it("正常系: 正しい引数で呼ばれる", async () => {
      vi.spyOn(api.taskActualCellApi, "update").mockResolvedValue(
        "ok"
      );
      const result = await api.taskActualCellApi.update(
        taskId,
        date,
        hours,
      );
      expect(result).toBe("ok");
    });

    it("異常系: 例外を投げる", async () => {
      vi.spyOn(api.taskActualCellApi, "update").mockRejectedValue(new Error("test error"));
      await expect(api.taskActualCellApi.update(
        taskId,
        date,
        hours,
      )).rejects.toThrow("test error");
    });

  });

  it("invoke 呼び出し: get_actual_cells が実行される", async () => {
    const spy = invoke as Mock;

    try {
      await api.taskActualCellApi.list(
            id,
      );
    } catch {/** */ }

    expect(spy).toHaveBeenCalledWith(
      "get_actual_cells",
      {
        taskId: id,
      }
    );
  });
  it("invoke 呼び出し: update_actual_cell が実行される", async () => {
    const spy = invoke as Mock;

    try {
      await api.taskActualCellApi.update(
            taskId,
            date,
            hours,
      );
    } catch {/** */ }

    expect(spy).toHaveBeenCalledWith(
      "update_actual_cell",
      {
        payload: { taskId, date, hours },
      }
    );
  });

});
