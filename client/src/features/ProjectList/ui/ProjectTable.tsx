import React, { useMemo } from "react";
import { NavigateFunction } from "react-router-dom";
import { Button, TableColumn, TableCreator } from "../../../components";
import { ProjectRow } from "../../../types/db/project";
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
            { headerContent: "ID", bodyContent: (p) => p.id },
            { headerContent: "案件名", bodyContent: (p) => p.name },
            { headerContent: "顧客名", bodyContent: (p) => p.client },
            {
                headerContent: "ステータス",
                bodyContent: (p) => ProjectStatusLabel[p.status],
            },
            {
                headerContent: "期間",
                bodyContent: (p) => `${p.start_date} 〜 ${p.end_date}`,
            },
            {
                headerContent: "担当者",
                bodyContent: (p) => p.owner,
            },
            {
                headerContent: "操作",
                bodyContent: (p) => (
                    <Button
                        icon
                        onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(p);
                        }}
                    >
                        ✏️
                    </Button>
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
            })}
        />
    );
};

export default React.memo(ProjectTable);
