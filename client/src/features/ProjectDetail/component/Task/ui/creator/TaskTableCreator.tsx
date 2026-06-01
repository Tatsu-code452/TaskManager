import {
    col,
    createTable,
    TableDefinition,
} from "@components/GridTable/GridTableDefCreatorExtend";
import { TaskRow } from "@comtypes/db/task";
import { TaskStatusLabel } from "../../types/task";

export const taskTable = (
    onRemove: (id: string) => void,
    openEdit: (m: TaskRow) => void,
): TableDefinition => {
    const createCol = col<Partial<TaskRow>>();
    return createTable()
        .add(
            createCol.text("タスク名", (d) => d.name, {
                width: "minmax(min-content, 20rem)",
            }),
        )
        .add(createCol.badge("ステータス", (d) => d.status, TaskStatusLabel))
        .add(createCol.date("予定開始日", (d) => d.planned_start))
        .add(createCol.date("予定終了日", (d) => d.planned_end))
        .add(createCol.text("予定工数", (d) => d.planned_hours.toString()))
        .add(createCol.date("実績開始日", (d) => d.actual_start))
        .add(createCol.date("実績終了日", (d) => d.actual_end))
        .add(createCol.text("実績工数", (d) => d.actual_hours.toString()))
        .add(createCol.percent("進捗率", (d) => d.progress_rate))
        .add(createCol.action("", openEdit, "✎", { cellClass: "editBtn" }))
        .add(createCol.action("", (d) => onRemove(d.id), "🗑"))
        .setRowProps({
            onDoubleClick: (e) => {
                const btn = e.currentTarget.querySelector(
                    ":scope .editBtn",
                ) as HTMLElement | null;
                btn?.click();
            },
        })
        .build();
};
