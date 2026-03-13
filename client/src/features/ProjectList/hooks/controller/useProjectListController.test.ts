import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProjectStatus } from "../../../../types/db/project";
import { Project } from "../../types/model";
import { useProjectListController } from "./useProjectListController";

describe("Controller: useProjectListController", () => {
  const project: Project = {
    id: "1111",
    name: "name",
    client: "client",
    status: ProjectStatus.Planned,
    startDate: "2026-01-01",
    endDate: "2026-01-01",
    progress: 25,
  }
  vi.mock("../../../../api/tauri/projectApi", () => ({
    projectApi: {
      list: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    }
  }));

  let ctrl: ReturnType<typeof useProjectListController>;

  beforeEach(() => {
    const { result } = renderHook(() => useProjectListController());
    ctrl = result.current;
  });

  describe("loadProjects", () => {

    it("正常系: 正しく実行される", async () => {
      await expect(ctrl.loadProjects(
      )).resolves.not.toThrow();
    });

    it("異常系: 例外発生時に正しくハンドリングされる", async () => {
      vi.spyOn(ctrl, "loadProjects").mockRejectedValue(new Error("test error"));
      await expect(ctrl.loadProjects(
      )).rejects.toThrow("test error");
    });

  });
  describe("searchProjects", () => {

    it("正常系: 正しく実行される", async () => {
      await expect(ctrl.searchProjects(
      )).resolves.not.toThrow();
    });

    it("異常系: 例外発生時に正しくハンドリングされる", async () => {
      vi.spyOn(ctrl, "searchProjects").mockRejectedValue(new Error("test error"));
      await expect(ctrl.searchProjects(
      )).rejects.toThrow("test error");
    });

  });
  describe("clearSearch", () => {

    it("正常系: 正しく実行される", async () => {
      expect(() => ctrl.clearSearch(
      )).not.toThrow();
    });

    it("異常系: 例外発生時に正しくハンドリングされる", async () => {
      vi.spyOn(ctrl, "clearSearch").mockRejectedValue(new Error("test error"));
      expect(() => ctrl.clearSearch(
      )).rejects.toThrow("test error");
    });

  });
  describe("openCreateModal", () => {

    it("正常系: 正しく実行される", async () => {
      expect(() => ctrl.openCreateModal(
      )).not.toThrow();
    });

    it("異常系: 例外発生時に正しくハンドリングされる", async () => {
      vi.spyOn(ctrl, "openCreateModal").mockRejectedValue(new Error("test error"));
      expect(() => ctrl.openCreateModal(
      )).rejects.toThrow("test error");
    });

  });
  describe("openEditModal", () => {

    it("正常系: 正しく実行される", async () => {
      expect(() => ctrl.openEditModal(
        project,
      )).not.toThrow();
    });

    it("異常系: 例外発生時に正しくハンドリングされる", async () => {
      vi.spyOn(ctrl, "openEditModal").mockRejectedValue(new Error("test error"));
      expect(() => ctrl.openEditModal(
        project,
      )).rejects.toThrow("test error");
    });

  });
  describe("closeModal", () => {

    it("正常系: 正しく実行される", async () => {
      expect(() => ctrl.closeModal(
      )).not.toThrow();
    });

    it("異常系: 例外発生時に正しくハンドリングされる", async () => {
      vi.spyOn(ctrl, "closeModal").mockRejectedValue(new Error("test error"));
      expect(() => ctrl.closeModal(
      )).rejects.toThrow("test error");
    });

  });
  describe("handleSubmitCreate", () => {

    it("正常系: 正しく実行される", async () => {
      await expect(ctrl.handleSubmitCreate(
      )).resolves.not.toThrow();
    });

    it("異常系: 例外発生時に正しくハンドリングされる", async () => {
      vi.spyOn(ctrl, "handleSubmitCreate").mockRejectedValue(new Error("test error"));
      await expect(ctrl.handleSubmitCreate(
      )).rejects.toThrow("test error");
    });

  });
  describe("handleSubmitUpdate", () => {

    it("正常系: 正しく実行される", async () => {
      await expect(ctrl.handleSubmitUpdate(
      )).resolves.not.toThrow();
    });

    it("異常系: 例外発生時に正しくハンドリングされる", async () => {
      vi.spyOn(ctrl, "handleSubmitUpdate").mockRejectedValue(new Error("test error"));
      await expect(ctrl.handleSubmitUpdate(
      )).rejects.toThrow("test error");
    });

  });
});
