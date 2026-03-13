import { MatrixCell } from "./cell/MatrixCell";
import styles from "./table.module.css";

export const TableBodyRowPlan = ({
    task,
    planRowCells,
    editTarget,
    handleKeyDownCell,
    handleChangeCell,
    cancelEdit,
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
                    cell={cell}
                    task={task}
                    cellType="planCell"
                    editTarget={editTarget}
                    handleKeyDownCell={handleKeyDownCell}
                    handleChangeCell={handleChangeCell}
                    cancelEdit={cancelEdit}
                    onDragMove={onDragMove}
                    onDragResize={onDragResize}
                />
            ))}
        </tr>
    );
};
