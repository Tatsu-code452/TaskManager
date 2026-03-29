import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import styles from "./table.module.css";

export const ProjectProgressTable = ({
    dates,
    tasks,
    baseDate,
    editTarget,
    handleKeyDownCell,
    handleChangeCell,
    startEdit,
    endEdit,
    onDragMove,
    onDragResize,
    collapsedPhases,
    togglePhase,
    toggleAllPhases,
    allCollapsed,
}) => {
    return (
        <table className={styles.scroll_table}>
            <TableHeader
                dates={dates}
                toggleAllPhases={toggleAllPhases}
                allCollapsed={allCollapsed}
            />
            <TableBody
                dates={dates}
                tasks={tasks}
                baseDate={baseDate}
                editTarget={editTarget}
                handleKeyDownCell={handleKeyDownCell}
                handleChangeCell={handleChangeCell}
                startEdit={startEdit}
                endEdit={endEdit}
                onDragMove={onDragMove}
                onDragResize={onDragResize}
                collapsedPhases={collapsedPhases}
                togglePhase={togglePhase}
            />
        </table>
    );
};
