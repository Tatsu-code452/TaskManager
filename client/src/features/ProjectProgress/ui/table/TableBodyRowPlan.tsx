import { getDelayStatus } from "../../domain/service/delay";
import { EditDispatch, GanttParams, RowSelectors } from "../../types/contract";
import { TaskModel } from "../../types/model";
import { GanttDragController } from "../../types/uiApi";
import { MatrixCell } from "./cell/MatrixCell";
import { createMatrixCellRenderers } from "./cell/MatrixCellRenderers";
import styles from "./table.module.css";

interface TableBodyRowPlanProps {
    dateList: string[];
    task: TaskModel;
    baseDate: string;
    editDispatch: EditDispatch;
    selectors: RowSelectors;
    taskOrder: string[];
    onPointerDown: GanttDragController["onPointerDown"];
}

export const TableBodyRowPlan = ({
    dateList,
    task,
    baseDate,
    editDispatch,
    selectors,
    taskOrder,
    onPointerDown,
}: TableBodyRowPlanProps) => {
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
            <td rowSpan={2}>{task.phase}</td>
            <td rowSpan={2}>{task.name}</td>

            <td>{task.plan.start}</td>
            <td>{task.plan.end}</td>
            <td>{task.plan.totalHours}</td>
            <td>{task.plan.progress}%</td>

            {dateList.map((date) => {
                const params: GanttParams = {
                    taskId: task.id,
                    date,
                    isPlan: true,
                };
                const rendererResults = createMatrixCellRenderers({
                    params,
                    value: task.plan.cells[date] ?? null,
                    task,
                    baseDate,
                    onPointerDown,
                });

                return (
                    <MatrixCell
                        key={task.id + "-" + date}
                        editDispatch={editDispatch}
                        editTarget={selectors.editTarget}
                        taskOrder={taskOrder}
                        dateList={dateList}
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
