import { Timestamps } from "./common";

export enum ProjectStatus {
    All = "All",
    Planned = "Planned",
    Active = "Active",
    Closed = "Closed",
}

export type ProjectKey = {
    id: string;
}

export type ProjectValue = {
    name: string;
    client: string;
    status: ProjectStatus;
    start_date: string;
    end_date: string;
    timestamps: Timestamps;
}

export type ProjectRow = ProjectKey & ProjectValue;
