import {
    col,
    createTable,
    TableDefinition,
} from "@components/GridTable/GridTableDefCreatorExtend";
import { MilestoneRow } from "@comtypes/db/milestone";
import { MilestoneStatusLabel } from "../../types/milestone";

export const milestoneTable = (
    onRemove: (id: string) => void,
    openEdit: (m: MilestoneRow) => void,
): TableDefinition => {
    const createCol = col<Partial<MilestoneRow>>();
    return createTable()
        .add(
            createCol.text("タイトル", (d) => d.title, {
                width: "minmax(min-content, 20rem)",
            }),
        )
        .add(
            createCol.badge(
                "ステータス",
                (d) => d.status,
                MilestoneStatusLabel,
            ),
        )
        .add(createCol.date("開始日", (d) => d.start_date))
        .add(createCol.date("終了日", (d) => d.end_date))
        .add(createCol.percent("進捗率", (d) => d.progress))
        .add(createCol.text("担当者", (d) => d.owner))
        .add(createCol.tooltip("備考", (d) => d.description))
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
