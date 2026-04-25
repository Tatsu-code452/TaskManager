import "./mockApi";
import { createMockApi } from "./mockApi";
const mockApi = createMockApi();

import { fireEvent, render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PlanCellTarget } from "../../types/types";
import { CellDragHandle } from "../../ui/table/cell/CellDragHandle";
import { CellEditor } from "../../ui/table/cell/CellEditor";
import { CellInteraction } from "../../ui/table/cell/CellInteraction";
import { CellVisual } from "../../ui/table/cell/CellVisual";
import { MatrixCell } from "../../ui/table/cell/MatrixCell";

// モック用型
const paramsGantt: GanttParams = {
    taskId: "t1",
    date: "2024-01-01",
    isPlan: true,
};

const dummyEditDispatch = {
    startEdit: vi.fn(),
    endEdit: vi.fn(),
};

const dummyTaskOrder = ["t1"];
const dummyDateList = ["2024-01-01"];

const dummyEditTarget: PlanCellTarget = {
    type: "planCell",
    taskIndex: "t1",
    date: "2024-01-01",
};

export const tasks: TaskModel[] = [
    {
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
    },
];

import { TaskStatus } from "../../../../types/db/task";
import { useGanttDragController } from "../../hooks/controller/useGanttDragController";
import { useMatrixCellController } from "../../hooks/controller/useMatrixCellController";
import { GanttParams } from "../../types/contract";
import { TaskModel } from "../../types/model";

const CellEditorWrap = () => {
    const { onCellKeyDown, onCommit } = useMatrixCellController(
        dummyEditDispatch,
        dummyEditTarget,
        dummyTaskOrder,
        dummyDateList,
    );

    return (
        <CellEditor
            initialValue={3}
            params={paramsGantt}
            onCellKeyDown={onCellKeyDown}
            onCommit={onCommit}
        />
    );
};

const CellDragHandleWrap = () => {
    const onInit = vi.fn();
    const { onPointerDown } = useGanttDragController("p1", tasks, onInit);

    return (
        <CellDragHandle
            params={paramsGantt}
            isStart={true}
            isEnd={false}
            onPointerDown={onPointerDown}
        />
    );
};

const CellInteractionWrap = () => {
    const onInit = vi.fn();
    const { onCellKeyDown, registerCellRef } = useMatrixCellController(
        dummyEditDispatch,
        dummyEditTarget,
        dummyTaskOrder,
        dummyDateList,
    );
    const { onGlobalPointerMove, onGlobalPointerUp, onPointerDown } =
        useGanttDragController("p1", tasks, onInit);

    return (
        <div
            data-testid="gantt_root"
            onPointerMove={onGlobalPointerMove}
            onPointerUp={onGlobalPointerUp}
        >
            <CellInteraction
                params={paramsGantt}
                onPointerDown={onPointerDown}
                onKeyDown={onCellKeyDown}
                onStartEdit={dummyEditDispatch.startEdit}
                ref={(el) => registerCellRef(paramsGantt, el)}
            />
        </div>
    );
};

describe("MatrixCell/CellEditor/CellVisual/CellDragHandle/CellInteraction 結合テスト", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("CellVisualが値を正しく表示する", () => {
        const { getByText } = render(
            <CellVisual
                value={5}
                isPlan={true}
                isToday={false}
                isDelayed={false}
            />,
        );
        expect(getByText("5")).toBeTruthy();
    });

    it("CellEditorで値編集・blurができる", async () => {
        const { container } = render(
            <div>
                <CellEditorWrap />
            </div>,
        );
        const target = container.querySelector("input[type='number']")!;
        const input = target as HTMLInputElement;
        expect(input.value).toBe("3");
        input.value = "7";
        fireEvent.input(input);
        fireEvent.blur(input);
        await waitFor(() =>
            expect(mockApi.taskPlanCellApi.update).toHaveBeenCalled(),
        );
        await waitFor(() =>
            expect(mockApi.taskActualCellApi.update).not.toHaveBeenCalled(),
        );
    });

    it("CellDragHandleの左右ハンドルが描画される", () => {
        const onPointerDown = vi.fn();
        const { container } = render(
            <CellDragHandle
                params={paramsGantt}
                isStart={true}
                isEnd={true}
                onPointerDown={onPointerDown}
            />,
        );
        expect(
            container.querySelector('[data-edge="start-edge"]'),
        ).toBeTruthy();
        expect(container.querySelector('[data-edge="end-edge"]')).toBeTruthy();
    });

    it("CellInteractionがフォーカス・キーダウンを受け取る", () => {
        // const a = useGanttDragController();
        const onPointerDown = vi.fn();
        const onKeyDown = vi.fn();
        const onStartEdit = vi.fn();
        const onGlobalPointerMove = vi.fn();
        const onGlobalPointerUp = vi.fn();
        const { getByTestId } = render(
            <div
                data-testid="gantt_root"
                onPointerMove={onGlobalPointerMove}
                onPointerUp={onGlobalPointerUp}
            >
                <CellInteraction
                    params={paramsGantt}
                    onPointerDown={onPointerDown}
                    onKeyDown={onKeyDown}
                    onStartEdit={onStartEdit}
                />
            </div>,
        );
        const interaction = getByTestId("CellInteraction");
        interaction.focus();
        fireEvent.click(interaction);
        expect(onStartEdit).toHaveBeenCalled();
        fireEvent.keyDown(interaction, { key: "Enter" });
        expect(onKeyDown).toHaveBeenCalled();
        fireEvent.pointerDown(interaction, { pointerId: 1 });
        expect(onPointerDown).toHaveBeenCalled();
        fireEvent.pointerMove(interaction, { pointerId: 1 });
        expect(onGlobalPointerMove).toHaveBeenCalled();
        fireEvent.pointerUp(interaction, { pointerId: 1 });
        expect(onGlobalPointerUp).toHaveBeenCalled();
    });

    it("MatrixCellが編集状態でCellEditorを表示する", async () => {
        // isEditingがtrueになるようeditTargetを渡す
        const { container } = render(
            <MatrixCell
                dateList={dummyDateList}
                editDispatch={dummyEditDispatch}
                editTarget={dummyEditTarget}
                taskOrder={dummyTaskOrder}
                params={paramsGantt}
                CellVisualRenderer={() => (
                    <CellVisual
                        value={1}
                        isPlan={true}
                        isToday={false}
                        isDelayed={false}
                    />
                )}
                CellDragHandleRenderer={() => <CellDragHandleWrap />}
                CellEditorRenderer={() => <CellEditorWrap />}
                CellInteractionRenderer={() => <CellInteractionWrap />}
                DragTooltipRenderer={() => <div>tooltip</div>}
            />,
        );
        expect(container.querySelector("input[type='number']")).toBeTruthy();
    });
});
