import React from "react";
import GridTable from "../../../../../components/grid-table/GridTable";
import {
    EditDispatch,
    PageStateDispatch,
    RowSelectors,
} from "../../../types/contract";
import { TaskModel } from "../../../types/model";
import { DragTooltip } from "../cell/DragTooltip";
import styles from "./grid.module.css";
import { useCreateGridProps } from "./ui-logic/createGridProps";

interface Props {
    dates: string[];
    projectId: string;
    tasks: TaskModel[];
    baseDate: string;
    pageStateDispatch: PageStateDispatch;
    editDispatch: EditDispatch;
    selectors: RowSelectors;
}

export const ProjectProgressGrid = ({
    dates,
    tasks,
    baseDate,
    projectId,
    pageStateDispatch,
    editDispatch,
    selectors,
}: Props) => {
    const {
        columns,
        cellRenderer,
        onKeyDown,
        bodyRowStyle,
        tooltip,
        onGlobalPointerMove,
        onGlobalPointerUp,
    } = useCreateGridProps({
        dates,
        tasks,
        baseDate,
        projectId,
        pageStateDispatch,
        editDispatch,
        selectors,
    });

    return (
        <div
            data-testid="gantt_root"
            className={styles.gantt_root}
            onPointerMove={onGlobalPointerMove}
            onPointerUp={onGlobalPointerUp}
        >
            <GridTable
                columns={columns}
                rowCount={tasks.length * 2}
                cellRenderer={cellRenderer}
                onKeyDown={onKeyDown}
                headerRowStyle={{ className: styles.header_row }}
                bodyRowStyle={bodyRowStyle}
            />
            {tooltip.state && <DragTooltip tooltip={tooltip.state} />}
        </div>
    );
};

export default React.memo(ProjectProgressGrid);
