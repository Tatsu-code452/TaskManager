import { Timestamps } from "./common";

export enum IssueStatus {
    Open = "Open",
    InProgress = "InProgress",
    Resolved = "Resolved",
    Closed = "Closed",
}

export enum IssuePriority {
    Low = "Low",
    Medium = "Medium",
    High = "High",
}

export type IssueKey = {
    id: string;
    project_id: string;
};

export type IssueValue = {
    task_id: string;
    title: string;
    description: string;
    status: IssueStatus;
    priority: IssuePriority;
    owner: string;
    timestamps: Timestamps;
};

// Row = Key + Value
export type IssueRow = IssueKey & IssueValue;