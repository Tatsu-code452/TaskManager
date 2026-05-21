import Button from "@components/Button/Button";
import { ColumnDef } from "@components/GridTable/types";
import { MilestoneRow } from "@comtypes/db/milestone";
import { MilestoneStatusLabel } from "@features/ProjectDetail/component/Milestone/types/milestone";
import styles from "./MilestoneTable.module.css";

export const MilestoneTable = () => {
    const createColumnDefs = (
        onRemove: (id: string) => void,
        openEditModal: (milestone: MilestoneRow) => void,
    ): readonly ColumnDef<MilestoneRow>[] => [
        {
            header: "タイトル",
            headerClass: "",
            width: "minmax(min-content, 20rem)",
            cell: (d) => d.title,
        },
        {
            header: "ステータス",
            headerClass: "",
            width: "7rem",
            cell: (d) => (
                <span
                    className={`${styles.badge} ${styles[`status_${d.status}`]}`}
                >
                    {MilestoneStatusLabel[d.status]}
                </span>
            ),
        },
        {
            header: "開始日",
            headerClass: "",
            width: "7rem",
            cell: (d) => d.start_date || "-",
        },
        {
            header: "終了日",
            headerClass: "",
            width: "7rem",
            cell: (d) => d.end_date || "-",
        },
        {
            header: "進捗率",
            headerClass: "",
            width: "6rem",
            cell: (d) => (d.progress ? `${d.progress}%` : "-"),
        },
        {
            header: "担当者",
            headerClass: "",
            width: "6rem",
            cell: (d) => d.owner || "-",
        },
        {
            header: "備考",
            headerClass: styles.col_detail,
            width: "minmax(min-content, 28rem)",
            cell: (d) => (
                <span title={d.description} className={styles.col_detail}>
                    {d.description}
                </span>
            ),
        },
        {
            header: "",
            headerClass: styles.col_actions,
            width: "auto",
            cell: (d) => (
                <Button
                    className={`editBtn ${styles.actionBtn}`}
                    icon
                    onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(d);
                    }}
                >
                    ✎
                </Button>
            ),
        },
        {
            header: "",
            headerClass: styles.col_actions,
            width: "auto",
            cell: (d) => (
                <Button
                    className={`${styles.actionBtn}`}
                    icon
                    onClick={() => onRemove(d.id)}
                >
                    🗑
                </Button>
            ),
        },
    ];

    const createRowProps: React.HTMLAttributes<HTMLDivElement> = {
        onDoubleClick: (e) => {
            const btn = e.currentTarget.querySelector(
                ":scope .editBtn",
            ) as HTMLElement | null;
            btn?.click();
        },
    };

    return {
        createColumnDefs,
        createRowProps,
    };
};
