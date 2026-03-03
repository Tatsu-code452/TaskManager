import React from "react";
import { TaskModel } from "../../../types/model";
import { EditTarget } from "../../../types/types";
import TableBodyRowActual from "./TableBodyRowActual";
import TableBodyRowPlan from "./TableBodyRowPlan";

interface TableBodyProps {
    dates: string[];
    tasks: TaskModel[];
    editTarget: EditTarget;
    handleKeyDownCell: React.KeyboardEventHandler<HTMLTableCellElement>;
    handleChangeCell: (target: EditTarget, newValue: number) => void;
    cancelEdit: () => void;
}

export const TableBody = ({
    dates,
    tasks,
    editTarget,
    handleKeyDownCell,
    handleChangeCell,
    cancelEdit,
}: TableBodyProps) => {
    return (
        <tbody>
            {tasks.map((task) => {
                const planRowCells = dates.map((d) => {
                    const target = task.plan.cells.find((c) => c.date === d);
                    if (!target) return { date: d, value: null };
                    return target;
                });
                const actualRowCells = dates.map((d) => {
                    const target = task.actual.cells.find((c) => c.date === d);
                    if (!target) return { date: d, value: null };
                    return target;
                });

                return (
                    <React.Fragment key={task.id}>
                        {/* 計画行 */}
                        <TableBodyRowPlan
                            task={task}
                            editTarget={editTarget}
                            planRowCells={planRowCells}
                            handleKeyDownCell={handleKeyDownCell}
                            handleChangeCell={handleChangeCell}
                            cancelEdit={cancelEdit}
                        />

                        {/* 実績行 */}
                        <TableBodyRowActual
                            task={task}
                            editTarget={editTarget}
                            actualRowCells={actualRowCells}
                            handleKeyDownCell={handleKeyDownCell}
                            handleChangeCell={handleChangeCell}
                            cancelEdit={cancelEdit}
                        />
                    </React.Fragment>
                );
            })}
        </tbody>
    );
};

export default React.memo(TableBody);
