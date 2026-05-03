import React, { useMemo } from "react";
import { NavigateFunction } from "react-router-dom";
import { Button, TableColumn, TableCreator } from "../../../components";
import {
    ProjectPayload,
    ProjectRow,
    ProjectStatus,
} from "../../../types/db/project";
import { ProjectStatusLabel } from "../types/model";
import { InlineSelectEditor } from "./InlineSelectEditor";
import styles from "./ProjectForm.module.css";

type ProjectTableProps = {
    projects: ProjectRow[];
    navigation: NavigateFunction;
    openEditModal: (project: ProjectRow) => void;
    onChangeForm: <K extends keyof ProjectPayload>(
        key: K,
        value: ProjectPayload[K],
    ) => void;
    onCommit: () => void;
    onStartEdit: (project: ProjectRow) => void;
};

const statusStyle: Record<ProjectStatus, string> = {
    All: "",
    Planned: styles.status_planned,
    Active: styles.status_active,
    OnHold: styles.status_onhold,
    Archived: styles.status_archived,
    Completed: styles.status_completed,
};

export const ProjectTable = ({
    projects,
    navigation,
    openEditModal,
    onChangeForm,
    onCommit,
    onStartEdit,
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
                bodyContent: (p) => (
                    <InlineSelectEditor<ProjectStatus>
                        value={p.status}
                        options={Object.values(ProjectStatus)}
                        labelMap={ProjectStatusLabel}
                        className={`${styles.status_badge} ${statusStyle[p.status]}`}
                        onStartEdit={() => onStartEdit(p)}
                        onChange={(v) => onChangeForm("status", v)}
                        onCommit={onCommit}
                    />
                ),
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
        [openEditModal, onCommit, onChangeForm, onStartEdit],
    );

    const onClickRow = (p: ProjectRow) => {
        navigation(`/projects/${p.id}`);
    };

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
