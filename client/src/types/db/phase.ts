import { Timestamps } from "./common";

export enum PhaseStatus {
    NotStarted = "NotStarted",
    InProgress = "InProgress",
    Completed = "Completed",
}

export type PhaseKey = {
    id: string,
    project_id: string,
}

export type PhaseValue = {
    name: string,
    order: number,
    status: PhaseStatus,
    start_date?: string,
    end_date?: string,
    inputs: string[],
    outputs: string[],
    owner: string,
    timestamps: Timestamps,
}

// Row = Key + Value
export type PhaseRow = PhaseKey & PhaseValue;
export type PhasePayload = PhaseKey & Partial<PhaseValue>;

export const toPhasePayload = (param: PhaseRow): PhasePayload => (
    {
        id: param.id,
        project_id: param.project_id,
        name: param.name,
        order: param.order,
        status: param.status,
        start_date: param.start_date,
        end_date: param.end_date,
        inputs: param.inputs,
        outputs: param.outputs,
        owner: param.owner,
    }
)
