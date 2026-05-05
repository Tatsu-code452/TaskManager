
import { setup } from "./useProjectApiMock";

import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useProjectApi } from "./../../hooks/handler/useProjectApi";

import { payloads, projects, searchCondition } from "@features/ProjectList/__tests__/hooks/define";
import { ProjectSearchResult } from "../../../../types/db/project";
import { projectApiMock } from "./mockCommon";

describe("useProjectApi", () => {
  let hook;
  let hookResult: ReturnType<typeof useProjectApi>;

  beforeEach(() => {
    setup();
    hook = renderHook(() => useProjectApi());
    hookResult = hook.result.current;
  });

  it("should work", () => {
    expect(hookResult).toBeDefined();
  });

  it("should call projectApi.create", async () => {
    await hookResult.createProject(payloads.create);

    expect(projectApiMock.create).toHaveBeenCalledWith(payloads.create);
  });

  it("should call projectApi.update", async () => {
    await hookResult.updateProject(payloads.update);

    expect(projectApiMock.update).toHaveBeenCalledWith(payloads.update);
  });

  it("should call projectApi.search", async () => {
    const expected: ProjectSearchResult = { items: projects, total_num: 120 };
    vi.mocked(projectApiMock.search).mockResolvedValueOnce(expected);

    const result = await hookResult.searchProjects(searchCondition.allInput, 1, 30);

    expect(projectApiMock.search).toHaveBeenCalledWith(searchCondition.allInput, 1, 30);
    expect(result).toEqual(expected);
  });
});
