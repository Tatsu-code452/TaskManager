import { ProjectPayload, ProjectStatus } from "../../../types/db/project";
import { InputConfig } from "../../../types/inputConfig";

export const DispProjectStatus = {
    ...ProjectStatus,
    All: "",
} as const;

export type DispProjectStatus = typeof DispProjectStatus[keyof typeof DispProjectStatus];

export type ProjectSearchCondition = {
    name: string;
    client: string;
    status: DispProjectStatus; // All を含む
};

export const ProjectStatusLabel: Record<DispProjectStatus, string> = {
    [DispProjectStatus.All]: "",
    [DispProjectStatus.Planned]: "計画中",
    [DispProjectStatus.Active]: "実行中",
    [DispProjectStatus.OnHold]: "休止",
    [DispProjectStatus.Completed]: "完工",
    [DispProjectStatus.Archived]: "アーカイブ済",
};

export type RequiredKeys =
    | "id"
    | "name"
    | "client"
    | "status"
    | "start_date"
    | "end_date"
    | "owner";

export const createInputs = (form: ProjectPayload): InputConfig<RequiredKeys>[] => {
    return [
        { key: "id", value: form.id, type: "text", label: "ID" },
        { key: "name", value: form.name, type: "text", label: "案件名" },
        { key: "client", value: form.client, type: "text", label: "顧客名" },
        {
            key: "status",
            value: form.status as DispProjectStatus,
            type: "select",
            label: "ステータス",
            options: Object.values(DispProjectStatus),
            labelMap: ProjectStatusLabel,
        },
        {
            key: "start_date",
            value: form.start_date,
            type: "date",
            label: "開始日",
        },
        {
            key: "end_date",
            value: form.end_date,
            type: "date",
            label: "終了日",
        },
        {
            key: "owner",
            value: form.owner,
            type: "text",
            label: "担当者",
        },
    ];
}

