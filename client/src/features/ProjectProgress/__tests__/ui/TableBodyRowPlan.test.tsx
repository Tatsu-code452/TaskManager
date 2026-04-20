import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TaskStatus } from "../../../../types/db/task";
import { EditDispatch, RowSelectors } from "../../types/contract";
import { GanttDragController } from "../../types/uiApi";
import { TableBodyRowPlan } from "../../ui/table/TableBodyRowPlan";

describe("TableBodyRowPlan", () => {
    let editDispatch: EditDispatch;
    let selectors: RowSelectors;
    let onPointerDown: GanttDragController["onPointerDown"];
    let tooltip: GanttDragController["tooltip"];
    let baseProps;
    beforeEach(() => {
        editDispatch = {
            startEdit: vi.fn(),
            endEdit: vi.fn(),
        };

        selectors = {
            editTarget: null,
            isEditing: false,
            collapsedPhases: {},
            allCollapsed: false,
        };

        onPointerDown = vi.fn();
        tooltip = {
            state: {
                from: "",
                to: "",
                mode: "move",
                x: 0,
                y: 0,
                visible: false,
            },
            preview: vi.fn(),
            hide: vi.fn(),
        };

        vi.clearAllMocks();

        baseProps = {
            dateList: ["2024-01-01"],
            task,
            baseDate: "2024-01-01",
            editDispatch,
            selectors,
            taskOrder: ["t1"],
            onPointerDown,
            tooltip,
        };
    });

    const task = {
        id: "t1",
        phase: "P",
        name: "Task",
        plan: {
            start: "2024-01-01",
            end: "2024-01-02",
            totalHours: 8,
            progress: 50,
            cells: { "2024-01-01": 1 },
        },
        actual: {
            start: "2024-01-01",
            end: "2024-01-02",
            totalHours: 8,
            progress: 50,
            cells: { "2024-01-01": 1 },
        },
        status: TaskStatus.InProgress,
    };

    it("タスク名・日付セルが描画される", () => {
        const { getByText } = render(<TableBodyRowPlan {...baseProps} />);
        expect(getByText("Task")).toBeTruthy();
        expect(getByText("2024-01-01")).toBeTruthy();
        expect(getByText("8")).toBeTruthy();
        expect(getByText("50%")).toBeTruthy();
    });

    it("editTargetでisEditingがMatrixCellに伝播", () => {
        baseProps.selectors.editTarget = {
            type: "planCell",
            taskIndex: "t1",
            date: "2024-01-01",
        };

        const { container } = render(<TableBodyRowPlan {...baseProps} />);
        // input要素(CellEditor)が出現することでisEditing伝播を確認
        expect(container.querySelector('input[type="number"]')).toBeTruthy();
    });
});
