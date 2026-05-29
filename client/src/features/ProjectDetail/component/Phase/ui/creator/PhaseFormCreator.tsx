import { input, SectionDefinitions } from "@components/Form/FormCreator";
import { PhaseStatus } from "@comtypes/db/phase";
import { PhaseStatusLabel } from "@features/ProjectDetail/component/Phase/types/phase";

export const sectionDefinitions: SectionDefinitions = {
    basic: {
        title: "基本情報",
        build: (form, change) => [
            input.number("order", "No.", form.order.toString(), change),
            input.text("name", "名称", form.name, change),
            input.select(
                "status",
                "ステータス",
                form.status,
                Object.values(PhaseStatus),
                PhaseStatusLabel,
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
    detail: {
        title: "Input/Output",
        build: (form, change) => [
            input.textarea("inputs", "インプット", form.inputs, change),
            input.textarea("outputs", "アウトプット", form.outputs, change),
        ],
    },
};
