import React from "react";
import GridTable from "../../../../components/grid-table/GridTable";
import { TaskModel } from "../../components/cell";
import { Tooltip } from "../../components/tooltip";
import { useGanttScrollController } from "../../hooks/controller/useGanttScrollController";
import { EditDispatch, RowSelectors } from "../../types/contract";
import styles from "./grid.module.css";
import { useCreateGridProps } from "./logic/createGridProps";

interface Props {
    projectId: string;
    tasks: TaskModel[];
    baseDate: string;
    dates: string[];
    editDispatch: EditDispatch;
    selectors: RowSelectors;
    onLoadTasks: () => Promise<void>;
}

export const ProjectProgressGrid = ({
    projectId,
    tasks,
    baseDate,
    dates,
    editDispatch,
    selectors,
    onLoadTasks,
}: Props) => {
    const { handleScroll, offsetPx, visibleDates } =
        useGanttScrollController(dates);
    const {
        columns,
        cellRenderer,
        bodyRowStyle,
        tooltip,
        onGlobalPointerMove,
        onGlobalPointerUp,
    } = useCreateGridProps({
        projectId,
        tasks,
        baseDate,
        dates: visibleDates,
        editDispatch,
        selectors,
        onLoadTasks,
    });

    return (
        <div>
            <div
                data-testid="gantt_root"
                className={styles.gantt_root}
                onPointerMove={onGlobalPointerMove}
                onPointerUp={onGlobalPointerUp}
                onScroll={handleScroll}
            >
                <div style={{ transform: `translateX(${offsetPx}px)` }}>
                    <GridTable
                        columns={columns}
                        rowCount={tasks.length * 2}
                        cellRenderer={cellRenderer}
                        headerRowStyle={{ className: styles.header_row }}
                        bodyRowStyle={bodyRowStyle}
                    />
                </div>
                <Tooltip ref={tooltip.state} />
            </div>
        </div>
    );
};

export default React.memo(ProjectProgressGrid);
