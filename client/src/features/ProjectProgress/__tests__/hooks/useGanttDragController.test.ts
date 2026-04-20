import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TaskStatus } from "../../../../types/db/task";
import { useGanttDragController } from "../../hooks/controller/useGanttDragController";
import { TaskModel } from "../../types/model";

// API モック
vi.mock("../../../../api/tauri/taskApi", () => ({
  taskApi: { update: vi.fn() },
}));

describe("useGanttDragController", () => {
  const projectId = "p1";

  const tasks: TaskModel[] = [
    {
      id: "t1",
      phase: "ph1",
      name: "task1",
      status: TaskStatus.NotStarted,
      plan: {
        start: "2024-01-01",
        end: "2024-01-10",
        totalHours: 10,
        progress: 0,
        cells: {},
      },
      actual: {
        start: "2024-01-01",
        end: "2024-01-10",
        totalHours: 10,
        progress: 0,
        cells: {},
      },
    },
  ];

  let onInit: () => void;

  beforeEach(() => {
    onInit = vi.fn();
    vi.clearAllMocks();
  });

  it("初期化で必要なプロパティを返す", () => {
    const { result } = renderHook(() =>
      useGanttDragController(projectId, tasks, onInit),
    );

    expect(result.current).toHaveProperty("onPointerDown");
    expect(result.current).toHaveProperty("onGlobalPointerMove");
    expect(result.current).toHaveProperty("onGlobalPointerUp");
    expect(result.current).toHaveProperty("tooltip");
  });

  it("onPointerDown が pointer capture を設定する", () => {
    const { result } = renderHook(() =>
      useGanttDragController(projectId, tasks, onInit),
    );

    const params = {
      taskId: "t1",
      date: "2024-01-01",
      isPlan: true,
      mode: "move" as const,
    };

    const fakeEvent = {
      target: {
        setPointerCapture: vi.fn(),
        releasePointerCapture: vi.fn(),
      } as unknown as HTMLElement,

      currentTarget: {
        setPointerCapture: vi.fn(),
        releasePointerCapture: vi.fn(),
      } as unknown as HTMLElement,

      pointerId: 1,
      clientX: 0,
      clientY: 0,
    } as unknown as React.PointerEvent<Element>;

    act(() => {
      result.current.onPointerDown(params, fakeEvent);
    });

    expect(fakeEvent.target.setPointerCapture).toHaveBeenCalled();
  });

  it("onGlobalPointerUp: taskApi.update と onInit が呼ばれる", async () => {
    const { taskApi } = await import("../../../../api/tauri/taskApi");

    const { result } = renderHook(() =>
      useGanttDragController(projectId, tasks, onInit),
    );

    // ドロップ先セルをモック
    const cell = document.createElement("td");
    cell.dataset.date = "2024-01-05";
    cell.closest = vi.fn(() => cell);

    globalThis.document.elementFromPoint = vi.fn(() => cell);

    // drag 状態を作るために onPointerDown を呼ぶ
    act(() => {
      result.current.onPointerDown(
        {
          taskId: "t1",
          date: "2024-01-01",
          isPlan: true,
          mode: "move",
        },
        {
          target: { setPointerCapture: vi.fn() },
          currentTarget: { setPointerCapture: vi.fn() },
          pointerId: 1,
          clientX: 0,
          clientY: 0,
        } as unknown as React.PointerEvent,
      );
    });

    const fakeEvent = {
      target: { releasePointerCapture: vi.fn() },
      currentTarget: { releasePointerCapture: vi.fn() },
      pointerId: 1,
      clientX: 0,
      clientY: 0,
    } as unknown as React.PointerEvent;

    await act(async () => {
      await result.current.onGlobalPointerUp(fakeEvent);
    });

    expect(taskApi.update).toHaveBeenCalled();
    expect(onInit).toHaveBeenCalled();
  });
});
