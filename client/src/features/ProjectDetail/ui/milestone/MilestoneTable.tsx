import React, { useMemo } from "react";
import { Button, TableColumn, TableCreator } from "../../../../components";
import { MilestoneRow } from "../../../../types/db/milestone";
import { MilestoneStatusLabel } from "../../types/milestone";
import styles from "./MilestoneTab.module.css";

type MilestoneTableProps = {
    milestones: MilestoneRow[];
    remove: (id: string) => Promise<void>;
    handleShowModal: (
        modal:
            | { mode: "new"; milestone: null }
            | { mode: "edit"; milestone: MilestoneRow },
    ) => void;
};

export const MilestoneTable = ({
    milestones,
    remove,
    handleShowModal,
}: MilestoneTableProps) => {
    const tableDef = useMemo(
        (): TableColumn<MilestoneRow>[] => [
            {
                headerContent: "タイトル",
                headerClassName: styles.col_title,
                bodyContent: (d) => d.title,
            },
            {
                headerContent: "ステータス",
                headerClassName: styles.col_status,
                bodyContent: (d) => (
                    <span
                        className={`${styles.badge} ${styles[`status_${d.status}`]}`}
                    >
                        {MilestoneStatusLabel[d.status]}
                    </span>
                ),
            },
            {
                headerContent: "開始日",
                headerClassName: styles.col_date,
                bodyContent: (d) => d.start_date || "-",
            },
            {
                headerContent: "終了日",
                headerClassName: styles.col_date,
                bodyContent: (d) => d.end_date || "-",
            },
            {
                headerContent: "進捗率",
                headerClassName: styles.col_progress,
                bodyContent: (d) => d.progress || "-",
            },
            {
                headerContent: "担当者",
                headerClassName: styles.col_owner,
                bodyContent: (d) => d.owner || "-",
            },
            {
                headerContent: "備考",
                headerClassName: styles.col_detail,
                bodyContent: (d) => d.description,
            },
            {
                headerContent: "",
                headerClassName: styles.col_actions,
                bodyContent: (d) => (
                    <Button
                        icon
                        onClick={() =>
                            handleShowModal({ mode: "edit", milestone: d })
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
        [handleShowModal, remove],
    );

    return <TableCreator tableDef={tableDef} rows={milestones} />;
};

export default React.memo(MilestoneTable);
