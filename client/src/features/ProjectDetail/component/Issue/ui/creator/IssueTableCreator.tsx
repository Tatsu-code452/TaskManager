import {
    col,
    createTable,
    TableDefinition,
} from "@components/GridTable/GridTableDefCreatorExtend";
import { IssueRow } from "@comtypes/db/issue";
import { IssuePriorityLabel, IssueStatusLabel } from "../../types/issue";

export const issueTable = (
    onRemove: (id: string) => void,
    openEdit: (m: IssueRow) => void,
): TableDefinition => {
    const createCol = col<Partial<IssueRow>>();
    return (
        createTable()
            .add(
                createCol.text("タイトル", (d) => d.title, {
                    width: "minmax(min-content, 20rem)",
                }),
            )
            .add(createCol.tooltip("詳細", (d) => d.description))
            // tags
            .add(
                createCol.badge(
                    "優先度",
                    (d) => d.priority,
                    IssuePriorityLabel,
                ),
            )
            .add(
                createCol.badge(
                    "ステータス",
                    (d) => d.status,
                    IssueStatusLabel,
                ),
            )
            .add(createCol.text("担当者", (d) => d.owner))
            .add(createCol.text("確認者", (d) => d.reviewer))
            .add(createCol.date("期日", (d) => d.due_date))
            .add(createCol.date("完了日", (d) => d.completed_date))
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
            .build()
    );
};
