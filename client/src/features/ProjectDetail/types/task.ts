import { TaskPayload, TaskStatus } from "../../../types/db/task";
import { InputConfig } from "../../../types/inputConfig";

export const TaskStatusLabel: Record<TaskStatus, string> = {
    [TaskStatus.NotStarted]: "未着手",
    [TaskStatus.InProgress]: "対応中",
    [TaskStatus.Done]: "完了",
}

export type RequiredKeys =
    | "name"

export const InitPayload = (project_id: string): TaskPayload => (
    {
        id: "",
        project_id,
        phase_id: "",
        name: "",
        planned_start: "",
        planned_end: "",
        planned_hours: 0.0,
        actual_start: "",
        actual_end: "",
        actual_hours: 0.0,
        progress_rate: 0.0,
        status: TaskStatus.NotStarted,
    }
)

export const createInputs = (form: TaskPayload): InputConfig<keyof TaskPayload>[] => {
    return [
        { key: "name", label: "タスク名", type: "text", value: form.name },
        {
            key: "status",
            label: "ステータス",
            type: "select",
            value: form.status,
            options: Object.values(TaskStatus) as TaskStatus[],
            labelMap: TaskStatusLabel,
        },
        { key: "planned_start", label: "開始日", type: "date", value: form.planned_start },
        { key: "planned_end", label: "終了日", type: "date", value: form.planned_end, },
        { key: "planned_hours", label: "工数", type: "number", value: form.planned_hours.toString() },
        { key: "actual_start", label: "開始日", type: "date", value: form.actual_start },
        { key: "actual_end", label: "終了日", type: "date", value: form.actual_end, },
        { key: "planned_hours", label: "工数", type: "number", value: form.planned_hours.toString() },
        { key: "progress_rate", label: "進捗率", type: "number", value: form.progress_rate.toString() },
    ];
};