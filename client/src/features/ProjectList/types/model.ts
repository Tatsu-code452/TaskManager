import { ProjectPayload, ProjectSearchCondition, ProjectStatus } from "../../../types/db/project";
import { InputConfig } from "../../../types/inputConfig";

export const ProjectStatusLabel: Record<ProjectStatus, string> = {
    [ProjectStatus.All]: "",
    [ProjectStatus.Planned]: "計画中",
    [ProjectStatus.Active]: "実行中",
    [ProjectStatus.OnHold]: "休止",
    [ProjectStatus.Completed]: "完工",
    [ProjectStatus.Archived]: "アーカイブ済",
};

export const createSearchInputs = (form: ProjectSearchCondition): InputConfig<keyof ProjectSearchCondition>[] => {
    return [
        { key: "name", value: form.name, type: "text", label: "案件名" },
        { key: "client", value: form.client, type: "text", label: "顧客名" },
        {
            key: "status",
            value: form.status as ProjectStatus,
            type: "select",
            label: "ステータス",
            options: Object.values(ProjectStatus),
            labelMap: ProjectStatusLabel,
        },
    ];
}

export const createInputs = (
    form: ProjectPayload,
): InputConfig<keyof ProjectPayload>[] => {
    return [
        { key: "id", value: form.id, type: "text", label: "ID" },
        { key: "name", value: form.name, type: "text", label: "案件名" },
        { key: "client", value: form.client, type: "text", label: "顧客名" },
        {
            key: "status",
            value: form.status as ProjectStatus,
            type: "select",
            label: "ステータス",
            options: Object.values(ProjectStatus),
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
};

export const emptyPayload: ProjectPayload = {
    id: "",
    name: "",
    client: "",
    description: "",
    status: ProjectStatus.Planned,
    start_date: "",
    end_date: "",
    owner: "",
};
