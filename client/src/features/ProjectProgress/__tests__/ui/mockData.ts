// mockData.ts
import { vi } from "vitest";
import { TaskStatus } from "../../../../types/db/task";
import { EditDispatch, PageStateDispatch } from "../../types/contract";
import { TooltipApi } from "../../types/uiApi";

export const baseTask = {
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

export const createPageStateDispatch = (): PageStateDispatch => ({
    init: vi.fn(),
    setTasks: vi.fn(),
    setFrom: vi.fn(),
    setTo: vi.fn(),
    setBaseDate: vi.fn(),
});

export const createEditDispatch = (): EditDispatch => ({
    startEdit: vi.fn(),
    endEdit: vi.fn(),
});

export const createCollapseDispatch = () => ({
    togglePhase: vi.fn(),
    toggleAllPhases: vi.fn(),
});

export const createSelectors = () => ({
    editTarget: null,
    isEditing: false,
    collapsedPhases: { P1: false, P2: false },
    allCollapsed: false,
});

export const createTooltip = (): TooltipApi => ({
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
});
