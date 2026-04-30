import { Tag, Timestamps } from "./common";

export enum IssueStatus {
    Open = "Open",
    InProgress = "InProgress",
    Review = "Review",
    Resolved = "Resolved",
    Closed = "Closed",
}

export enum IssuePriority {
    Low = "Low",
    Medium = "Medium",
    High = "High",
    Critical = "Critical",
}

export type IssueKey = {
    id: string;
    project_id: string;
};

export type IssueValue = {
    task_id?: string,
    title: string,
    description: string,
    status: IssueStatus,
    priority: IssuePriority,
    owner: string,
    reviewer: string,
    due_date?: string,
    completed_date?: string,
    tags: Tag[],
    timestamps: Timestamps,
};

// Row = Key + Value
export type IssueRow = IssueKey & IssueValue;
export type IssuePayload = IssueKey & Partial<IssueValue>;

export const toIssuePayload = (param: IssueRow): IssuePayload => (
    {
        id: param.id,
        project_id: param.project_id,
        task_id: param.task_id,
        title: param.title,
        description: param.description,
        status: param.status,
        priority: param.priority,
        owner: param.owner,
        reviewer: param.reviewer,
        due_date: param.due_date,
        completed_date: param.due_date,
        tags: param.tags,
    }
)
