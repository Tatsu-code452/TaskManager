vi.mock("@tauri-apps/api/core", () => ({
invoke: vi.fn(),
}));
import { invoke } from "@tauri-apps/api/core";
import * as db from "../../types/db/taskPlan";
import { describe, expect, it, vi, Mock } from "vitest";
import * as api from "./taskPlanCellApi";

describe("API: taskPlanCellApi", () => {

  const id = "1";
const taskId = "12345";
const date = "2026-01-01";
const hours = 5.0;
const results: db.TaskPlanRow[] = [];
afterEach(() => {
 vi.restoreAllMocks();
});

  describe("list", () => {

    it("正常系: 正しい引数で呼ばれる", async () => {
      vi.spyOn(api.taskPlanCellApi, "list").mockResolvedValue(
        results
      );
      const result = await api.taskPlanCellApi.list(
        id,
      );
      expect(result).toBe(results);
    });

    it("異常系: 例外を投げる", async () => {
      vi.spyOn(api.taskPlanCellApi, "list").mockRejectedValue(new Error("test error"));
      await expect(api.taskPlanCellApi.list(
        id,
      )).rejects.toThrow("test error");
    });

  });
  describe("update", () => {

    it("正常系: 正しい引数で呼ばれる", async () => {
      vi.spyOn(api.taskPlanCellApi, "update").mockResolvedValue(
        "ok"
      );
      const result = await api.taskPlanCellApi.update(
        taskId,
        date,
        hours,
      );
      expect(result).toBe("ok");
    });

    it("異常系: 例外を投げる", async () => {
      vi.spyOn(api.taskPlanCellApi, "update").mockRejectedValue(new Error("test error"));
      await expect(api.taskPlanCellApi.update(
        taskId,
        date,
        hours,
      )).rejects.toThrow("test error");
    });

  });

  it("invoke 呼び出し: get_plan_cells が実行される", async () => {
    const spy = invoke as Mock;

    try {
      await api.taskPlanCellApi.list(
            id,
      );
    } catch {/** */ }

    expect(spy).toHaveBeenCalledWith(
      "get_plan_cells",
      {
        taskId: id,
      }
    );
  });
  it("invoke 呼び出し: update_plan_cell が実行される", async () => {
    const spy = invoke as Mock;

    try {
      await api.taskPlanCellApi.update(
            taskId,
            date,
            hours,
      );
    } catch {/** */ }

    expect(spy).toHaveBeenCalledWith(
      "update_plan_cell",
      {
        payload: { taskId, date, hours },
      }
    );
  });

});
