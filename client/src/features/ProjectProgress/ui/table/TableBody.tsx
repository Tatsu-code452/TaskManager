import React from "react";
import { TableBodyRowActual } from "./TableBodyRowActual";
import { TableBodyRowPlan } from "./TableBodyRowPlan";
import styles from "./table.module.css";

export const TableBody = ({
    dates,
    tasks,
    editTarget,
    handleKeyDownCell,
    handleChangeCell,
    cancelEdit,
    onDragMove,
    onDragResize,
    collapsedPhases,
    togglePhase,
}) => {
    return (
        <tbody>
            {tasks.map((task, index) => {
                const isCollapsed = collapsedPhases[task.phase];

                // フェーズの最初のタスクか？
                const isFirstTaskInPhase =
                    index === 0 || tasks[index - 1].phase !== task.phase;

                return (
                    <React.Fragment key={task.id}>
                        {/* ★ フェーズ見出し行 */}
                        {isFirstTaskInPhase && (
                            <tr className={styles.phase_header}>
                                <td colSpan={999}>
                                    <button
                                        className={styles.phase_toggle_btn}
                                        onClick={() => togglePhase(task.phase)}
                                    >
                                        {isCollapsed ? "▶" : "▼"} {task.phase}
                                    </button>
                                </td>
                            </tr>
                        )}

                        {/* ★ 折りたたみ中ならタスク行を表示しない */}
                        {!isCollapsed && (
                            <>
                                <TableBodyRowPlan
                                    task={task}
                                    planRowCells={dates.map((d) => {
                                        const c = task.plan.cells.find(
                                            (x) => x.date === d,
                                        );
                                        return c ?? { date: d, value: null };
                                    })}
                                    editTarget={editTarget}
                                    handleKeyDownCell={handleKeyDownCell}
                                    handleChangeCell={handleChangeCell}
                                    cancelEdit={cancelEdit}
                                    onDragMove={onDragMove}
                                    onDragResize={onDragResize}
                                />

                                <TableBodyRowActual
                                    task={task}
                                    actualRowCells={dates.map((d) => {
                                        const c = task.actual.cells.find(
                                            (x) => x.date === d,
                                        );
                                        return c ?? { date: d, value: null };
                                    })}
                                    editTarget={editTarget}
                                    handleKeyDownCell={handleKeyDownCell}
                                    handleChangeCell={handleChangeCell}
                                    cancelEdit={cancelEdit}
                                    onDragMove={onDragMove}
                                    onDragResize={onDragResize}
                                />
                            </>
                        )}
                    </React.Fragment>
                );
            })}
        </tbody>
    );
};
