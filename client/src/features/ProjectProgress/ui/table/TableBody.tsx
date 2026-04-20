import React from "react";
import {
    CollapseDispatch,
    EditDispatch,
    RowSelectors,
} from "../../types/contract";
import { TaskModel } from "../../types/model";
import { GanttDragController } from "../../types/uiApi";
import styles from "./table.module.css";
import { TableBodyRowActual } from "./TableBodyRowActual";
import { TableBodyRowPlan } from "./TableBodyRowPlan";
interface TableBodyProps {
    dates: string[];
    tasks: TaskModel[];
    baseDate: string;
    editDispatch: EditDispatch;
    collapseDispatch: CollapseDispatch;
    selectors: RowSelectors;
    onPointerDown: GanttDragController["onPointerDown"];
    tooltip: GanttDragController["tooltip"];
}

export const TableBody = ({
    dates,
    tasks,
    baseDate,
    editDispatch,
    collapseDispatch,
    selectors,
    onPointerDown,
    tooltip,
}: TableBodyProps) => {
    const taskOrder = tasks.map((t) => t.id);
    const dateList = dates;

    return (
        <tbody>
            {tasks.map((task, index) => {
                const isCollapsed = selectors.collapsedPhases[task.phase];
                const isFirstTaskInPhase =
                    index === 0 || tasks[index - 1].phase !== task.phase;

                return (
                    <React.Fragment key={task.id}>
                        {isFirstTaskInPhase && (
                            <tr className={styles.phase_header}>
                                <td colSpan={999}>
                                    <button
                                        className={styles.phase_toggle_btn}
                                        onClick={() =>
                                            collapseDispatch.togglePhase(
                                                task.phase,
                                            )
                                        }
                                    >
                                        {isCollapsed ? "▶" : "▼"} {task.phase}
                                    </button>
                                </td>
                            </tr>
                        )}

                        {!isCollapsed && (
                            <>
                                <TableBodyRowPlan
                                    task={task}
                                    baseDate={baseDate}
                                    editDispatch={editDispatch}
                                    selectors={selectors}
                                    taskOrder={taskOrder}
                                    dateList={dateList}
                                    onPointerDown={onPointerDown}
                                    tooltip={tooltip}
                                />

                                <TableBodyRowActual
                                    task={task}
                                    baseDate={baseDate}
                                    editDispatch={editDispatch}
                                    selectors={selectors}
                                    taskOrder={taskOrder}
                                    dateList={dateList}
                                    onPointerDown={onPointerDown}
                                    tooltip={tooltip}
                                />
                            </>
                        )}
                    </React.Fragment>
                );
            })}
        </tbody>
    );
};
