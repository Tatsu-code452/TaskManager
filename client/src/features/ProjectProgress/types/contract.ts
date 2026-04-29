import { EditTarget, TaskModel } from "../components/cell";

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


