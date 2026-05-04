import { renderHook, RenderHookResult } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useProjectListController } from "../../hooks/controller/useProjectListController";
import { projects } from "./define";
import { useProjectListHandlerMock, useProjectListStatesMock } from "./mock";
import { setupMocks } from "./utils";

vi.mock("../../hooks/handler/useProjectListHandler", () => ({
  useProjectListHandler: vi.fn()
}));

vi.mock("../../hooks/state/useProjectListStates", () => ({
  useProjectListStates: vi.fn()
}));

import { useProjectListHandler } from "../../hooks/handler/useProjectListHandler";
import { useProjectListStates } from "../../hooks/state/useProjectListStates";

describe("useProjectListController", () => {

  let hook: RenderHookResult<ReturnType<typeof useProjectListController>, void>;

  beforeEach(() => {
    setupMocks([
      { target: useProjectListHandler, mock: useProjectListHandlerMock },
      { target: useProjectListStates, mock: useProjectListStatesMock },
    ]);

    hook = renderHook(() => useProjectListController());
  });

  it("should work", () => {
    expect(hook.result.current).toBeDefined();
  });

  // -----------------------------
  // modalDispatch
  // -----------------------------

  it("modalDispatch.onOpenCreate should open new modal", () => {
    useProjectListStatesMock.modal.state.data = { mode: "new" };
    hook.result.current.modalDispatch.onOpenCreate();

    expect(useProjectListStatesMock.form.setAll).toHaveBeenCalled();
    expect(useProjectListStatesMock.modal.open.new).toHaveBeenCalled();
  });

  it("modalDispatch.onOpenEdit should open edit modal", () => {
    useProjectListStatesMock.modal.state.data = { mode: "edit" };
    hook.result.current.modalDispatch.onOpenEdit(projects[0]);

    expect(useProjectListStatesMock.form.setAll).toHaveBeenCalled();
    expect(useProjectListStatesMock.modal.open.edit).toHaveBeenCalled();
  });

  it("modalDispatch.onClose should reset form and close modal", () => {
    hook.result.current.modalDispatch.onClose();

    expect(useProjectListStatesMock.form.reset).toHaveBeenCalled();
    expect(useProjectListStatesMock.modal.close).toHaveBeenCalled();
  });

  it("modalDispatch.onConfirm should validate, submit, search, and close", async () => {
    useProjectListHandlerMock.handleValidate.mockReturnValue(true);
    useProjectListHandlerMock.searchProjects.mockResolvedValue({
      items: [],
      total_num: 10,
    });

    await hook.result.current.modalDispatch.onConfirm();

    expect(useProjectListHandlerMock.handleValidate).toHaveBeenCalled();
    expect(useProjectListHandlerMock.handleSubmit).toHaveBeenCalled();
    expect(useProjectListHandlerMock.searchProjects).toHaveBeenCalled();
    expect(useProjectListStatesMock.modal.close).toHaveBeenCalled();
  });

  it("modalDispatch.onConfirm should stop when validate fails", async () => {
    useProjectListHandlerMock.handleValidate.mockReturnValue(false);

    await hook.result.current.modalDispatch.onConfirm();

    expect(useProjectListHandlerMock.handleSubmit).not.toHaveBeenCalled();
    expect(useProjectListStatesMock.modal.close).not.toHaveBeenCalled();
  });

  // -----------------------------
  // pageDispatch
  // -----------------------------

  it("pageDispatch.onChangeSearchCondition should call search.setField", () => {
    hook.result.current.pageDispatch.onChangeSearchCondition("name", "abc");

    expect(useProjectListStatesMock.search.setField).toHaveBeenCalledWith("name", "abc");
  });

  it("pageDispatch.onSearch should call searchProjects", async () => {
    useProjectListHandlerMock.searchProjects.mockResolvedValue({
      items: [],
      total_num: 10,
    });

    await hook.result.current.pageDispatch.onSearch();

    expect(useProjectListHandlerMock.searchProjects).toHaveBeenCalled();
  });

  it("pageDispatch.onClearSearch should reset search and pagination", async () => {
    useProjectListHandlerMock.searchProjects.mockResolvedValue({
      items: [],
      total_num: 10,
    });

    await hook.result.current.pageDispatch.onClearSearch();

    expect(useProjectListStatesMock.search.reset).toHaveBeenCalled();
    expect(useProjectListStatesMock.pagination.reset).toHaveBeenCalled();
  });

  it("pageDispatch.onNextPage should call pagination.next and search", async () => {
    useProjectListHandlerMock.searchProjects.mockResolvedValue({
      items: [],
      total_num: 10,
    });

    await hook.result.current.pageDispatch.onNextPage();

    expect(useProjectListStatesMock.pagination.next).toHaveBeenCalled();
    expect(useProjectListHandlerMock.searchProjects).toHaveBeenCalled();
  });

  it("pageDispatch.onPrevPage should call pagination.prev and search", async () => {
    useProjectListHandlerMock.searchProjects.mockResolvedValue({
      items: [],
      total_num: 10,
    });

    await hook.result.current.pageDispatch.onPrevPage();

    expect(useProjectListStatesMock.pagination.prev).toHaveBeenCalled();
    expect(useProjectListHandlerMock.searchProjects).toHaveBeenCalled();
  });

  it("pageDispatch.onStartEdit should set form values", () => {
    hook.result.current.pageDispatch.onStartEdit(projects[0]);

    expect(useProjectListStatesMock.form.setAll).toHaveBeenCalled();
  });

  it("pageDispatch.onSubmitForm should submit and search", async () => {
    useProjectListHandlerMock.searchProjects.mockResolvedValue({
      items: [],
      total_num: 10,
    });

    await hook.result.current.pageDispatch.onSubmitForm();

    expect(useProjectListHandlerMock.handleSubmit).toHaveBeenCalled();
    expect(useProjectListHandlerMock.searchProjects).toHaveBeenCalled();
  });
});
