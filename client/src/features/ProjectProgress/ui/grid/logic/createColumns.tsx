import { ColumnDef } from "../../../../../components/grid-table/types";
import styles from "../grid.module.css";

interface Props {
    monthEntries: [string, string[]][];
}

export const createColumns = ({ monthEntries }: Props): ColumnDef[] => {
    const progressChildren: ColumnDef[] = [
        { id: "start", header: "開始" },
        { id: "end", header: "終了" },
        { id: "work", header: "工数" },
        { id: "progressRate", header: "進捗率" },
    ].map((col) => ({
        ...col,
        headerCellStyle: {
            className: `${styles.header_cell} ${styles.header_row2}`,
        },
    }));

    const ganttColumns: ColumnDef[] = monthEntries.map(([month, days]) => ({
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
        bodyCellStyle: { className: styles.body_gantt },
        children: days.map((v) => ({
            id: v,
            header: v,
            headerCellStyle: {
                className: `${styles.header_cell} ${styles.header_row2}`,
            },
        })),
    }));

    return [
        {
            id: "phase",
            width: 120,
            header: "フェーズ",
            headerCellStyle: {
                className: styles.header_cell,
                style: { position: "sticky", left: 0, zIndex: 50 },
            },
            bodyCellStyle: {
                className: styles.body_cell,
                style: { position: "sticky", left: 0, zIndex: 1 },
            },
        },
        {
            id: "task",
            width: 200,
            header: "タスク名",
            headerCellStyle: {
                className: styles.header_cell,
                style: { position: "sticky", left: 120, zIndex: 1 },
            },
            bodyCellStyle: {
                className: styles.body_cell,
                style: { position: "sticky", left: 120, zIndex: 1 },
            },
        },
        {
            id: "progress",
            width: 320,
            header: (
                <div className={`${styles.header_cell} ${styles.header_row1}`}>
                    計画/実績
                </div>
            ),
            headerCellStyle: {
                className: styles.grid_progress,
                style: { position: "sticky", left: 320, zIndex: 1 },
            },
            bodyCellStyle: {
                className: styles.grid_progress,
                style: { position: "sticky", left: 320, zIndex: 1 },
            },
            children: progressChildren,
        },
        ...ganttColumns,
    ];
};
