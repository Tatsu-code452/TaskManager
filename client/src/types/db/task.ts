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
    planned_hours: number,

    actual_start: string,
    actual_end: string,
    actual_hours: number,

    progress_rate: number,
    status: TaskStatus,
    timestamps: Timestamps,
}

// Row = Key + Value
export type TaskRow = TaskKey & TaskValue;
export type TaskPayload = TaskKey & Partial<TaskValue>;

export const toTaskPayload = (param: TaskRow): TaskPayload => (
    {
        id: param.id,
        project_id: param.project_id,
        phase_id: param.phase_id,
        name: param.name,
        planned_start: param.planned_start,
        planned_end: param.planned_end,
        planned_hours: param.planned_hours,
        actual_start: param.actual_start,
        actual_end: param.actual_end,
        actual_hours: param.actual_hours,
        progress_rate: param.progress_rate,
        status: param.status,
    }
)
