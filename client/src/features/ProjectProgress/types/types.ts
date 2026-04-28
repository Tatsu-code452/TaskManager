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
export type PlanCellTarget = { type: "planCell"; taskId: string; date: string; };
export type ActualCellTarget = { type: "actualCell"; taskId: string; date: string; };

export type EditTarget =
    | PlanCellTarget
    | ActualCellTarget
