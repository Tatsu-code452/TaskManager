import { input, SectionDefinitions } from "@components/Form/FormCreator";
import { MilestoneStatus } from "@comtypes/db/milestone";
import { MilestoneStatusLabel } from "@features/ProjectDetail/component/Milestone/types/milestone";

export const sectionDefinitions: SectionDefinitions = {
    basic: {
        title: "基本情報",
        build: (form, change) => [
            input.text("title", "タイトル", form.title, change),
            input.select(
                "status",
                "ステータス",
                form.status,
                Object.values(MilestoneStatus),
                MilestoneStatusLabel,
                change,
            ),
        ],
    },

    schedule: {
        title: "スケジュール",
        build: (form, change) => [
            input.date("start_date", "開始日", form.start_date, change),
            input.date("end_date", "終了日", form.end_date, change),
        ],
    },

    progress: {
        title: "進捗",
        build: (form, change) => [
            input.number("progress", "進捗率", form.progress, change),
            input.text("owner", "担当者", form.owner, change),
        ],
    },

    description: {
        title: "備考",
        build: (form, change) => [
            input.textarea("description", "備考", form.description, change),
        ],
    },
};
