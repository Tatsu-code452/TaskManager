import React, { useMemo } from "react";
import { NavigateFunction } from "react-router-dom";
import { Button, TableColumn, TableCreator } from "../../../components";
import { ProjectRow } from "../../../types/db/project";
import styles from "../index.module.css";
import { ProjectStatusLabel } from "../types/model";

type ProjectTableProps = {
    projects: ProjectRow[];
    navigation: NavigateFunction;
    openEditModal: (project: ProjectRow) => void;
};

export const ProjectTable = ({
    projects,
    navigation,
    openEditModal,
}: ProjectTableProps) => {
    const tableDef = useMemo(
        (): TableColumn<ProjectRow>[] => [
            {
                headerContent: "ID",
                headerClassName: styles.col_id,
                bodyContent: (p) => p.id,
            },
            {
                headerContent: "案件名",
                headerClassName: styles.col_name,
                bodyContent: (p) => p.name,
            },
            { headerContent: "顧客名", bodyContent: (p) => p.client },
            {
                headerContent: "ステータス",
                headerClassName: styles.col_status,

                bodyContent: (p) => ProjectStatusLabel[p.status],
            },
            {
                headerContent: "期間",
                headerClassName: styles.col_period,

                bodyContent: (p) => `${p.start_date} 〜 ${p.end_date}`,
            },
            {
                headerContent: "担当者",
                headerClassName: styles.col_owner,
                bodyContent: (p) => p.owner,
            },
            {
                headerContent: "操作",
                headerClassName: styles.operation_cell,
                bodyContent: (p) => (
                    <div style={{ textAlign: "right" }}>
                        <Button
                            icon
                            onClick={(e) => {
                                e.stopPropagation();
                                openEditModal(p);
                            }}
                        >
                            ✏️
                        </Button>
                    </div>
                ),
            },
        ],
        [openEditModal],
    );

    const onClickRow = (p: ProjectRow) => navigation(`/projects/${p.id}`);

    return (
        <TableCreator
            tableDef={tableDef}
            rows={projects}
            rowProps={(p) => ({
                onClick: () => onClickRow(p),
                className: styles.table_row,
            })}
        />
    );
};

export default React.memo(ProjectTable);
