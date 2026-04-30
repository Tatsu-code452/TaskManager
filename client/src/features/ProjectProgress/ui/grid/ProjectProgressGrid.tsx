import React from "react";
import GridTable from "../../../../components/grid-table/GridTable";
import { TaskModel } from "../../components/cell";
import { Tooltip } from "../../components/tooltip";
import { useGanttScrollController } from "../../hooks/controller/useGanttScrollController";
import { useGridScrollContrpller } from "../../hooks/controller/useGridScrollContrpller";
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

    const { ganttRef, wbsRef } = useGridScrollContrpller();

    const {
        ganttColumnsDef,
        wbsColumnsDef,
        wbsRenderer,
        ganttRenderer,
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
            >
                <div className={styles.wbs_area} ref={wbsRef}>
                    <GridTable
                        columns={wbsColumnsDef}
                        rowCount={tasks.length * 2}
                        cellRenderer={wbsRenderer}
                        headerRowStyle={{ className: styles.header_row }}
                        bodyRowStyle={bodyRowStyle}
                    />
                </div>

                <div
                    className={styles.gantt_area}
                    onScroll={handleScroll}
                    ref={ganttRef}
                >
                    <div style={{ transform: `translateX(${offsetPx}px)` }}>
                        <GridTable
                            columns={ganttColumnsDef}
                            rowCount={tasks.length * 2}
                            cellRenderer={ganttRenderer}
                            headerRowStyle={{ className: styles.header_row }}
                            bodyRowStyle={bodyRowStyle}
                        />
                    </div>
                </div>

                <Tooltip ref={tooltip.state} />
            </div>
        </div>
    );
};

export default React.memo(ProjectProgressGrid);
