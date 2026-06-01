import {
    col,
    createTable,
    TableDefinition,
} from "@components/GridTable/GridTableDefCreatorExtend";
import { ColumnDef } from "@components/GridTable/types";
import Tags from "@components/Tag/Tags";
import { TagTypeLabel } from "@comtypes/db/common";
import { DefectRow } from "@comtypes/db/defect";
import { DefectSeverityLabel, DefectStatusLabel } from "../../types/defect";

export const defectTable = (
    onRemove: (id: string) => void,
    openEdit: (m: DefectRow) => void,
): TableDefinition => {
    const createCol = col<Partial<DefectRow>>();
    return createTable()
        .add(
            createCol.text("タイトル", (d) => d.title, {
                width: "minmax(min-content, 20rem)",
            }),
        )
        .add(createCol.tooltip("詳細", (d) => d.description))
        .add({
            header: "タグ",
            cell: (d) => <Tags tags={d.tags} tagTypeLabel={TagTypeLabel} />,
        } as ColumnDef<Partial<DefectRow>>)
        .add(createCol.badge("重大度", (d) => d.severity, DefectSeverityLabel))
        .add(createCol.badge("ステータス", (d) => d.status, DefectStatusLabel))
        .add(createCol.text("担当者", (d) => d.owner))
        .add(createCol.text("確認者", (d) => d.reviewer))
        .add(createCol.date("期日", (d) => d.due_date))
        .add(createCol.date("修正日", (d) => d.fixed_date))
        .add(createCol.date("完了日", (d) => d.verified_date))
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
