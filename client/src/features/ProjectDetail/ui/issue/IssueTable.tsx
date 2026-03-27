import React, { useMemo } from "react";
import {
    Button,
    TableColumn,
    TableCreator,
    Tags,
} from "../../../../components";
import { TagTypeLabel } from "../../../../types/db/common";
import { IssueRow } from "../../../../types/db/issue";
import { IssuePriorityLabel, IssueStatusLabel } from "../../types/issue";
import styles from "./IssusTab.module.css";

type IssueTableProps = {
    issues: IssueRow[];
    remove: (id: string) => Promise<void>;
    removeTag: (index: number) => void;
    handleShowModal: (
        modal: { mode: "new"; issue: null } | { mode: "edit"; issue: IssueRow },
    ) => void;
};

export const IssusTable = ({
    issues,
    remove,
    removeTag,
    handleShowModal,
}: IssueTableProps) => {
    const tableDef = useMemo(
        (): TableColumn<IssueRow>[] => [
            {
                headerContent: "タイトル",
                headerClassName: styles.col_title,
                bodyContent: (d) => d.title,
            },
            {
                headerContent: "詳細",
                headerClassName: styles.col_detail,
                bodyContent: (d) => d.description,
            },
            {
                headerContent: "タグ",
                headerClassName: styles.col_tags,
                bodyContent: (d) => (
                    <Tags
                        tags={d.tags}
                        tagTypeLabel={TagTypeLabel}
                        onRemove={removeTag}
                    />
                ),
            },
            {
                headerContent: "優先度",
                headerClassName: styles.col_priority,
                bodyContent: (d) => (
                    <span
                        className={`${styles.badge} ${styles[`priority_${d.priority}`]}`}
                    >
                        {IssuePriorityLabel[d.priority]}
                    </span>
                ),
            },
            {
                headerContent: "ステータス",
                headerClassName: styles.col_status,
                bodyContent: (d) => (
                    <span
                        className={`${styles.badge} ${styles[`status_${d.status}`]}`}
                    >
                        {IssueStatusLabel[d.status]}
                    </span>
                ),
            },
            {
                headerContent: "担当者",
                headerClassName: styles.col_owner,
                bodyContent: (d) => d.owner || "-",
            },
            {
                headerContent: "確認者",
                headerClassName: styles.col_reviewer,
                bodyContent: (d) => d.reviewer || "-",
            },
            {
                headerContent: "期日",
                headerClassName: styles.col_date,
                bodyContent: (d) => d.due_date || "-",
            },
            {
                headerContent: "完了日",
                headerClassName: styles.col_date,
                bodyContent: (d) => d.completed_date || "-",
            },
            {
                headerContent: "",
                headerClassName: styles.col_actions,
                bodyContent: (d) => (
                    <Button
                        icon
                        onClick={() =>
                            handleShowModal({ mode: "edit", issue: d })
                        }
                    >
                        ✎
                    </Button>
                ),
            },
            {
                headerContent: "",
                headerClassName: styles.col_actions,
                bodyContent: (d) => (
                    <Button icon onClick={() => remove(d.id)}>
                        🗑
                    </Button>
                ),
            },
        ],
        [handleShowModal, remove, removeTag],
    );

    return <TableCreator tableDef={tableDef} rows={issues} />;
};

export default React.memo(IssusTable);
