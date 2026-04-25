import { useGanttDragController } from "../../hooks/controller/useGanttDragController";
import {
    CollapseDispatch,
    EditDispatch,
    PageStateDispatch,
    RowSelectors,
} from "../../types/contract";
import { TaskModel } from "../../types/model";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import { DragTooltip } from "./cell/DragTooltip";
import styles from "./table.module.css";

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

export const ProjectProgressTable = ({
    dates,
    tasks,
    baseDate,
    projectId,
    pageStateDispatch,
    editDispatch,
    collapseDispatch,
    selectors,
}: TableProps) => {
    const dragController = useGanttDragController(
        projectId,
        tasks,
        pageStateDispatch,
    );

    return (
        <div
            data-testid="gantt_root"
            className={styles.gantt_root}
            onPointerMove={dragController.onGlobalPointerMove}
            onPointerUp={dragController.onGlobalPointerUp}
        >
            <table className={styles.scroll_table}>
                <TableHeader
                    dates={dates}
                    toggleAllPhases={() =>
                        collapseDispatch.toggleAllPhases(tasks)
                    }
                    allCollapsed={selectors.allCollapsed}
                />
                <TableBody
                    dates={dates}
                    tasks={tasks}
                    baseDate={baseDate}
                    collapseDispatch={collapseDispatch}
                    editDispatch={editDispatch}
                    selectors={selectors}
                    onPointerDown={dragController.onPointerDown}
                />
            </table>
            {dragController.tooltip.state && (
                <DragTooltip tooltip={dragController.tooltip.state} />
            )}
        </div>
    );
};
