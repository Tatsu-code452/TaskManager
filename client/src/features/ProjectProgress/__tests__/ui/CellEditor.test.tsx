import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CellEditor } from "../../ui/table/cell/CellEditor";

describe("CellEditor", () => {
    it("コンポーネントが関数として定義されている", () => {
        expect(typeof CellEditor).toBe("function");
    });

    it("初期値がinputに表示される", () => {
        const { getByRole } = render(
            <CellEditor
                initialValue={123}
                params={{
                    taskId: "t1",
                    date: "2024-01-01",
                    isPlan: true,
                }}
                onCellKeyDown={() => {}}
            />,
        );
        const input = getByRole("spinbutton") as HTMLInputElement;
        expect(input.value).toBe("123");
    });

    it("onCellKeyDownが呼ばれる", () => {
        const onCellKeyDown = vi.fn();
        const params = {
            taskId: "t1",
            date: "2024-01-01",
            isPlan: true,
        };
        const { getByRole } = render(
            <CellEditor
                initialValue={1}
                params={params}
                onCellKeyDown={onCellKeyDown}
            />,
        );
        const input = getByRole("spinbutton");
        fireEvent.keyDown(input, { key: "Enter" });
        expect(onCellKeyDown).toHaveBeenCalledWith(params, expect.any(Object));
    });

    it("マウント時に自動でフォーカスされる", () => {
        const { getByRole } = render(
            <CellEditor
                initialValue={1}
                params={{
                    taskId: "t1",
                    date: "2024-01-01",
                    isPlan: true,
                }}
                onCellKeyDown={() => {}}
            />,
        );
        const input = getByRole("spinbutton");
        expect(document.activeElement === input).toBe(true);
    });
});
