import Task from "../../../types/task.interface";

export type TaskRowMode =
    | { type: "view" }
    | { type: "edit"; id: number }
    | { type: "new" };

export interface TaskRowViewData {
    name: string;
    projectId: number;
    phaseId: number;
    categoryId: number;
    userId: number;
    planned: string;
    actual: string;
    progressRate: number;
    priority: number;
    rowClass: string;
}

export interface TaskRowEditForm {
    name: string;
    projectId: string;
    phaseId: string;
    categoryId: string;
    userId: string;
    plannedStart: string;
    plannedEnd: string;
    actualStart: string;
    actualEnd: string;
    progressRate: number;
    priority: number;
}

export interface TaskFilter {
    projectId: string;
    phaseId: string;
    userId: string;
}

export type TaskWithUIState = Task & {
    __editing?: boolean;
};

export type TaskDetailPanelEvent =
    | { type: "enterEdit" }
    | { type: "save"; patch: Partial<Task> }
    | { type: "cancelEdit" };