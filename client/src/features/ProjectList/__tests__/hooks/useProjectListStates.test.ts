import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useProjectListStates } from "../../hooks/state/useProjectListStates";
import { useFormMock, useModalMock, usePaginationMock, useSearchMock, useStateObjMock } from "./mockCommon";

import { beforeEach } from "vitest";

vi.mock("../../../../hooks/useStateObj", () => ({
  useStateObj: vi.fn(),
}));

vi.mock("../../../../hooks/useSearch", () => ({
  useSearch: vi.fn(),
}));

vi.mock("../../../../hooks/useModal", () => ({
  useModal: vi.fn(),
}));

vi.mock("../../../../hooks/useForm", () => ({
  useForm: vi.fn(),
}));

vi.mock("../../../../hooks/usePagination", () => ({
  usePagination: vi.fn(),
}));

// --- 空モックを import ---
import { useForm } from "../../../../hooks/useForm";
import { useModal } from "../../../../hooks/useModal";
import { usePagination } from "../../../../hooks/usePagination";
import { useSearch } from "../../../../hooks/useSearch";
import { useStateObj } from "../../../../hooks/useStateObj";
import { setupMocks } from "./utils";

describe("useProjectListStates", () => {
  beforeEach(() => {
    setupMocks([
      { target: useStateObj, mock: useStateObjMock },
      { target: useSearch, mock: useSearchMock },
      { target: useModal, mock: useModalMock },
      { target: useForm, mock: useFormMock },
      { target: usePagination, mock: usePaginationMock },
    ]);
  });

  it("should work", () => {
    const { result } = renderHook(() => useProjectListStates());

    expect(result.current).toBeDefined();

    expect(result.current.projects).toBeDefined();
    expect(result.current.search).toBeDefined();
    expect(result.current.modal).toBeDefined();
    expect(result.current.form).toBeDefined();
    expect(result.current.pagination).toBeDefined();
  });
});
