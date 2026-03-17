import { Timestamps } from "./common";

export enum DefectStatus {
    Open = "Open",
    Fixed = "Fixed",
    Closed = "Closed",
}

export enum DefectSeverity {
    Minor = "Minor",
    Major = "Major",
    Critical = "Critical",
}

export type DefectKey = {
    id: string;
    project_id: string;
};

export type DefectValue = {
    task_id: string;
    title: string;
    description: string;
    severity: DefectSeverity;
    status: DefectStatus;
    timestamps: Timestamps;
};

// Row = Key + Value
export type DefectRow = DefectKey & DefectValue;