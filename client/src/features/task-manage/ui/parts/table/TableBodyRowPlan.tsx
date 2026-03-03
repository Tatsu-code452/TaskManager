import React from "react";
import { TaskMatrixValue, TaskModel } from "../../../types/model";
import { EditTarget } from "../../../types/types";
import { MatrixCell } from "./cell/MatrixCell";

interface TableBodyRowPlanProps {
    task: TaskModel;
    editTarget: EditTarget;
    planRowCells: TaskMatrixValue[];
    handleKeyDownCell: React.KeyboardEventHandler<HTMLTableCellElement>;
    handleChangeCell: (target: EditTarget, newValue: number) => void;
    cancelEdit: () => void;
}

export const TableBodyRowPlan = ({
    task,
    planRowCells,
    editTarget,
    handleKeyDownCell,
    handleChangeCell,
    cancelEdit,
}: TableBodyRowPlanProps) => {
    return (
        <tr key={task.id}>
            {/* 計画行 */}
            <td rowSpan={2}>{task.phase}</td>
            <td rowSpan={2}>{task.name}</td>

            {/* 計画ラベル列 */}
            <td>{task.plan.start ?? ""}</td>
            <td>{task.plan.end ?? ""}</td>
            <td>{task.plan.totalHours}</td>
            <td>{task.plan.progress}%</td>

            {planRowCells.map((cell) => (
                <MatrixCell
                    key={task.id + "-" + cell.date}
                    editTarget={editTarget}
                    cell={cell}
                    cellType={{
                        type: "planCell",
                        keySuffix: "-plan",
                        dataTaskIndex: task.id,
                        dataDate: cell.date,
                        dataValue: cell.value,
                    }}
                    taskIndex={task.id}
                    handleKeyDownCell={handleKeyDownCell}
                    handleChangeCell={handleChangeCell}
                    cancelEdit={cancelEdit}
                />
            ))}
        </tr>
    );
};

export default React.memo(TableBodyRowPlan);
