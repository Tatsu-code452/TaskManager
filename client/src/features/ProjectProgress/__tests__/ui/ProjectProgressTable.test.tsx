import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TaskStatus } from "../../../../types/db/task";
import { ProjectProgressTable } from "../../ui/table/ProjectProgressTable";
import {
    createCollapseDispatch,
    createEditDispatch,
    createPageStateDispatch,
    createSelectors,
} from "./mockData";

describe("ProjectProgressTable", () => {
    let pageStateDispatch;
    let editDispatch;
    let collapseDispatch;
    let selectors;
    let baseProps;

    const tasks = [
        {
            id: "t1",
            phase: "P1",
            name: "Task1",
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
        },
    ];

    const dates = ["2024-01-01"];

    beforeEach(() => {
        pageStateDispatch = createPageStateDispatch();
        editDispatch = createEditDispatch();
        collapseDispatch = createCollapseDispatch();
        selectors = createSelectors();

        baseProps = {
            dates,
            tasks,
            baseDate: "2024-01-01",
            projectId: "p1",
            pageStateDispatch,
            editDispatch,
            collapseDispatch,
            selectors,
        };

        vi.clearAllMocks();
    });

    it("TableHeader と TableBody が描画される", () => {
        const { getByText } = render(<ProjectProgressTable {...baseProps} />);
        expect(getByText("タスク名")).toBeTruthy();
        expect(getByText("Task1")).toBeTruthy();
    });

    it("toggleAllPhases が TableHeader 経由で呼ばれる", () => {
        const props = {
            ...baseProps,
            selectors: { ...selectors, allCollapsed: true },
        };

        const { getByText } = render(<ProjectProgressTable {...props} />);

        fireEvent.click(getByText("▶ 全展開"));

        expect(collapseDispatch.toggleAllPhases).toHaveBeenCalledWith(tasks);
    });
});
