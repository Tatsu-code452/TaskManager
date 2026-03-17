import { IssuePayload } from "../../../api/tauri/issueApi";
import { IssuePriority, IssueRow, IssueStatus } from "../../../types/db/issue";

export const statusToLabel = (status: IssueStatus): string => {
    switch (status) {
        case IssueStatus.Open:
            return "未対応";
        case IssueStatus.InProgress:
            return "対応中";
        case IssueStatus.Resolved:
            return "対応済み";
        case IssueStatus.Closed:
            return "完了";
        default:
            return "";
    }
};

export interface Issue {
    id: string;
    projectId: string;
    taskId: string;
    title: string;
    description: string;
    status: IssueStatus;
    priority: IssuePriority;
    owner: string;
}

export const toIssue = (param: IssueRow): Issue => (
    {
        id: param.id,
        projectId: param.project_id,
        taskId: param.task_id,
        title: param.title,
        description: param.description,
        status: param.status,
        priority: param.priority,
        owner: param.owner,
    }
)

export const toIssueRow = (param: Issue): IssueRow => (
    {
        id: param.id,
        project_id: param.projectId,
        task_id: param.taskId,
        title: param.title,
        description: param.description,
        status: param.status,
        priority: param.priority,
        owner: param.owner,
        timestamps: {
            created_at: "",
            updated_at: ""
        }
    }
)

export const toIssuePayload = (param: Issue): IssuePayload => (
    {
        id: param.id,
        project_id: param.projectId,
        task_id: param.taskId,
        title: param.title,
        description: param.description,
        status: param.status,
        priority: param.priority,
        owner: param.owner,
    }
)