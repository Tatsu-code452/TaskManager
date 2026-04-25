import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PlanCellTarget } from "../../types/types";
import { MatrixCell } from "../../ui/table/cell/MatrixCell";
import { editDispatch } from "../mockData";
import {
    MockDragHandle,
    MockEditor,
    MockInteraction,
    MockTooltip,
    MockVisual,
} from "./mockComponents";

describe("MatrixCell", () => {
    const baseProps = {
        dateList: ["2024-01-01"],
        editDispatch,
        editTarget: null,
        taskOrder: ["t1"],
        params: {
            taskId: "t1",
            date: "2024-01-01",
            isPlan: true,
        },
        CellVisualRenderer: MockVisual,
        CellDragHandleRenderer: MockDragHandle,
        CellEditorRenderer: MockEditor,
        CellInteractionRenderer: MockInteraction,
        DragTooltipRenderer: MockTooltip,
    };

    it("CellVisual, CellDragHandle, CellInteraction, DragTooltip が描画される", () => {
        const { container, getByText, getByTestId } = render(
            <MatrixCell {...baseProps} />,
        );

        expect(container.querySelector("td")).toBeTruthy();
        expect(getByText("1")).toBeTruthy(); // MockVisual
        expect(getByTestId("drag-handle")).toBeTruthy();
        expect(getByTestId("interaction")).toBeTruthy();
        expect(getByTestId("tooltip")).toBeTruthy();
    });

    it("isEditing=true で CellEditor が出現", () => {
        const props = {
            ...baseProps,
            editTarget: {
                type: "planCell",
                taskIndex: "t1",
                date: "2024-01-01",
            } as PlanCellTarget,
        };

        const { container } = render(<MatrixCell {...props} />);
        expect(container.querySelector('input[type="number"]')).toBeTruthy();
    });

    it("startDrag が CellDragHandle 経由で呼ばれる", () => {
        const startDrag = vi.fn();

        // DragHandleRenderer に startDrag を渡す
        const props = {
            ...baseProps,
            CellDragHandleRenderer: ({ params }) => (
                <div
                    data-testid="drag-handle"
                    onPointerDown={(e) => startDrag(params, e)}
                />
            ),
        };

        const { getByTestId } = render(<MatrixCell {...props} />);

        const handle = getByTestId("drag-handle");
        fireEvent.pointerDown(handle);

        expect(startDrag).toHaveBeenCalled();
    });
});
