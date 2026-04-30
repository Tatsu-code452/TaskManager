import { fireEvent, render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProjectProgressPage } from "../../ui/ProjectProgressPage";

// --- API モック ---
vi.mock("../../../../api/tauri/taskApi", () => ({
    taskApi: {
        list: vi.fn(() =>
            Promise.resolve([
                {
                    id: "t1",
                    project_id: "p1",
                    phase_id: "P1",
                    name: "Task1",
                    planned_start: "2024-01-01",
                    planned_end: "2024-01-02",
                    planned_hours: 8,
                    actual_start: "2024-01-01",
                    actual_end: "2024-01-02",
                    actual_hours: 8,
                    progress_rate: 50,
                    status: "InProgress",
                },
            ]),
        ),
        update: vi.fn(() => Promise.resolve({})),
        create: vi.fn(() => Promise.resolve({})),
        delete: vi.fn(() => Promise.resolve({})),
    },
}));

vi.mock("../../../../api/tauri/taskPlanCellApi", () => ({
    taskPlanCellApi: {
        list: vi.fn(() =>
            Promise.resolve([
                { task_id: "t1", date: "2024-01-01", hours: 1 },
                { task_id: "t1", date: "2024-01-02", hours: 1 },
            ]),
        ),
        update: vi.fn(() => Promise.resolve({})),
        create: vi.fn(() => Promise.resolve({})),
        delete: vi.fn(() => Promise.resolve({})),
    },
}));

vi.mock("../../../../api/tauri/taskActualCellApi", () => ({
    taskActualCellApi: {
        list: vi.fn(() =>
            Promise.resolve([
                { task_id: "t1", date: "2024-01-01", hours: 1 },
                { task_id: "t1", date: "2024-01-02", hours: 3 },
            ]),
        ),
        update: vi.fn(() => Promise.resolve({})),
        create: vi.fn(() => Promise.resolve({})),
        delete: vi.fn(() => Promise.resolve({})),
    },
}));

// vi.mock("../../domain/repository/taskRepository", () => ({
//     fetchTaskModelList: vi.fn(() =>
//         Promise.resolve([
//             {
//                 id: "t1",
//                 phase: "P1",
//                 name: "Task1",
//                 plan: {
//                     start: "2024-01-01",
//                     end: "2024-01-02",
//                     totalHours: 8,
//                     progress: 50,
//                     cells: { "2024-01-01": 1 },
//                 },
//                 actual: {
//                     start: "2024-01-01",
//                     end: "2024-01-02",
//                     totalHours: 8,
//                     progress: 50,
//                     cells: { "2024-01-01": 1 },
//                 },
//                 status: TaskStatus.InProgress,
//             },
//         ]),
//     ),
// }));

import { taskActualCellApi } from "../../../../api/tauri/taskActualCellApi";
import { taskApi } from "../../../../api/tauri/taskApi";
import { taskPlanCellApi } from "../../../../api/tauri/taskPlanCellApi";

describe("ガントチャート結合テスト（API以外本物）", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("ガントチャートの全操作フローが動作する", async () => {
        const { container, getByText, getByLabelText } = render(
            <ProjectProgressPage projectId="p1" />,
        );

        // --- 初期ロード待ち ---
        await waitFor(() => {
            expect(getByText("Task1")).toBeTruthy();
        });

        // --- 日付レンジ変更 ---
        fireEvent.change(getByLabelText("開始日"), {
            target: { value: "2024-01-01" },
        });
        fireEvent.change(getByLabelText("終了日"), {
            target: { value: "2024-01-10" },
        });
        fireEvent.change(getByLabelText("基準日"), {
            target: { value: "2024-01-04" },
        });

        // --- フェーズ折りたたみ ---
        fireEvent.click(getByText("▼ P1"));
        fireEvent.click(getByText("▶ P1"));

        // --- セル編集（クリック → input → blur） ---
        const cell = container.querySelector(
            'td[data-task-id="t1"][data-date="2024-01-01"]',
        );
        expect(cell).toBeTruthy();

        // CellInteraction を取得
        const interaction = cell!.querySelector(
            '[data-testid="CellInteraction"]',
        );
        expect(interaction).toBeTruthy();

        // Enter で編集開始
        (interaction as HTMLElement).focus();
        fireEvent.keyDown(interaction!, { key: "Enter" });
        console.log(">>>>" + cell.innerHTML);

        const input = await waitFor(() =>
            container.querySelector("input[type='number']"),
        );

        expect(input).toBeTruthy();
        // 値を直接セットし、inputイベントを発火させる
        (input as HTMLElement).focus();
        (input as HTMLInputElement).value = "5";
        fireEvent.input(input!);
        fireEvent.blur(input!);

        // --- API 呼び出し確認 ---
        await waitFor(() => expect(taskPlanCellApi.update).toHaveBeenCalled());
        await waitFor(() =>
            expect(taskActualCellApi.update).not.toHaveBeenCalled(),
        );

        // --- ドラッグ操作 ---
        const dropCell = container.querySelector(
            'td[data-task-id="t1"][data-date="2024-01-05"]',
        );
        expect(dropCell).toBeTruthy();
        dropCell.closest = vi.fn(() => dropCell);
        globalThis.document.elementFromPoint = vi.fn(() => dropCell);

        fireEvent.pointerDown(interaction!, {
            pointerId: 1,
            clientX: 10,
            clientY: 10,
        });

        fireEvent.pointerMove(interaction!, {
            pointerId: 1,
            clientX: 50,
            clientY: 10,
        });
        fireEvent.pointerUp(interaction!, {
            pointerId: 1,
            clientX: 50,
            clientY: 10,
        });

        // --- API 呼び出し確認 ---
        await waitFor(() => expect(taskApi.update).toHaveBeenCalled());

        // --- resize（右端） ---
        const handleRight = cell!.querySelector(".handle_right");
        expect(handleRight).toBeTruthy();

        const dropCell2 = container.querySelector(
            'td[data-task-id="t1"][data-date="2024-01-06"]',
        );
        expect(dropCell2).toBeTruthy();
        globalThis.document.elementFromPoint = vi.fn(() => dropCell2);

        fireEvent.pointerDown(handleRight!, {
            pointerId: 2,
            clientX: 10,
            clientY: 10,
        });

        fireEvent.pointerMove(handleRight!, {
            pointerId: 2,
            clientX: 80,
            clientY: 10,
        });

        fireEvent.pointerUp(handleRight!, {
            pointerId: 2,
            clientX: 80,
            clientY: 10,
        });

        // --- API 呼び出し確認（resize は taskApi ではなく planCell/actualCell） ---
        await waitFor(() => expect(taskPlanCellApi.update).toHaveBeenCalled());

        const handleLeft = cell!.querySelector(".handle_left");
        expect(handleLeft).toBeTruthy();

        const dropCell3 = container.querySelector(
            'td[data-task-id="t1"][data-date="2023-12-30"]',
        );
        expect(dropCell3).toBeTruthy();
        globalThis.document.elementFromPoint = vi.fn(() => dropCell3);

        fireEvent.pointerDown(handleLeft!, {
            pointerId: 3,
            clientX: 10,
            clientY: 10,
        });

        fireEvent.pointerMove(handleLeft!, {
            pointerId: 3,
            clientX: -20,
            clientY: 10,
        });

        fireEvent.pointerUp(handleLeft!, {
            pointerId: 3,
            clientX: -20,
            clientY: 10,
        });

        await waitFor(() => expect(taskPlanCellApi.update).toHaveBeenCalled());
    });
});
