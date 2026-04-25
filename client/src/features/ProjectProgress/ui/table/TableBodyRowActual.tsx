import { getDelayStatus } from "../../domain/service/delay";
import { EditDispatch, GanttParams, RowSelectors } from "../../types/contract";
import { TaskModel } from "../../types/model";
import { GanttDragController } from "../../types/uiApi";
import { MatrixCell } from "./cell/MatrixCell";
import { createMatrixCellRenderers } from "./cell/MatrixCellRenderers";
import styles from "./table.module.css";

interface TableBodyRowActualProps {
    dateList: string[];
    task: TaskModel;
    baseDate: string;
    editDispatch: EditDispatch;
    selectors: RowSelectors;
    taskOrder: string[];
    onPointerDown: GanttDragController["onPointerDown"];
}

export const TableBodyRowActual = ({
    dateList,
    task,
    baseDate,
    editDispatch,
    selectors,
    taskOrder,
    onPointerDown,
}: TableBodyRowActualProps) => {
    const delay = getDelayStatus(task);

    const rowClass = delay.endDelayed
        ? styles.delay_end
        : delay.startDelayed
          ? styles.delay_start
          : delay.workloadDelayed
            ? styles.delay_workload
            : "";

    return (
        <tr
            className={`${styles.task_row} ${styles[`status_${task.status}`]} ${rowClass}`}
        >
            <td>{task.actual.start}</td>
            <td>{task.actual.end}</td>
            <td>{task.actual.totalHours}</td>

            <td
                data-type="actualProgress"
                data-task-index={task.id}
                className={styles.matrix_cell}
            >
                {task.actual.progress}%
            </td>

            {dateList.map((date) => {
                const params: GanttParams = {
                    taskId: task.id,
                    date,
                    isPlan: false,
                };

                const rendererResults = createMatrixCellRenderers({
                    params,
                    value: task.actual.cells[date] ?? null,
                    task,
                    baseDate,
                    onPointerDown,
                });

                return (
                    <MatrixCell
                        key={task.id + "-" + date}
                        editDispatch={editDispatch}
                        editTarget={selectors.editTarget}
                        dateList={dateList}
                        taskOrder={taskOrder}
                        params={params}
                        CellVisualRenderer={rendererResults.cellVisualRenderer}
                        CellDragHandleRenderer={
                            rendererResults.cellDragHandleRenderer
                        }
                        CellEditorRenderer={rendererResults.cellEditorRenderer}
                        CellInteractionRenderer={
                            rendererResults.cellInteractionRenderer
                        }
                    />
                );
            })}
        </tr>
    );
};
