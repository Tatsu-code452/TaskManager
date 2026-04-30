import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { TaskStatus } from "../../../../types/db/task";
import { ProjectProgressPage } from "../../ui/ProjectProgressPage";

vi.mock("../../hooks/controller/useProjectProgressController", () => ({
    useProjectProgressController: vi.fn(),
}));

import { useProjectProgressController } from "../../hooks/controller/useProjectProgressController";
import {
    createCollapseDispatch,
    createEditDispatch,
    createPageStateDispatch,
} from "../mockData";

describe("ProjectProgressPage", () => {
    let pageStateDispatch;
    let editDispatch;
    let collapseDispatch;
    let selectors;

    beforeEach(() => {
        pageStateDispatch = createPageStateDispatch();
        editDispatch = createEditDispatch();
        collapseDispatch = createCollapseDispatch();

        selectors = {
            editTarget: null,
            isEditing: false,
            collapsedPhases: { P1: false },
            allCollapsed: false,
        };

        (useProjectProgressController as Mock).mockReturnValue({
            pageState: {
                displayRange: { from: "2024-01-01", to: "2024-01-31" },
                baseDate: "2024-01-01",
                tasks: [
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
                ],
            },
            dates: ["2024-01-01"],
            pageStateDispatch,
            editDispatch,
            collapseDispatch,
            selectors,
            loadTasks: vi.fn(),
        });

        vi.clearAllMocks();
    });

    it("ガントチャート見出し・日付入力・ProjectProgressTableが描画される", () => {
        const { getByText, getAllByLabelText } = render(
            <ProjectProgressPage projectId="p1" />,
        );

        expect(getByText("ガントチャート")).toBeTruthy();
        expect(getAllByLabelText("開始日").length).toBeGreaterThan(0);
        expect(getAllByLabelText("終了日").length).toBeGreaterThan(0);
        expect(getAllByLabelText("基準日").length).toBeGreaterThan(0);
        expect(getByText("Task1")).toBeTruthy();
    });

    it("日付入力で pageStateDispatch が呼ばれる", () => {
        const { getByLabelText } = render(
            <ProjectProgressPage projectId="p1" />,
        );

        fireEvent.change(getByLabelText("開始日"), {
            target: { value: "2024-01-02" },
        });
        expect(pageStateDispatch.setFrom).toHaveBeenCalled();

        fireEvent.change(getByLabelText("終了日"), {
            target: { value: "2024-01-03" },
        });
        expect(pageStateDispatch.setTo).toHaveBeenCalled();

        fireEvent.change(getByLabelText("基準日"), {
            target: { value: "2024-01-04" },
        });
        expect(pageStateDispatch.setBaseDate).toHaveBeenCalled();
    });
});
