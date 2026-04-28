import React, { useCallback, useMemo, useState } from "react";
import GridTable from "../../../../../components/grid-table/GridTable";
import { EditDispatch, RowSelectors } from "../../../types/contract";
import { TaskModel } from "../../../types/model";
import { DragTooltip } from "./DragTooltip";
import styles from "./grid.module.css";
import { useCreateGridProps } from "./ui-logic/createGridProps";

interface Props {
    projectId: string;
    tasks: TaskModel[];
    baseDate: string;
    dates: string[];
    editDispatch: EditDispatch;
    selectors: RowSelectors;
    onLoadTasks: () => Promise<void>;
}
const CELL_WIDTH = 40;
const LEFT_CELLS_WIDTH = 640;

export const ProjectProgressGrid = ({
    projectId,
    tasks,
    baseDate,
    dates,
    editDispatch,
    selectors,
    onLoadTasks,
}: Props) => {
    const [scrollLeft, setScrollLeft] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const handleScroll = useCallback(
        (e: React.UIEvent<HTMLDivElement>) => {
            setScrollLeft(e.currentTarget.scrollLeft);

            const scrollLeftForGantt = Math.max(
                0,
                scrollLeft - LEFT_CELLS_WIDTH,
            );
            const offset = scrollLeftForGantt % CELL_WIDTH;
            const snapped = scrollLeftForGantt - offset;

            setStartIndex(Math.max(0, snapped / CELL_WIDTH));
        },
        [scrollLeft],
    );

    const visibleDates = useMemo(
        () => dates.slice(startIndex, startIndex + 50),
        [dates, startIndex],
    );
    const offsetPx = startIndex * CELL_WIDTH;

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
                <DragTooltip ref={tooltip.state} />
            </div>
        </div>
    );
};

export default React.memo(ProjectProgressGrid);
