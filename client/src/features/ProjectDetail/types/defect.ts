import { DefectPayload, DefectSeverity, DefectStatus } from "../../../types/db/defect";
import { InputConfig } from "../../../types/inputConfig";

export const DefectStatusLabel: Record<DefectStatus, string> = {
    [DefectStatus.Open]: "未対応",
    [DefectStatus.InProgress]: "対応中",
    [DefectStatus.Fixed]: "対応済み",
    [DefectStatus.Verified]: "確認完了",
    [DefectStatus.Closed]: "完了",
};

export const DefectSeverityLabel: Record<DefectSeverity, string> = {
    [DefectSeverity.Minor]: "軽微",
    [DefectSeverity.Major]: "重大",
    [DefectSeverity.Critical]: "致命的",
    [DefectSeverity.Blocker]: "ブロッカー",
};

export type RequiredKeys =
    | "id"
    | "project_id"
    | "title"
    | "description"
    | "status"
    | "severity"

export const InitPayload = (projectId: string): DefectPayload => (
    {
        id: "",
        project_id: projectId,
        task_id: "",
        title: "",
        description: "",
        severity: DefectSeverity.Minor,
        status: DefectStatus.Open,
        owner: "",
        reviewer: "",
        due_date: "",
        fixed_date: "",
        verified_date: "",
        tags: [],
    }
);

export const createInputs = (form: DefectPayload): InputConfig<keyof DefectPayload>[] => {
    return [
        { key: "title", label: "タイトル", type: "text", value: form.title },
        {
            key: "description",
            label: "詳細",
            type: "textarea",
            value: form.description,
        },
        {
            key: "severity",
            label: "重大度",
            type: "select",
            value: form.severity,
            options: Object.values(DefectSeverity) as DefectSeverity[],
            labelMap: DefectSeverityLabel,
        },
        {
            key: "status",
            label: "ステータス",
            type: "select",
            value: form.status,
            options: Object.values(DefectStatus) as DefectStatus[],
            labelMap: DefectStatusLabel,
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
            key: "fixed_date",
            label: "修正日",
            type: "date",
            value: form.fixed_date,
        },
        {
            key: "verified_date",
            label: "確認日",
            type: "date",
            value: form.verified_date,
        },
    ];

};