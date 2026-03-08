import React from "react";
import { ProgressPageState } from "../../../types/model";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";

import { EditTarget } from "../../../types/types";
import styles from "./table.module.css";

interface ProgressTableProps {
    dates: string[];
    pageState: ProgressPageState;
    editTarget: EditTarget;
    handleKeyDownCell: React.KeyboardEventHandler<HTMLTableCellElement>;
    handleChangeCell: (target: EditTarget, newValue: number) => void;
    cancelEdit: () => void;
}

export const ProgressTable = ({
    dates,
    pageState,
    editTarget,
    handleKeyDownCell,
    handleChangeCell,
    cancelEdit,
}: ProgressTableProps) => {
    return (
        <table className={styles.scroll_table}>
            <TableHeader dates={dates} baseDate={pageState.baseDate} />
            <TableBody
                dates={dates}
                tasks={pageState.tasks}
                editTarget={editTarget}
                handleChangeCell={handleChangeCell}
                handleKeyDownCell={handleKeyDownCell}
                cancelEdit={cancelEdit}
            />
        </table>
    );
};

export default React.memo(ProgressTable);
