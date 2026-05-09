import React from "react";
import { NavigateFunction } from "react-router-dom";
import { Button, TableColumn, TableCreator } from "../../../components";
import { InlineSelectEditor } from "../../../components/InlineSelectEditor";
import {
    ProjectPayload,
    ProjectRow,
    ProjectStatus,
} from "../../../types/db/project";
import { ProjectStatusLabel } from "../types/model";
import styles from "./ProjectTable.module.css";

type ProjectTableProps = {
    projects: ProjectRow[];
    navigation: NavigateFunction;
    openEditModal: (project: ProjectRow) => void;
    onChangeForm: <K extends keyof ProjectPayload>(
        key: K,
        value: ProjectPayload[K],
    ) => void;
    onCommit: () => void;
    onRemove: (id: string) => void;
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

const tableDef = (
    openEditModal: (project: ProjectRow) => void,
    onChangeForm: <K extends keyof ProjectPayload>(
        key: K,
        value: ProjectPayload[K],
    ) => void,
    onCommit: () => void,
    onRemove: (id: string) => void,
    onStartEdit: (project: ProjectRow) => void,
): TableColumn<ProjectRow>[] => [
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
        headerContent: "",
        headerClassName: styles.col_action,
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
    {
        headerContent: "",
        headerClassName: styles.col_action,
        bodyContent: (p) => (
            <Button
                icon
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove(p.id);
                }}
            >
                🗑
            </Button>
        ),
    },
];

export const ProjectTable = ({
    projects,
    navigation,
    openEditModal,
    onChangeForm,
    onCommit,
    onRemove,
    onStartEdit,
}: ProjectTableProps) => {
    return (
        <TableCreator
            tableDef={tableDef(
                openEditModal,
                onChangeForm,
                onCommit,
                onRemove,
                onStartEdit,
            )}
            rows={projects}
            rowProps={(p) => ({
                onClick: () => navigation(`/projects/${p.id}`),
                className: styles.table_row,
            })}
        />
    );
};

export default React.memo(ProjectTable);
