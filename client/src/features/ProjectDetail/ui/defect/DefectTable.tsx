import React, { useMemo } from "react";
import {
    Button,
    TableColumn,
    TableCreator,
    Tags,
} from "../../../../components";
import { TagTypeLabel } from "../../../../types/db/common";
import { DefectRow } from "../../../../types/db/defect";
import { DefectSeverityLabel, DefectStatusLabel } from "../../types/defect";
import styles from "./DefectTab.module.css";

type DefectTableProps = {
    defects: DefectRow[];
    remove: (id: string) => Promise<void>;
    removeTag: (index: number) => void;
    handleShowModal: (
        modal:
            | { mode: "new"; defect: null }
            | { mode: "edit"; defect: DefectRow },
    ) => void;
};

export const DefectTable = ({
    defects,
    remove,
    removeTag,
    handleShowModal,
}: DefectTableProps) => {
    const tableDef = useMemo(
        (): TableColumn<DefectRow>[] => [
            {
                headerContent: "タイトル",
                headerClassName: styles.col_title,
                bodyContent: (d: DefectRow) => d.title,
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
                headerContent: "重大度",
                headerClassName: styles.col_severity,
                bodyContent: (d) => (
                    <span
                        className={`${styles.badge} ${styles[`severity_${d.severity}`]}`}
                    >
                        {DefectSeverityLabel[d.severity]}
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
                        {DefectStatusLabel[d.status]}
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
                headerContent: "修正日",
                headerClassName: styles.col_date,
                bodyContent: (d) => d.fixed_date || "-",
            },
            {
                headerContent: "確認日",
                headerClassName: styles.col_date,
                bodyContent: (d) => d.verified_date || "-",
            },
            {
                headerContent: "",
                headerClassName: styles.col_actions,
                bodyContent: (d) => (
                    <Button
                        icon
                        onClick={() =>
                            handleShowModal({ mode: "edit", defect: d })
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

    return <TableCreator tableDef={tableDef} rows={defects} />;
};

export default React.memo(DefectTable);
