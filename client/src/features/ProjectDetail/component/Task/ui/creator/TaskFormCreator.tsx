import { input, SectionDefinitions } from "@components/Form/FormCreator";
import { TaskPayload, TaskStatus } from "@comtypes/db/task";
import { TaskStatusLabel } from "@features/ProjectDetail/component/Task/types/task";

export const sectionDefinitions: SectionDefinitions = {
    basic: {
        title: "基本情報",
        build: (form: TaskPayload, change) => [
            input.text("name", "タスク名", form.name, change),
            input.select(
                "status",
                "ステータス",
                form.status,
                Object.values(TaskStatus),
                TaskStatusLabel,
                change,
            ),
        ],
    },

    schedulePlan: {
        title: "スケジュール(計画)",
        build: (form, change) => [
            input.date("planned_start", "開始日", form.planned_start, change),
            input.date("planned_end", "終了日", form.planned_end, change),
            input.number(
                "planned_hours",
                "工数",
                form.planned_hours.toString(),
                change,
            ),
        ],
    },

    scheduleActual: {
        title: "スケジュール(実績)",
        build: (form, change) => [
            input.date("actual_start", "開始日", form.actual_start, change),
            input.date("actual_end", "終了日", form.actual_end, change),
            input.number(
                "actual_hours",
                "工数",
                form.actual_hours.toString(),
                change,
            ),
            input.number(
                "progress_rate",
                "進捗率",
                form.progress_rate.toString(),
                change,
            ),
        ],
    },
};
