import { input, SectionDefinitions } from "@components/Form/FormCreator";
import {
    DefectPayload,
    DefectSeverity,
    DefectStatus,
} from "@comtypes/db/defect";
import {
    DefectSeverityLabel,
    DefectStatusLabel,
} from "@features/ProjectDetail/component/Defect/types/defect";

export const sectionDefinitions: SectionDefinitions = {
    basic: {
        title: "基本情報",
        build: (form: DefectPayload, change) => [
            input.text("title", "タイトル", form.title, change),
            input.select(
                "severity",
                "重大度",
                form.severity,
                Object.values(DefectSeverity),
                DefectSeverityLabel,
                change,
            ),
            input.select(
                "status",
                "ステータス",
                form.status,
                Object.values(DefectStatus),
                DefectStatusLabel,
                change,
            ),
        ],
    },

    description: {
        title: "詳細",
        build: (form: DefectPayload, change) => [
            input.textarea("description", "詳細", form.description, change),
        ],
    },

    schedule: {
        title: "スケジュール",
        build: (form: DefectPayload, change) => [
            input.date("due_date", "期日", form.due_date, change),
            input.text("owner", "担当者", form.owner, change),
            input.date("fixed_date", "修正日", form.fixed_date, change),
            input.date("verified_date", "完了日", form.verified_date, change),
            input.text("reviewer", "確認者", form.reviewer, change),
        ],
    },
};
