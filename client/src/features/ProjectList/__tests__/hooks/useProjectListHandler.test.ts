
import { renderHook, RenderHookResult } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProjectSearchResult } from "../../../../types/db/project";
import { useProjectListHandler } from "../../hooks/handler/useProjectListHandler";
import { payloads, projects, searchCondition } from "./define";
import { useProjectApiMock } from "./mock";
import { useMessageMock } from "./mockCommon";
import { setupMocks } from "./utils";

vi.mock("../../../../../hooks/useMessage", () => ({
  useMessage: vi.fn(() => useMessageMock),
}));

vi.mock("../../hooks/handler/useProjectApi", () => ({
  useProjectApi: vi.fn(),
}));

import { useProjectApi } from "../../hooks/handler/useProjectApi";

describe("useProjectListHandler", () => {
  let hook: RenderHookResult<ReturnType<typeof useProjectListHandler>, void>;

  beforeEach(() => {
    setupMocks([{ target: useProjectApi, mock: useProjectApiMock }]);
    vi.spyOn(window, "alert").mockImplementation(() => { });
    hook = renderHook(() => useProjectListHandler());
  });

  it("should work", () => {
    expect(hook.result.current).toBeDefined();
  });

  it("should call useProjectApi.createProject", async () => {
    await hook.result.current.handleSubmit("new", payloads.create);

    expect(useProjectApiMock.createProject).toHaveBeenCalledWith(payloads.create);
  });

  it("should call useProjectApi.updateProject", async () => {
    await hook.result.current.handleSubmit("edit", payloads.update);

    expect(useProjectApiMock.updateProject).toHaveBeenCalledWith(payloads.update);
  });

  it("should call useProjectApi.search", async () => {
    const expected: ProjectSearchResult = { items: projects, total_num: 120 };
    vi.mocked(useProjectApiMock.searchProjects).mockResolvedValueOnce(expected);

    const result = await hook.result.current.searchProjects(searchCondition.allInput, 1, 30);

    expect(useProjectApiMock.searchProjects).toHaveBeenCalledWith(searchCondition.allInput, 1, 30);
    expect(result).toEqual(expected);
  });

  it("should return false and alert when required fields are empty", () => {
    const result = hook.result.current.handleValidate(payloads.invalidEmpty);

    expect(result).toBe(false);
    expect(window.alert).toHaveBeenCalled();
  });

  it("should return false when start_date > end_date", () => {
    const result = hook.result.current.handleValidate(payloads.invalidDate);

    expect(result).toBe(false);
    expect(window.alert).toHaveBeenCalled();
  });

  it("should return true when all fields are valid", () => {
    const result = hook.result.current.handleValidate(payloads.valid);

    expect(result).toBe(true);
    expect(window.alert).not.toHaveBeenCalled();
  });
});
