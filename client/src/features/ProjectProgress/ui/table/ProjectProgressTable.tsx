import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import styles from "./table.module.css";

export const ProjectProgressTable = ({
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
                editTarget={editTarget}
                handleKeyDownCell={handleKeyDownCell}
                handleChangeCell={handleChangeCell}
                cancelEdit={cancelEdit}
                onDragMove={onDragMove}
                onDragResize={onDragResize}
                collapsedPhases={collapsedPhases}
                togglePhase={togglePhase}
            />
        </table>
    );
};
