import React from "react";
import { Button, TableColumn, TableCreator } from "../../../../../components";
import { MilestoneRow } from "../../../../../types/db/milestone";
import { MilestoneStatusLabel } from "../types/milestone";
import styles from "./MilestoneUi.module.css";

type Props = {
    milestones: MilestoneRow[];
    onRemove: (id: string) => void;
    openEditModal: (milestone: MilestoneRow) => void;
};

const tableDef = (
    onRemove: (id: string) => void,
    openEditModal: (milestone: MilestoneRow) => void,
): TableColumn<MilestoneRow>[] => [
    {
        headerContent: "タイトル",
        headerClassName: styles.col_title,
        bodyContent: (d) => d.title,
    },
    {
        headerContent: "ステータス",
        headerClassName: styles.col_status,
        bodyContent: (d) => (
            <span className={`${styles.badge} ${styles[`status_${d.status}`]}`}>
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
        bodyContent: (d) => (
            <span title={d.description} className={styles.col_detail}>
                {d.description}
            </span>
        ),
    },
    {
        headerContent: "",
        headerClassName: styles.col_actions,
        bodyContent: (d) => (
            <Button icon onClick={() => openEditModal(d)}>
                ✎
            </Button>
        ),
    },
    {
        headerContent: "",
        headerClassName: styles.col_actions,
        bodyContent: (d) => (
            <Button icon onClick={() => onRemove(d.id)}>
                🗑
            </Button>
        ),
    },
];

export const MilestoneTable = ({
    milestones,
    onRemove,
    openEditModal,
}: Props) => {
    return (
        <TableCreator
            tableDef={tableDef(onRemove, openEditModal)}
            rows={milestones}
        />
    );
};

export default React.memo(MilestoneTable);
