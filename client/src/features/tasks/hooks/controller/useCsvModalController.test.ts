// useCsvModalController.test.ts
import { renderHook } from "@testing-library/react";
import type { ChangeEvent } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCsvModalController } from "./useCsvModalController";

type FakeTask = {
    id: number;
    title: string;
};

type ImportResult = {
    tasks: FakeTask[] | null;
    errors: string[];
};

// useCsvService のモック用
const importTasksMock = vi.fn<(text: string) => Promise<ImportResult>>();

vi.mock("../handler/useCsvService", () => ({
    useCsvService: () => ({
        importTasks: importTasksMock,
    }),
}));

describe("useCsvModalController", () => {
    beforeEach(() => {
        importTasksMock.mockReset();
    });

    it("初期状態では text と errors が空である", () => {
        const addTasks = vi.fn();
        const onClose = vi.fn();

        const { result } = renderHook(() =>
            useCsvModalController({ addTasks, onClose })
        );

        expect(result.current.text).toBe("");
        expect(result.current.errors).toEqual([]);
    });

    it("onChangeText が呼ばれると text が更新される", () => {
        const addTasks = vi.fn();
        const onClose = vi.fn();

        const { result } = renderHook(() =>
            useCsvModalController({ addTasks, onClose })
        );

        const event: ChangeEvent<HTMLTextAreaElement> = {
            target: { value: "csv content" },
        } as unknown as ChangeEvent<HTMLTextAreaElement>;

        result.current.onChangeText(event);

        expect(result.current.text).toBe("csv content");
    });

    it("handleClickImport 成功時は addTasks と onClose が呼ばれ、text と errors がリセットされる", async () => {
        const addTasks = vi.fn();
        const onClose = vi.fn();

        importTasksMock.mockResolvedValue({
            tasks: [{ id: 1, title: "task1" }],
            errors: [],
        });

        const { result } = renderHook(() =>
            useCsvModalController({ addTasks, onClose })
        );

        const event: ChangeEvent<HTMLTextAreaElement> = {
            target: { value: "csv content" },
        } as unknown as ChangeEvent<HTMLTextAreaElement>;

        result.current.onChangeText(event);

        await result.current.handleImport();

        expect(importTasksMock).toHaveBeenCalledWith("csv content");
        expect(addTasks).toHaveBeenCalledWith([{ id: 1, title: "task1" }]);
        expect(onClose).toHaveBeenCalled();
        expect(result.current.text).toBe("");
        expect(result.current.errors).toEqual([]);
    });

    it("handleClickImport 失敗時は errors が設定され、addTasks と onClose は呼ばれない", async () => {
        const addTasks = vi.fn();
        const onClose = vi.fn();

        importTasksMock.mockResolvedValue({
            tasks: null,
            errors: ["エラー1", "エラー2"],
        });

        const { result } = renderHook(() =>
            useCsvModalController({ addTasks, onClose })
        );

        await result.current.handleImport();

        expect(result.current.errors).toEqual(["エラー1", "エラー2"]);
        expect(addTasks).not.toHaveBeenCalled();
        expect(onClose).not.toHaveBeenCalled();
    });

    it("handleClose は text と errors をリセットし、onClose を呼び出す", () => {
        const addTasks = vi.fn();
        const onClose = vi.fn();

        const { result } = renderHook(() =>
            useCsvModalController({ addTasks, onClose })
        );

        const event: ChangeEvent<HTMLTextAreaElement> = {
            target: { value: "something" },
        } as unknown as ChangeEvent<HTMLTextAreaElement>;

        result.current.onChangeText(event);
        result.current.handleClose();

        expect(result.current.text).toBe("");
        expect(result.current.errors).toEqual([]);
        expect(onClose).toHaveBeenCalled();
    });
});