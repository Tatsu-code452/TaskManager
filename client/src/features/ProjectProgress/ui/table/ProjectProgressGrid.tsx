import GridTable from "../../../../components/grid-table/GridTable";
import {
    CellPos,
    ColumnDef,
    GridTableProps,
} from "../../../../components/grid-table/types";
import { TaskStatus } from "../../../../types/db/task";
import { useGanttDragController } from "../../hooks/controller/useGanttDragController";
import {
    CollapseDispatch,
    EditDispatch,
    GanttParams,
    PageStateDispatch,
    RowSelectors,
} from "../../types/contract";
import { TaskModel } from "../../types/model";
import { BodyCellRenderer } from "./BodyCellRenderer";
import { DragTooltip } from "./cell/DragTooltip";
import styles from "./grid.module.css";

interface TableProps {
    dates: string[];
    projectId: string;
    tasks: TaskModel[];
    baseDate: string;
    pageStateDispatch: PageStateDispatch;
    editDispatch: EditDispatch;
    collapseDispatch: CollapseDispatch;
    selectors: RowSelectors;
}

export const ProjectProgressGrid = ({
    dates,
    tasks,
    baseDate,
    projectId,
    pageStateDispatch,
    editDispatch,
    collapseDispatch,
    selectors,
}: TableProps) => {
    // const today = new Date().toISOString().slice(0, 10);

    const { onPointerDown, onGlobalPointerMove, onGlobalPointerUp, tooltip } =
        useGanttDragController(projectId, tasks, pageStateDispatch);

    const { cellRenderer, monthEntries, onCellKeyDown } = BodyCellRenderer({
        tasks,
        baseDate,
        editDispatch,
        selectors,
        dates,
        onPointerDown,
    });

    const columns: ColumnDef[] = [
        {
            id: "phase",
            width: 120,
            header: (
                <div className={styles.header_phase}>
                    フェーズ
                    <button
                        onClick={() => collapseDispatch.toggleAllPhases(tasks)}
                    >
                        {selectors.allCollapsed ? "▶ 全展開" : "▼ 全折りたたみ"}
                    </button>
                </div>
            ),
            headerCellStyle: { className: styles.header_cell },
        },
        {
            id: "task",
            width: 200,
            header: "タスク名",
            headerCellStyle: { className: styles.header_cell },
        },
        {
            id: "progress",
            width: 320,
            header: (
                <div className={`${styles.header_cell} ${styles.header_row1}`}>
                    計画/実績
                </div>
            ),
            headerCellStyle: { className: styles.grid_progress },
            children: [
                {
                    id: "start",
                    width: 80,
                    header: "開始",
                    headerCellStyle: {
                        className: `${styles.header_cell} ${styles.header_row2}`,
                    },
                },
                {
                    id: "end",
                    width: 80,
                    header: "終了",
                    headerCellStyle: {
                        className: `${styles.header_cell} ${styles.header_row2}`,
                    },
                },
                {
                    id: "work",
                    width: 40,
                    header: "工数",
                    headerCellStyle: {
                        className: `${styles.header_cell} ${styles.header_row2}`,
                    },
                },
                {
                    id: "progressRate",
                    width: 40,
                    header: "進捗率",
                    headerCellStyle: {
                        className: `${styles.header_cell} ${styles.header_row2}`,
                    },
                },
            ],
        },
        ...monthEntries.map(([month, days]) => ({
            id: month,
            width: 40 * days.length,
            header: (
                <div className={`${styles.header_cell} ${styles.header_row1}`}>
                    {month}
                </div>
            ),
            headerCellStyle: {
                className: styles.header_gantt,
                style: {
                    gridTemplateColumns: `repeat(${days.length}, 1fr)`,
                },
            },
            children: days.map((v) => ({
                id: v,
                width: 40,
                header: v,
                headerCellStyle: {
                    className: `${styles.header_cell} ${styles.header_row2}`,
                },
            })),
        })),
    ];

    const getStatusClass = (status: TaskStatus) => {
        switch (status) {
            case "NotStarted":
                return styles.status_NotStarted;
            case "InProgress":
                return styles.status_InProgress;
            case "Done":
                return styles.status_Done;
            default:
                return "";
        }
    };

    const bodyRowStyle: GridTableProps["bodyRowStyle"] = (row) => {
        const taskIndex = Math.floor(row / 2); // 0,1 → 0番タスク / 2,3 → 1番タスク…
        const task = tasks[taskIndex];
        if (!task) return {};

        return {
            className: `${getStatusClass(task.status)}`,
        };
    };

    const onKeyDown = (pos: CellPos, e: React.KeyboardEvent) => {
        const rowIndex = Math.floor(pos.row / 2);
        const params: GanttParams = {
            taskId: tasks[rowIndex].id,
            date: dates[pos.col - 3],
            isPlan: pos.row % 2 === 1,
        };
        onCellKeyDown(params, e);
    };

    const props: GridTableProps = {
        columns,
        rowCount: tasks.length * 2,
        cellRenderer,
        onKeyDown,
        headerRowStyle: { className: styles.header_row },
        bodyRowStyle,
    };

    return (
        <div
            data-testid="gantt_root"
            className={styles.gantt_root}
            onPointerMove={onGlobalPointerMove}
            onPointerUp={onGlobalPointerUp}
        >
            <GridTable {...props} />
            {tooltip.state && <DragTooltip tooltip={tooltip.state} />}
        </div>
    );
};
