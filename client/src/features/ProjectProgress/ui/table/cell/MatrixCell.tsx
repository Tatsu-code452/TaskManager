import { isDelayedCell } from "../../../domain/isDelayed";
import styles from "../table.module.css";

export const MatrixCell = ({
    cell,
    task,
    cellType,
    editTarget,
    handleKeyDownCell,
    handleChangeCell,
    cancelEdit,
    onDragMove,
    onDragResize,
}) => {
    const isEditing =
        editTarget &&
        editTarget.type === cellType &&
        editTarget.taskIndex === task.id &&
        editTarget.date === cell.date;

    const plannedValue =
        task.plan.cells.find((c) => c.date === cell.date)?.value ?? null;
    const actualValue =
        task.actual.cells.find((c) => c.date === cell.date)?.value ?? null;

    const isPlannedBar = cellType === "planCell" && plannedValue !== null;
    const isActualBar = cellType === "actualCell" && actualValue !== null;
    const isDelayed = isDelayedCell(task, cell.date);

    const today = new Date().toISOString().slice(0, 10);

    const isBarStart =
        (cellType === "planCell" && cell.date === task.plan.start) ||
        (cellType === "actualCell" && cell.date === task.actual.start);

    const isBarEnd =
        (cellType === "planCell" && cell.date === task.plan.end) ||
        (cellType === "actualCell" && cell.date === task.actual.end);

    return (
        <td
            className={`
                ${styles.matrix_cell}
                ${isPlannedBar ? styles.plan_bar : ""}
                ${isActualBar ? styles.actual_bar : ""}
                ${isDelayed ? styles.delay_bar : ""}
                ${cell.date === today ? styles.today : ""}
                ${task.isCritical ? styles.critical_border : ""}
            `}
            data-type={cellType}
            data-task-index={task.id}
            data-date={cell.date}
            onKeyDown={handleKeyDownCell}
            onClick={() =>
                handleChangeCell(
                    { type: cellType, taskIndex: task.id, date: cell.date },
                    cell.value ?? 0,
                )
            }
            draggable={isPlannedBar || isActualBar}
            onDragStart={(e) => {
                e.dataTransfer.setData("taskId", task.id);
                e.dataTransfer.setData("date", cell.date);
                e.dataTransfer.setData("type", cellType);
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
                const taskId = e.dataTransfer.getData("taskId");
                const fromDate = e.dataTransfer.getData("date");
                const type = e.dataTransfer.getData("type");
                const edge = e.dataTransfer.getData("edge");
                const toDate = cell.date;

                if (edge) {
                    onDragResize({ taskId, fromDate, toDate, type, edge });
                } else {
                    onDragMove({ taskId, fromDate, toDate, type });
                }
            }}
        >
            {/* 左端ハンドル */}
            {isBarStart && (
                <div
                    className={styles.handle_left}
                    draggable
                    onDragStart={(e) => {
                        e.dataTransfer.setData("taskId", task.id);
                        e.dataTransfer.setData("date", cell.date);
                        e.dataTransfer.setData("type", cellType);
                        e.dataTransfer.setData("edge", "start");
                    }}
                />
            )}

            {/* 右端ハンドル */}
            {isBarEnd && (
                <div
                    className={styles.handle_right}
                    draggable
                    onDragStart={(e) => {
                        e.dataTransfer.setData("taskId", task.id);
                        e.dataTransfer.setData("date", cell.date);
                        e.dataTransfer.setData("type", cellType);
                        e.dataTransfer.setData("edge", "end");
                    }}
                />
            )}

            {isEditing ? (
                <input
                    className={styles.input_cell}
                    autoFocus
                    defaultValue={cell.value ?? ""}
                    onBlur={cancelEdit}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleChangeCell(
                                {
                                    type: cellType,
                                    taskIndex: task.id,
                                    date: cell.date,
                                },
                                Number(e.currentTarget.value),
                            );
                        }
                    }}
                />
            ) : (
                (cell.value ?? "")
            )}
        </td>
    );
};
