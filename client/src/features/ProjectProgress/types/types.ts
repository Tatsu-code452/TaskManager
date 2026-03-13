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
export type EditTarget =
    | { type: "planCell"; taskIndex: string; date: string; pressedKey?: string; }
    | { type: "actualCell"; taskIndex: string; date: string; pressedKey?: string; }
    | { type: "actualProgress"; taskIndex: string; pressedKey?: string; };

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