import { MilestonePayload, MilestoneStatus } from "../../../types/db/milestone";
import { InputConfig } from "../../../types/inputConfig";

export const MilestoneStatusLabel: Record<MilestoneStatus, string> = {
    [MilestoneStatus.NotStarted]: "未着手",
    [MilestoneStatus.InProgress]: "対応中",
    [MilestoneStatus.Completed]: "完了",
    [MilestoneStatus.Archived]: "アーカイブ済み",
}

export type RequiredKeys =
    | "title"
    | "status"
    | "start_date"
    | "end_date"

export const InitPayload = (project_id: string): MilestonePayload => (
    {
        id: "",
        project_id,
        title: "",
        description: "",
        status: MilestoneStatus.NotStarted,
        progress: 0,
        start_date: "",
        end_date: "",
        owner: "",
    }
)

export const createInputs = (form: MilestonePayload): InputConfig<keyof MilestonePayload>[] => {
    return [
        { key: "title", label: "タイトル", type: "text", value: form.title },
        {
            key: "status",
            label: "ステータス",
            type: "select",
            value: form.status,
            options: Object.values(MilestoneStatus) as MilestoneStatus[],
            labelMap: MilestoneStatusLabel,
        },
        { key: "start_date", label: "開始日", type: "date", value: form.start_date },
        { key: "end_date", label: "終了日", type: "date", value: form.end_date, },
        { key: "progress", label: "進捗率", type: "number", value: form.progress.toString() },
        { key: "owner", label: "担当者", type: "text", value: form.owner },
        { key: "description", label: "備考", type: "textarea", value: form.description },
    ];
};