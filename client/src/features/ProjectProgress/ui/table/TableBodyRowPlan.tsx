import { MatrixCell } from "./cell/MatrixCell";
import styles from "./table.module.css";

export const TableBodyRowPlan = ({
    task,
    baseDate,
    planRowCells,
    editTarget,
    handleKeyDownCell,
    handleChangeCell,
    startEdit,
    endEdit,
    onDragMove,
    onDragResize,
}) => {
    return (
        <tr className={`${styles.task_row} ${styles[`status_${task.status}`]}`}>
            <td rowSpan={2}>{task.phase}</td>
            <td rowSpan={2}>{task.name}</td>

            <td>{task.plan.start}</td>
            <td>{task.plan.end}</td>
            <td>{task.plan.totalHours}</td>
            <td>{task.plan.progress}%</td>

            {planRowCells.map((cell) => (
                <MatrixCell
                    key={task.id + "-" + cell.date}
                    value={cell.value}
                    task={task}
                    baseDate={baseDate}
                    editTarget={{
                        type: "planCell",
                        taskIndex: task.id,
                        date: cell.date,
                    }}
                    currentEditTarget={editTarget}
                    handleKeyDownCell={handleKeyDownCell}
                    handleChangeCell={handleChangeCell}
                    startEdit={startEdit}
                    endEdit={endEdit}
                    onDragMove={onDragMove}
                    onDragResize={onDragResize}
                />
            ))}
        </tr>
    );
};
