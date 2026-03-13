import { renderHook } from "@testing-library/react";
import { useProjectFormStates } from "./useProjectFormStates";
import { describe, it, expect, beforeEach } from "vitest";

describe("Hook: useProjectFormStates", () => {

  let hook: ReturnType<typeof useProjectFormStates>;

  beforeEach(() => {
    const { result } = renderHook(() => useProjectFormStates());
    hook = result.current;
  });

  it("初期状態が正しく定義されている", () => {
    expect(hook).toBeDefined();
  });



});
