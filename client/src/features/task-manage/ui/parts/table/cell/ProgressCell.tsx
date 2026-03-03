import React from "react";
import { EditTarget } from "../../../../types/types";
import BaseCell, { CellType } from "./BaseCell";

interface ProgressCellProps {
    editTarget: EditTarget | null;
    taskIndex: string;
    cellType: CellType;
    handleKeyDownCell: React.KeyboardEventHandler<HTMLTableCellElement>;
    handleChangeCell: (target: EditTarget, newValue: number) => void;
    cancelEdit: () => void;
}

export const ProgressCell = ({
    editTarget,
    taskIndex,
    cellType,
    handleKeyDownCell,
    handleChangeCell,
    cancelEdit,
}: ProgressCellProps) => {
    const isEditing =
        editTarget &&
        editTarget.type === "actualProgress" &&
        editTarget.taskIndex === taskIndex;

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

export default React.memo(ProgressCell);
