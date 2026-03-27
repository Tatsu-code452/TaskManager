import React, { useMemo } from "react";
import { Button, TableColumn, TableCreator } from "../../../../components";
import { PhaseRow } from "../../../../types/db/phase";
import { PhaseStatusLabel } from "../../types/phase";
import styles from "./PhaseTab.module.css";

type PhaseTableProps = {
    phases: PhaseRow[];
    remove: (id: string) => Promise<void>;
    handleShowModal: (
        modal: { mode: "new"; phase: null } | { mode: "edit"; phase: PhaseRow },
    ) => void;
};

export const PhaseTable = ({
    phases,
    remove,
    handleShowModal,
}: PhaseTableProps) => {
    const tableDef = useMemo(
        (): TableColumn<PhaseRow>[] => [
            {
                headerContent: "No.",
                headerClassName: styles.col_order,
                bodyContent: (d) => d.order,
            },
            {
                headerContent: "名称",
                headerClassName: styles.col_name,
                bodyContent: (d) => d.name,
            },
            {
                headerContent: "ステータス",
                headerClassName: styles.col_status,
                bodyContent: (d) => (
                    <span
                        className={`${styles.badge} ${styles[`status_${d.status}`]}`}
                    >
                        {PhaseStatusLabel[d.status]}
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
                headerContent: "インプット",
                headerClassName: styles.col_detail,
                bodyContent: (d) => d.inputs,
            },
            {
                headerContent: "アウトプット",
                headerClassName: styles.col_detail,
                bodyContent: (d) => d.outputs,
            },
            {
                headerContent: "担当者",
                headerClassName: styles.col_owner,
                bodyContent: (d) => d.owner || "-",
            },
            {
                headerContent: "",
                headerClassName: styles.col_actions,
                bodyContent: (d) => (
                    <Button
                        icon
                        onClick={() =>
                            handleShowModal({ mode: "edit", phase: d })
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

    return <TableCreator tableDef={tableDef} rows={phases} />;
};

export default React.memo(PhaseTable);
