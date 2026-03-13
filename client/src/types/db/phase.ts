import { Timestamps } from "./common";


export type PhaseKey = {
    id: string,
    project_id: string,
}

export type PhaseValue = {
    name: string,
    order: number,
    inputs: string[],
    outputs: string[],
    timestamps: Timestamps,
}

// Row = Key + Value
export type PhaseRow = PhaseKey & PhaseValue;