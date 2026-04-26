import { TaskModel } from "./model";
import { EditTarget } from "./types";

export type PageStateDispatch = {
    init: () => void;
    setTasks: (tasks: TaskModel[]) => void;
    setFrom: (from: string) => void;
    setTo: (to: string) => void;
    setBaseDate: (baseDate: string) => void;
};

export type EditDispatch = {
    startEdit: (editTarget: EditTarget) => void;
    endEdit: () => void;
};
export type CollapseDispatch = {
    togglePhase: (phase: string) => void;
    toggleAllPhases: (tasks: TaskModel[]) => void;
};
export type RowSelectors = {
    editTarget: EditTarget;
    isEditing: boolean;
    collapsedPhases: Record<string, boolean>;
    allCollapsed: boolean;
};

export type GanttParams = {
    taskId: string,
    date: string,
    isPlan: boolean,
    currentDate?: string;
};
