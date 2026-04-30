import { IssuePayload, IssuePriority, IssueStatus } from "../../../types/db/issue";
import { InputConfig } from "../../../types/inputConfig";

export const IssueStatusLabel: Record<IssueStatus, string> = {
    [IssueStatus.Open]: "未対応",
    [IssueStatus.InProgress]: "対応中",
    [IssueStatus.Review]: "確認中",
    [IssueStatus.Resolved]: "解決済み",
    [IssueStatus.Closed]: "完了",
};

export const IssuePriorityLabel: Record<IssuePriority, string> = {
    [IssuePriority.Low]: "軽微",
    [IssuePriority.Medium]: "中程度",
    [IssuePriority.High]: "重大",
    [IssuePriority.Critical]: "致命的",
};

export type RequiredKeys =
    | "id"
    | "project_id"
    | "title"
    | "description"
    | "status"
    | "priority"

export const InitPayload = (projectId: string): IssuePayload => (
    {
        id: "",
        project_id: projectId,
        task_id: "",
        title: "",
        description: "",
        priority: IssuePriority.Low,
        status: IssueStatus.Open,
        owner: "",
        reviewer: "",
        due_date: "",
        completed_date: "",
        tags: [],
    }
);

export const createInputs = (form: IssuePayload): InputConfig<keyof IssuePayload>[] => {
    return [
        { key: "title", label: "タイトル", type: "text", value: form.title },
        {
            key: "description",
            label: "詳細",
            type: "textarea",
            value: form.description,
        },
        {
            key: "priority",
            label: "優先度",
            type: "select",
            value: form.priority,
            options: Object.values(IssuePriority) as IssuePriority[],
            labelMap: IssuePriorityLabel,
        },
        {
            key: "status",
            label: "ステータス",
            type: "select",
            value: form.status,
            options: Object.values(IssueStatus) as IssueStatus[],
            labelMap: IssueStatusLabel,
        },
        { key: "owner", label: "担当者", type: "text", value: form.owner },
        {
            key: "reviewer",
            label: "確認者",
            type: "text",
            value: form.reviewer,
        },
        { key: "due_date", label: "期日", type: "date", value: form.due_date },
        {
            key: "completed_date",
            label: "完了日",
            type: "date",
            value: form.completed_date,
        },
    ];
};