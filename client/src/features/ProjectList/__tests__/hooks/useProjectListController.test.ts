
import { setupUseProjectListHandlerMock, useProjectListHandlerMock } from "@features/ProjectList/__tests__/hooks/mocks/useProjectListHandlerMock";
import { setupUseProjectListStatesMock, useProjectListStatesMock } from "@features/ProjectList/__tests__/hooks/mocks/useProjectListStatesMock";

import { projects } from "@features/ProjectList/__tests__/tables";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useProjectListController } from "./../../hooks/controller/useProjectListController";

describe("useProjectListController", () => {
  let hook;
  let hookResult: ReturnType<typeof useProjectListController>;

  beforeEach(() => {
    setupUseProjectListHandlerMock();
    setupUseProjectListStatesMock();
    hook = renderHook(() => useProjectListController());
    hookResult = hook.result.current;
  });

  it("should work", () => {
    expect(hookResult).toBeDefined();
  });

  // -----------------------------
  // modalDispatch
  // -----------------------------

  it("modalDispatch.onOpenCreate should open new modal", () => {
    useProjectListStatesMock.modal.state.data = { mode: "new" };
    hookResult.modalDispatch.onOpenCreate();

    expect(useProjectListStatesMock.form.setAll).toHaveBeenCalled();
    expect(useProjectListStatesMock.modal.open.new).toHaveBeenCalled();
  });

  it("modalDispatch.onOpenEdit should open edit modal", () => {
    useProjectListStatesMock.modal.state.data = { mode: "edit" };
    hookResult.modalDispatch.onOpenEdit(projects[0]);

    expect(useProjectListStatesMock.form.setAll).toHaveBeenCalled();
    expect(useProjectListStatesMock.modal.open.edit).toHaveBeenCalled();
  });

  it("modalDispatch.onClose should reset form and close modal", () => {
    hookResult.modalDispatch.onClose();

    expect(useProjectListStatesMock.form.reset).toHaveBeenCalled();
    expect(useProjectListStatesMock.modal.close).toHaveBeenCalled();
  });

  it("modalDispatch.onConfirm should validate, submit, search, and close", async () => {
    useProjectListHandlerMock.handleValidate.mockReturnValue(true);
    useProjectListHandlerMock.searchProjects.mockResolvedValue({
      items: [],
      total_num: 10,
    });

    await hookResult.modalDispatch.onConfirm();

    expect(useProjectListHandlerMock.handleValidate).toHaveBeenCalled();
    expect(useProjectListHandlerMock.handleSubmit).toHaveBeenCalled();
    expect(useProjectListHandlerMock.searchProjects).toHaveBeenCalled();
    expect(useProjectListStatesMock.modal.close).toHaveBeenCalled();
  });

  it("modalDispatch.onConfirm should stop when validate fails", async () => {
    useProjectListHandlerMock.handleValidate.mockReturnValue(false);

    await hookResult.modalDispatch.onConfirm();

    expect(useProjectListHandlerMock.handleSubmit).not.toHaveBeenCalled();
    expect(useProjectListStatesMock.modal.close).not.toHaveBeenCalled();
  });

  // -----------------------------
  // pageDispatch
  // -----------------------------

  it("pageDispatch.onChangeSearchCondition should call search.setField", () => {
    hookResult.pageDispatch.onChangeSearchCondition("name", "abc");

    expect(useProjectListStatesMock.search.setField).toHaveBeenCalledWith("name", "abc");
  });

  it("pageDispatch.onSearch should call searchProjects", async () => {
    useProjectListHandlerMock.searchProjects.mockResolvedValue({
      items: [],
      total_num: 10,
    });

    await hookResult.pageDispatch.onSearch();

    expect(useProjectListHandlerMock.searchProjects).toHaveBeenCalled();
  });

  it("pageDispatch.onClearSearch should reset search and pagination", async () => {
    useProjectListHandlerMock.searchProjects.mockResolvedValue({
      items: [],
      total_num: 10,
    });

    await hookResult.pageDispatch.onClearSearch();

    expect(useProjectListStatesMock.search.reset).toHaveBeenCalled();
    expect(useProjectListStatesMock.pagination.reset).toHaveBeenCalled();
  });

  it("pageDispatch.onNextPage should call pagination.next and search", async () => {
    useProjectListHandlerMock.searchProjects.mockResolvedValue({
      items: [],
      total_num: 10,
    });

    await hookResult.pageDispatch.onNextPage();

    expect(useProjectListStatesMock.pagination.next).toHaveBeenCalled();
    expect(useProjectListHandlerMock.searchProjects).toHaveBeenCalled();
  });

  it("pageDispatch.onPrevPage should call pagination.prev and search", async () => {
    useProjectListHandlerMock.searchProjects.mockResolvedValue({
      items: [],
      total_num: 10,
    });

    await hookResult.pageDispatch.onPrevPage();

    expect(useProjectListStatesMock.pagination.prev).toHaveBeenCalled();
    expect(useProjectListHandlerMock.searchProjects).toHaveBeenCalled();
  });

  it("pageDispatch.onStartEdit should set form values", () => {
    hookResult.pageDispatch.onStartEdit(projects[0]);

    expect(useProjectListStatesMock.form.setAll).toHaveBeenCalled();
  });

  it("pageDispatch.onSubmitForm should submit and search", async () => {
    useProjectListHandlerMock.searchProjects.mockResolvedValue({
      items: [],
      total_num: 10,
    });

    await hookResult.pageDispatch.onSubmitForm();

    expect(useProjectListHandlerMock.handleSubmit).toHaveBeenCalled();
    expect(useProjectListHandlerMock.searchProjects).toHaveBeenCalled();
  });

  it("pageDispatch.onRemove should delete and search", async () => {
    useProjectListHandlerMock.searchProjects.mockResolvedValue({
      items: [],
      total_num: 10,
    });

    await hookResult.pageDispatch.onRemove(projects[0].id);

    expect(useProjectListHandlerMock.deleteProject).toHaveBeenCalled();
    expect(useProjectListHandlerMock.searchProjects).toHaveBeenCalled();
  });

});
