import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GanttParams } from "../../types/contract";
import { CellInteraction } from "../../ui/table/cell/CellInteraction";

describe("CellInteraction", () => {
    it("onPointerDown, onKeyDownが呼ばれる", async () => {
        const onPointerDown = vi.fn();
        const onKeyDown = vi.fn();
        const params: GanttParams = {
            taskId: "test",
            date: "2024-01-01",
            isPlan: true,
        };
        const { findByTestId } = render(
            <CellInteraction
                params={params}
                onPointerDown={onPointerDown}
                onKeyDown={onKeyDown}
            />,
        );
        const div = await findByTestId("CellInteraction");
        fireEvent.pointerDown(div);
        expect(onPointerDown).toHaveBeenCalledWith(
            { ...params, mode: "move" },
            expect.any(Object),
        );
        fireEvent.keyDown(div, { key: "Enter" });
        expect(onKeyDown).toHaveBeenCalledWith(params, expect.any(Object));
    });
});
