import { TaskModel } from "./model";

export type ProgressAction =
    | { type: "INIT" }
    | { type: "SET_TASKS"; tasks: TaskModel[]; }
    | { type: "SET_FROM"; from: string; }
    | { type: "SET_TO"; to: string; }
    | { type: "SET_BASE_DATE"; baseDate: string; }

/**
 * 編集対象情報
 */
export type PlanCellTarget = { type: "planCell"; taskIndex: string; date: string; pressedKey?: string; };
export type ActualCellTarget = { type: "actualCell"; taskIndex: string; date: string; pressedKey?: string; };
export type ActualProgressTarget = { type: "actualProgress"; taskIndex: string; projectId: string; pressedKey?: string; };

export type EditTarget =
    | PlanCellTarget
    | ActualCellTarget
    | ActualProgressTarget;

export type EditAction =
    | {
        type: "UPDATE_PLAN_CELL";
        task: TaskModel;
        baseDate: string;
        date: string;
        newValue: number;
    }
    | {
        type: "UPDATE_ACTUAL_CELL";
        task: TaskModel;
        baseDate: string;
        date: string;
        newValue: number;
    }
    | {
        type: "UPDATE_ACTUAL_PROGRESS";
        task: TaskModel;
        baseDate: string;
        newValue: number;
    }