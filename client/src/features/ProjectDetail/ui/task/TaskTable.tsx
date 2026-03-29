import React, { useMemo } from "react";
import { Button, TableColumn, TableCreator } from "../../../../components";
import { TaskRow } from "../../../../types/db/task";
import { TaskStatusLabel } from "../../types/task";
import styles from "./TaskTab.module.css";

type TaskTableProps = {
    tasks: TaskRow[];
    remove: (id: string) => Promise<void>;
    handleShowModal: (
        modal: { mode: "new"; task: null } | { mode: "edit"; task: TaskRow },
    ) => void;
};

export const TaskTable = ({
    tasks,
    remove,
    handleShowModal,
}: TaskTableProps) => {
    const tableDef = useMemo(
        (): TableColumn<TaskRow>[] => [
            {
                headerContent: "タスク名",
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
                        {TaskStatusLabel[d.status]}
                    </span>
                ),
            },
            {
                headerContent: "予定開始日",
                headerClassName: styles.col_date,
                bodyContent: (d) => d.planned_start || "-",
            },
            {
                headerContent: "予定終了日",
                headerClassName: styles.col_date,
                bodyContent: (d) => d.planned_end || "-",
            },
            {
                headerContent: "予定工数",
                headerClassName: styles.col_num,
                bodyContent: (d) => d.planned_hours || "-",
            },
            {
                headerContent: "実績開始日",
                headerClassName: styles.col_date,
                bodyContent: (d) => d.actual_start || "-",
            },
            {
                headerContent: "実績終了日",
                headerClassName: styles.col_date,
                bodyContent: (d) => d.actual_end || "-",
            },
            {
                headerContent: "実績工数",
                headerClassName: styles.col_num,
                bodyContent: (d) => d.actual_hours || "-",
            },
            {
                headerContent: "進捗率",
                headerClassName: styles.col_progress,
                bodyContent: (d) => d.progress_rate || "-",
            },
            {
                headerContent: "",
                headerClassName: styles.col_actions,
                bodyContent: (d) => (
                    <Button
                        icon
                        onClick={() =>
                            handleShowModal({ mode: "edit", task: d })
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

    return <TableCreator tableDef={tableDef} rows={tasks} />;
};

export default React.memo(TaskTable);
