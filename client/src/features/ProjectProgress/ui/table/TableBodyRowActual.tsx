import { MatrixCell } from "./cell/MatrixCell";
import styles from "./table.module.css";

export const TableBodyRowActual = ({
    task,
    actualRowCells,
    editTarget,
    handleKeyDownCell,
    handleChangeCell,
    cancelEdit,
    onDragMove,
    onDragResize,
}) => {
    return (
        <tr className={`${styles.task_row} ${styles[`status_${task.status}`]}`}>
            <td>{task.actual.start}</td>
            <td>{task.actual.end}</td>
            <td>{task.actual.totalHours}</td>

            {/* 実績進捗セル */}
            <td
                data-type="actualProgress"
                data-task-index={task.id}
                className={styles.matrix_cell}
                onKeyDown={handleKeyDownCell}
                onClick={() =>
                    handleChangeCell(
                        { type: "actualProgress", taskIndex: task.id },
                        task.actual.progress,
                    )
                }
            >
                {task.actual.progress}%
            </td>

            {actualRowCells.map((cell) => (
                <MatrixCell
                    key={task.id + "-" + cell.date}
                    cell={cell}
                    task={task}
                    cellType="actualCell"
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
