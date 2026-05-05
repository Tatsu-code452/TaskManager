
import { setup } from "./useProjectListHandlerMock";

import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useProjectListHandler } from "./../../hooks/handler/useProjectListHandler";

import { payloads, projects, searchCondition } from "@features/ProjectList/__tests__/hooks/define";
import { ProjectSearchResult } from "../../../../types/db/project";
import { useProjectApiMock } from "./mock";

describe("useProjectListHandler", () => {
  let hook;
  let hookResult: ReturnType<typeof useProjectListHandler>;

  beforeEach(() => {
    setup();
    vi.spyOn(window, "alert").mockImplementation(() => { });
    hook = renderHook(() => useProjectListHandler());
    hookResult = hook.result.current;
  });

  it("should work", () => {
    expect(hookResult).toBeDefined();
  });

  it("should call useProjectApi.createProject", async () => {
    await hookResult.handleSubmit("new", payloads.create);

    expect(useProjectApiMock.createProject).toHaveBeenCalledWith(payloads.create);
  });

  it("should call useProjectApi.updateProject", async () => {
    await hookResult.handleSubmit("edit", payloads.update);

    expect(useProjectApiMock.updateProject).toHaveBeenCalledWith(payloads.update);
  });

  it("should call useProjectApi.search", async () => {
    const expected: ProjectSearchResult = { items: projects, total_num: 120 };
    vi.mocked(useProjectApiMock.searchProjects).mockResolvedValueOnce(expected);

    const result = await hookResult.searchProjects(searchCondition.allInput, 1, 30);

    expect(useProjectApiMock.searchProjects).toHaveBeenCalledWith(searchCondition.allInput, 1, 30);
    expect(result).toEqual(expected);
  });

  it("should return false and alert when required fields are empty", () => {
    const result = hookResult.handleValidate(payloads.invalidEmpty);

    expect(result).toBe(false);
    expect(window.alert).toHaveBeenCalled();
  });

  it("should return false when start_date > end_date", () => {
    const result = hookResult.handleValidate(payloads.invalidDate);

    expect(result).toBe(false);
    expect(window.alert).toHaveBeenCalled();
  });

  it("should return true when all fields are valid", () => {
    const result = hookResult.handleValidate(payloads.valid);

    expect(result).toBe(true);
    expect(window.alert).not.toHaveBeenCalled();
  });
});
