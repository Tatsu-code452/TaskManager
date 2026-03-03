import React from "react";
import { EditTarget } from "../../../../types/types";
import styles from "../table.module.css";
import InputCell from "./InputCell";

export type CellType =
    | {
          type: "actualCell";
          keySuffix: "-actual";
          dataTaskIndex: string;
          dataDate: string;
          dataValue: number;
      }
    | {
          type: "planCell";
          keySuffix: "-plan";
          dataTaskIndex: string;
          dataDate: string;
          dataValue: number;
      }
    | {
          type: "actualProgress";
          keySuffix: "-actual-progress";
          dataTaskIndex: string;
          dataValue: number;
      };

interface BaseCellProps {
    isEditing: boolean;
    cellType: CellType;
    editTarget: EditTarget | null;
    handleKeyDownCell: React.KeyboardEventHandler<HTMLTableCellElement>;
    handleChangeCell: (target: EditTarget, newValue: number) => void;
    cancelEdit: () => void;
}

export const BaseCell = ({
    isEditing,
    cellType,
    editTarget,
    handleKeyDownCell,
    handleChangeCell,
    cancelEdit,
}: BaseCellProps) => {
    const isMatrixCell =
        cellType.type === "planCell" || cellType.type === "actualCell";
    const key = isMatrixCell
        ? cellType.dataTaskIndex + cellType.dataDate
        : cellType.dataTaskIndex;
    const unit = isMatrixCell ? "" : "%";

    return (
        <td
            key={key + cellType.keySuffix}
            tabIndex={0}
            data-type={cellType.type}
            data-task-index={cellType.dataTaskIndex}
            data-date={isMatrixCell ? cellType.dataDate : undefined}
            onKeyDown={handleKeyDownCell}
            className={styles.matrix_cell}
        >
            {isEditing ? (
                <InputCell
                    editTarget={{
                        type: cellType.type,
                        taskIndex: cellType.dataTaskIndex,
                        date: isMatrixCell ? cellType.dataDate : undefined,
                        pressedKey: editTarget?.pressedKey,
                    }}
                    currentValue={cellType.dataValue}
                    handleChangeCell={handleChangeCell}
                    cancelEdit={cancelEdit}
                />
            ) : (
                (cellType.dataValue ?? "") + unit
            )}
        </td>
    );
};

export default React.memo(BaseCell);
