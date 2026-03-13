import { renderHook } from "@testing-library/react";
import { useProjectListStates } from "./useProjectListStates";
import { describe, it, expect, beforeEach } from "vitest";

describe("Hook: useProjectListStates", () => {

  let hook: ReturnType<typeof useProjectListStates>;

  beforeEach(() => {
    const { result } = renderHook(() => useProjectListStates());
    hook = result.current;
  });

  it("初期状態が正しく定義されている", () => {
    expect(hook).toBeDefined();
  });



});
