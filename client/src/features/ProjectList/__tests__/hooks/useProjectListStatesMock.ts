import { vi } from "vitest";

vi.mock("@hooks/useStateObj", () => ({
    useStateObj: vi.fn(),
}));

vi.mock("@hooks/useSearch", () => ({
    useSearch: vi.fn(),
}));

vi.mock("@hooks/useModal", () => ({
    useModal: vi.fn(),
}));

vi.mock("@hooks/useForm", () => ({
    useForm: vi.fn(),
}));

vi.mock("@hooks/usePagination", () => ({
    usePagination: vi.fn(),
}));

import { useForm } from "@hooks/useForm";
import { useModal } from "@hooks/useModal";
import { usePagination } from "@hooks/usePagination";
import { useSearch } from "@hooks/useSearch";
import { useStateObj } from "@hooks/useStateObj";
import { useFormMock, useModalMock, usePaginationMock, useSearchMock, useStateObjMock } from "./mockCommon";
import { setupMocks } from "./utils";

export const setup = () => setupMocks([
    { target: useStateObj, mock: useStateObjMock },
    { target: useSearch, mock: useSearchMock },
    { target: useModal, mock: useModalMock },
    { target: useForm, mock: useFormMock },
    { target: usePagination, mock: usePaginationMock },
]);
