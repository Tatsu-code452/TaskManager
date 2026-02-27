// CsvImportModal.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { CsvImportModal } from "./CsvImportModal";

// モック関数を外側で保持
let mockText = "";
const mockSetText = vi.fn((v: string) => {
    mockText = v;
});
const mockHandleCsvImport = vi.fn();
const mockHandleClose = vi.fn();

// controller をモック
vi.mock("../../../hooks/controller/useCsvModalController", () => ({
    useCsvModalController: () => ({
        text: mockText,
        setText: mockSetText,
        handleCsvImport: mockHandleCsvImport,
        handleClose: mockHandleClose,
    }),
}));

beforeEach(() => {
    mockText = "";
    vi.clearAllMocks();
});

describe("CsvImportModal", () => {
    const addTasks = vi.fn();
    const onClose = vi.fn();

    const setup = () =>
        render(
            <CsvImportModal
                isOpenCsv={true}
                addTasks={addTasks}
                onClose={onClose}
            />,
        );

    test("モーダルが表示される", () => {
        setup();
        expect(screen.getByText("CSV から一括登録")).toBeInTheDocument();
    });

    test("textarea に入力できる", () => {
        const { rerender } = setup();

        const textarea = screen.getByPlaceholderText(
            "CSV を貼り付けてください",
        ) as HTMLTextAreaElement;

        fireEvent.change(textarea, { target: { value: "name,projectId" } });

        // setText が呼ばれたか
        expect(mockSetText).toHaveBeenCalledWith("name,projectId");

        // ---- 再レンダーが必要 ----
        rerender(
            <CsvImportModal
                isOpenCsv={true}
                addTasks={addTasks}
                onClose={onClose}
            />,
        );

        // UI に反映されているか
        const textarea_after = screen.getByPlaceholderText(
            "CSV を貼り付けてください",
        ) as HTMLTextAreaElement;

        expect(textarea_after.value).toBe("name,projectId");
    });

    test("登録ボタンで handleCsvImport が呼ばれる", () => {
        setup();
        fireEvent.click(screen.getByText("登録"));
        expect(mockHandleCsvImport).toHaveBeenCalled();
    });

    test("閉じるボタンで handleClose が呼ばれる", () => {
        setup();
        fireEvent.click(screen.getByText("閉じる"));
        expect(mockHandleClose).toHaveBeenCalled();
    });
});
