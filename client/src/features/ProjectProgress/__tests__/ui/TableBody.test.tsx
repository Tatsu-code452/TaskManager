import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TaskRow, TaskStatus } from "../../../../types/db/task";
import { TaskActualRow } from "../../../../types/db/taskActual";
import { TaskPlanRow } from "../../../../types/db/taskPlan";
import { toTaskModelFromRows } from "../../domain/model/toTaskModelFromRows";
import { TooltipApi } from "../../types/uiApi";
import { TableBody } from "../../ui/table/TableBody";

describe("TableBody", () => {
    const taskRows: TaskRow[] = [
        {
            id: "t1",
            project_id: "p1",
            phase_id: "P1",
            name: "Task1",
            planned_start: "2024-01-01",
            planned_end: "2024-01-10",
            planned_hours: 10,
            actual_start: "2024-01-02",
            actual_end: "2024-01-11",
            actual_hours: 12,
            progress_rate: 50,
            status: TaskStatus.InProgress,
            timestamps: { created_at: "", updated_at: "" },
        },
        {
            id: "t2",
            project_id: "p1",
            phase_id: "P2",
            name: "Task2",
            planned_start: "2024-01-01",
            planned_end: "2024-01-10",
            planned_hours: 10,
            actual_start: "2024-01-02",
            actual_end: "2024-01-11",
            actual_hours: 12,
            progress_rate: 50,
            status: TaskStatus.InProgress,
            timestamps: { created_at: "", updated_at: "" },
        },
    ];

    const planCells: TaskPlanRow[] = [
        { task_id: "t1", date: "2024-01-01", hours: 5 },
    ];

    const actualCells: TaskActualRow[] = [
        { task_id: "t1", date: "2024-01-02", hours: 6 },
    ];

    const tasks = taskRows.map((t) =>
        toTaskModelFromRows(t, planCells, actualCells),
    );

    const dates = ["2024-01-01"];

    const editDispatch = {
        startEdit: vi.fn(),
        endEdit: vi.fn(),
    };

    const collapseDispatch = {
        togglePhase: vi.fn(),
        toggleAllPhases: vi.fn(),
    };

    const selectors = {
        editTarget: null,
        isEditing: false,
        collapsedPhases: { P1: false, P2: false },
        allCollapsed: false,
    };

    const onPointerDown = vi.fn();

    const tooltip: TooltipApi = {
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

    const baseProps = {
        dates,
        tasks,
        baseDate: "2024-01-01",
        editDispatch,
        collapseDispatch,
        selectors,
        onPointerDown,
        tooltip,
    };

    it("タスク名・フェーズ名が描画される", () => {
        const { getByText } = render(<TableBody {...baseProps} />);
        expect(getByText("Task1")).toBeTruthy();
        expect(getByText("Task2")).toBeTruthy();
        expect(getByText("P1")).toBeTruthy();
        expect(getByText("P2")).toBeTruthy();
    });

    it("togglePhase がボタンクリックで呼ばれる", () => {
        const { getAllByRole } = render(<TableBody {...baseProps} />);
        const buttons = getAllByRole("button");

        fireEvent.click(buttons[0]);

        expect(collapseDispatch.togglePhase).toHaveBeenCalledWith("P1");
    });

    it("collapsedPhases により行が折りたたまれる", () => {
        const { queryByText, rerender } = render(
            <TableBody
                {...baseProps}
                selectors={{
                    ...selectors,
                    collapsedPhases: { P1: true, P2: false },
                }}
            />,
        );

        expect(queryByText("Task1")).toBeNull();
        expect(queryByText("Task2")).toBeTruthy();

        rerender(
            <TableBody
                {...baseProps}
                selectors={{
                    ...selectors,
                    collapsedPhases: { P1: false, P2: true },
                }}
            />,
        );

        expect(queryByText("Task1")).toBeTruthy();
        expect(queryByText("Task2")).toBeNull();
    });
});
