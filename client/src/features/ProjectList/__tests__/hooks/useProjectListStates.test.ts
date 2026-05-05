import { setup } from "./useProjectListStatesMock";

import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useProjectListStates } from "./../../hooks/state/useProjectListStates";

describe("useProjectListStates", () => {
  let hook;
  let hookResult: ReturnType<typeof useProjectListStates>;

  beforeEach(() => {
    setup();

    hook = renderHook(() => useProjectListStates());
    hookResult = hook.result.current;
  });

  it("should work", () => {
    expect(hookResult).toBeDefined();

    expect(hookResult.projects).toBeDefined();
    expect(hookResult.search).toBeDefined();
    expect(hookResult.modal).toBeDefined();
    expect(hookResult.form).toBeDefined();
    expect(hookResult.pagination).toBeDefined();
  });
});
