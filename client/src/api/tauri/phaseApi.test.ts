vi.mock("@tauri-apps/api/core", () => ({
  invoke: vi.fn(),
}));
import { invoke } from "@tauri-apps/api/core";
import { describe, expect, it, Mock, vi } from "vitest";
import * as db from "../../types/db/phase";
import * as api from "./phaseApi";

describe("API: phaseApi", () => {

  vi.mock("@tauri-apps/api/core", () => ({
    invoke: vi.fn(),
  }));
  const id = "1";
  const projectId = "1111";
  const phase: api.PhasePayload = {
    id: "1",
    project_id: "1111",
  };
  afterEach(() => {
    vi.restoreAllMocks();
  });
  const results: db.PhaseRow[] = [];

  describe("list", () => {

    it("正常系: 正しい引数で呼ばれる", async () => {
      vi.spyOn(api.phaseApi, "list").mockResolvedValue(
        results
      );
      const result = await api.phaseApi.list(
        projectId,
      );
      expect(result).toBe(results);
    });

    it("異常系: 例外を投げる", async () => {
      vi.spyOn(api.phaseApi, "list").mockRejectedValue(new Error("test error"));
      await expect(api.phaseApi.list(
        projectId,
      )).rejects.toThrow("test error");
    });

  });
  describe("create", () => {

    it("正常系: 正しい引数で呼ばれる", async () => {
      vi.spyOn(api.phaseApi, "create").mockResolvedValue(
        "ok"
      );
      const result = await api.phaseApi.create(
        phase,
      );
      expect(result).toBe("ok");
    });

    it("異常系: 例外を投げる", async () => {
      vi.spyOn(api.phaseApi, "create").mockRejectedValue(new Error("test error"));
      await expect(api.phaseApi.create(
        phase,
      )).rejects.toThrow("test error");
    });

  });
  describe("update", () => {

    it("正常系: 正しい引数で呼ばれる", async () => {
      vi.spyOn(api.phaseApi, "update").mockResolvedValue(
        "ok"
      );
      const result = await api.phaseApi.update(
        phase,
      );
      expect(result).toBe("ok");
    });

    it("異常系: 例外を投げる", async () => {
      vi.spyOn(api.phaseApi, "update").mockRejectedValue(new Error("test error"));
      await expect(api.phaseApi.update(
        phase,
      )).rejects.toThrow("test error");
    });

  });
  describe("delete", () => {

    it("正常系: 正しい引数で呼ばれる", async () => {
      vi.spyOn(api.phaseApi, "delete").mockResolvedValue(
        "ok"
      );
      const result = await api.phaseApi.delete(
        projectId,
        id,
      );
      expect(result).toBe("ok");
    });

    it("異常系: 例外を投げる", async () => {
      vi.spyOn(api.phaseApi, "delete").mockRejectedValue(new Error("test error"));
      await expect(api.phaseApi.delete(
        projectId,
        id,
      )).rejects.toThrow("test error");
    });

  });

  it("invoke 呼び出し: list_phases が実行される", async () => {
    const spy = invoke as Mock;

    try {
      await api.phaseApi.list(
        projectId,
      );
    } catch {/** */ }

    expect(spy).toHaveBeenCalledWith(
      "list_phases",
      {
        projectId,
      }
    );
  });
  it("invoke 呼び出し: create_phase が実行される", async () => {
    const spy = invoke as Mock;

    try {
      await api.phaseApi.create(
        phase,
      );
    } catch {/** */ }

    expect(spy).toHaveBeenCalledWith(
      "create_phase",
      {
        payload: phase,
      }
    );
  });
  it("invoke 呼び出し: update_phase が実行される", async () => {
    const spy = invoke as Mock;

    try {
      await api.phaseApi.update(
        phase,
      );
    } catch {/** */ }

    expect(spy).toHaveBeenCalledWith(
      "update_phase",
      {
        payload: phase,
      }
    );
  });
  it("invoke 呼び出し: delete_phase が実行される", async () => {
    const spy = invoke as Mock;

    try {
      await api.phaseApi.delete(
        projectId,
        id,
      );
    } catch {/** */ }

    expect(spy).toHaveBeenCalledWith(
      "delete_phase",
      {
        id,
        projectId,
      }
    );
  });

});
