import React from "react";
import { TaskMatrixValue, TaskModel } from "../../../types/model";
import { EditTarget } from "../../../types/types";
import { MatrixCell } from "./cell/MatrixCell";
import { ProgressCell } from "./cell/ProgressCell";

interface TableBodyRowActualProps {
    task: TaskModel;
    editTarget: EditTarget;
    actualRowCells: TaskMatrixValue[];
    handleKeyDownCell: React.KeyboardEventHandler<HTMLTableCellElement>;
    handleChangeCell: (target: EditTarget, newValue: number) => void;
    cancelEdit: () => void;
}

export const TableBodyRowActual = ({
    task,
    editTarget,
    actualRowCells,
    handleKeyDownCell,
    handleChangeCell,
    cancelEdit,
}: TableBodyRowActualProps) => {
    return (
        <tr>
            {/* 実績行 */}
            {/* 実績ラベル列 */}
            <td>{task.actual.start ?? ""}</td>
            <td>{task.actual.end ?? ""}</td>
            <td>{task.actual.totalHours}</td>
            <ProgressCell
                editTarget={editTarget}
                taskIndex={task.id}
                cellType={{
                    type: "actualProgress",
                    keySuffix: "-actual-progress",
                    dataTaskIndex: task.id,
                    dataValue: task.actual.progress,
                }}
                handleKeyDownCell={handleKeyDownCell}
                handleChangeCell={handleChangeCell}
                cancelEdit={cancelEdit}
            />
            {actualRowCells.map((cell) => (
                <MatrixCell
                    key={task.id + "-" + cell.date}
                    editTarget={editTarget}
                    cell={cell}
                    cellType={{
                        type: "actualCell",
                        keySuffix: "-actual",
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

export default React.memo(TableBodyRowActual);
