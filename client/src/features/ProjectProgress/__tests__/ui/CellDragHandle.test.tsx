import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GanttDrag } from "../../types/hooks";
import { CellDragHandle } from "../../ui/table/cell/CellDragHandle";

describe("CellDragHandle", () => {
    it("コンポーネントが関数として定義されている", () => {
        expect(typeof CellDragHandle).toBe("function");
    });

    it("isStartで左ハンドル、isEndで右ハンドルが描画されクリックでonPointerDownが呼ばれる", () => {
        const onPointerDown = vi.fn();
        let params: GanttDrag = {
            taskId: "t1",
            date: "2024-01-01",
            isPlan: true,
            mode: "resize",
            edge: "start",
        };
        // isStart
        const { container: left } = render(
            <CellDragHandle
                params={params}
                isStart={true}
                isEnd={false}
                onPointerDown={onPointerDown}
            />,
        );
        const leftHandle = left.querySelector("div");
        fireEvent.pointerDown(leftHandle!);
        expect(onPointerDown).toHaveBeenCalledWith(params, expect.any(Object));

        params = {
            taskId: "t1",
            date: "2024-01-01",
            isPlan: true,
            mode: "resize",
            edge: "end",
        };
        // isEnd
        const { container: right } = render(
            <CellDragHandle
                params={params}
                isStart={false}
                isEnd={true}
                onPointerDown={onPointerDown}
            />,
        );

        const rightHandle = right.querySelector("div");
        fireEvent.pointerDown(rightHandle!);
        expect(onPointerDown).toHaveBeenCalledWith(params, expect.any(Object));
    });
});
