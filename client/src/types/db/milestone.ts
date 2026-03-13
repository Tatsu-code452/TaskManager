import { Timestamps } from "./common";

export enum MilestoneStatus {
    NotStarted = "NotStarted",
    InProgress = "InProgress",
    Done = "Done",
}

export type MilestoneKey = {
    id: string;
    project_id: string;
};

export type MilestoneValue = {
    name: string;
    planned_start_date: string;
    planned_end_date: string;
    actual_start_date: string;
    actual_end_date: string;
    status: MilestoneStatus;
    timestamps: Timestamps;
};

// Row = Key + Value
export type MilestoneRow = MilestoneKey & MilestoneValue;