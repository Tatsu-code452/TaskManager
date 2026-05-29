import { Timestamps } from "./common";

export enum MilestoneStatus {
    Open = "Open",
    InProgress = "InProgress",
    Completed = "Completed",
    Archived = "Archived"
}

export type MilestoneKey = {
    id: string;
    project_id: string;
};

export type MilestoneValue = {
    title: string,
    description: string;
    status: MilestoneStatus;
    progress: number,
    start_date: string;
    end_date: string;
    owner: string;
    timestamps: Timestamps;
};

// Row = Key + Value
export type MilestoneRow = MilestoneKey & MilestoneValue;
export type MilestonePayload = MilestoneKey & Partial<MilestoneValue>;

export const toMilestonePayload = (param: MilestoneRow): MilestonePayload => (
    {
        id: param.id,
        project_id: param.project_id,
        title: param.title,
        description: param.description,
        status: param.status,
        progress: param.progress,
        start_date: param.start_date,
        end_date: param.end_date,
        owner: param.owner,
    }
);

export const InitPayload = (project_id: string): MilestonePayload => (
    {
        id: "",
        project_id,
        title: "",
        description: "",
        status: MilestoneStatus.Open,
        progress: 0,
        start_date: "",
        end_date: "",
        owner: "",
    }
);
