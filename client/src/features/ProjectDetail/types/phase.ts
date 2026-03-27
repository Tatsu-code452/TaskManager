import { PhasePayload, PhaseStatus } from "../../../types/db/phase";
import { InputConfig } from "../../../types/inputConfig";

export const PhaseStatusLabel: Record<PhaseStatus, string> = {
    [PhaseStatus.NotStarted]: "未着手",
    [PhaseStatus.InProgress]: "対応中",
    [PhaseStatus.Completed]: "完了",
}

export type RequiredKeys =
    | "name"
    | "order"
    | "status"

export const InitPayload = (project_id: string): PhasePayload => (
    {
        id: "",
        project_id,
        name: "",
        order: 1,
        status: PhaseStatus.NotStarted,
        start_date: "",
        end_date: "",
        inputs: [],
        outputs: [],
        owner: "",
    }
)

export const createInputs = (form: PhasePayload): InputConfig<keyof PhasePayload>[] => {
    return [
        { key: "order", label: "No.", type: "number", value: form.order.toString() },
        { key: "name", label: "名称", type: "text", value: form.name },
        {
            key: "status",
            label: "ステータス",
            type: "select",
            value: form.status,
            options: Object.values(PhaseStatus) as PhaseStatus[],
            labelMap: PhaseStatusLabel,
        },
        { key: "start_date", label: "開始日", type: "date", value: form.start_date },
        { key: "end_date", label: "終了日", type: "date", value: form.end_date, },
        { key: "inputs", label: "インプット", type: "textarea", value: form.inputs.join(",\\n") },
        { key: "outputs", label: "アウトプット", type: "textarea", value: form.outputs.join(",\\n") },
        { key: "owner", label: "担当者", type: "text", value: form.owner },
    ];
};