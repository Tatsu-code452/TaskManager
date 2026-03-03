import React from "react";
import { TaskMatrixValue } from "../../../../types/model";
import { EditTarget } from "../../../../types/types";
import BaseCell, { CellType } from "./BaseCell";

interface MatrixCellProps {
    editTarget: EditTarget | null;
    cell: TaskMatrixValue;
    cellType: CellType;
    taskIndex: string;
    handleKeyDownCell: React.KeyboardEventHandler<HTMLTableCellElement>;
    handleChangeCell: (target: EditTarget, newValue: number) => void;
    cancelEdit: () => void;
}

export const MatrixCell = ({
    editTarget,
    cell,
    cellType,
    taskIndex,
    handleKeyDownCell,
    handleChangeCell,
    cancelEdit,
}: MatrixCellProps) => {
    const isEditing =
        editTarget &&
        (editTarget.type === "planCell" || editTarget.type === "actualCell") &&
        editTarget.type === cellType.type &&
        editTarget.taskIndex === taskIndex &&
        editTarget.date === cell.date;

    return (
        <BaseCell
            isEditing={isEditing}
            cellType={cellType}
            editTarget={editTarget}
            handleKeyDownCell={handleKeyDownCell}
            handleChangeCell={handleChangeCell}
            cancelEdit={cancelEdit}
        />
    );
};

export default React.memo(MatrixCell);
