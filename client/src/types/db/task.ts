import { Timestamps } from "./common";

export enum TaskStatus {
    NotStarted = "NotStarted",
    InProgress = "InProgress",
    Done = "Done",
}

export type TaskKey = {
    id: string,
    project_id: string,
}

export type TaskValue = {
    phase_id: string,
    name: string,

    planned_start: string,
    planned_end: string,
    actual_start: string,
    actual_end: string,

    planned_hours: number,
    actual_hours: number,
    progress_rate: number,

    status: TaskStatus,
    timestamps: Timestamps,
}

// Row = Key + Value
export type TaskRow = TaskKey & TaskValue;