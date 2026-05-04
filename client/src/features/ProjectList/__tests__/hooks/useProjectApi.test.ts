import { renderHook, RenderHookResult } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ProjectSearchResult } from "../../../../types/db/project";
import { payloads, projects, searchCondition } from "./define";
import { createProjectApiMock } from "./mockApi/projectApi";

const projectApiMock = createProjectApiMock();

import { useProjectApi } from "../../hooks/handler/useProjectApi";

describe("useProjectApi", () => {
  let hook: RenderHookResult<ReturnType<typeof useProjectApi>, void>;

  beforeEach(() => {
    hook = renderHook(() => useProjectApi());
  });

  it("should work", () => {
    expect(hook.result.current).toBeDefined();
  });

  it("should call projectApi.create", async () => {
    await hook.result.current.createProject(payloads.create);

    expect(projectApiMock.create).toHaveBeenCalledWith(payloads.create);
  });

  it("should call projectApi.update", async () => {
    await hook.result.current.updateProject(payloads.update);

    expect(projectApiMock.update).toHaveBeenCalledWith(payloads.update);
  });

  it("should call projectApi.search", async () => {
    const expected: ProjectSearchResult = { items: projects, total_num: 120 };
    vi.mocked(projectApiMock.search).mockResolvedValueOnce(expected);

    const result = await hook.result.current.searchProjects(searchCondition.allInput, 1, 30);

    expect(projectApiMock.search).toHaveBeenCalledWith(searchCondition.allInput, 1, 30);
    expect(result).toEqual(expected);
  });
});
