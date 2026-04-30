import {
    CellParams,
    EditTarget,
    TaskModel,
} from "../../../../../components/cell";
import styles from "../../../grid.module.css";

const createGanttCell = ({
    task,
    date,
    isPlan,
    editTarget,
    ganttCellRenderer,
}: {
    task: TaskModel;
    date: string;
    isPlan: boolean;
    editTarget: EditTarget | null;
    ganttCellRenderer: (
        params: CellParams,
        task: TaskModel,
        editTarget: EditTarget | null,
    ) => JSX.Element;
}) => {
    const params: CellParams = {
        taskId: task.id,
        date,
        isPlan,
    };

    const className = isPlan
        ? `${styles.body_gantt_row1} ${styles.row1}`
        : `${styles.body_gantt_row2} ${styles.row2}`;

    return (
        <div className={className}>
            {ganttCellRenderer(params, task, editTarget)}
        </div>
    );
};

export const useGanttCellRenderer = () => {
    const ganttCellWrapRenderer = (
        task: TaskModel,
        ym: string,
        days: string[],
        editTarget: EditTarget | null,
        ganttCellRenderer: (
            params: CellParams,
            task: TaskModel,
            editTarget: EditTarget | null,
        ) => JSX.Element,
    ) => (
        <>
            {days.map((day) => {
                const date = `${ym}-${day}`;
                return (
                    <div key={`${task.id}-${date}`}>
                        {createGanttCell({
                            task,
                            date,
                            isPlan: true,
                            editTarget,
                            ganttCellRenderer,
                        })}
                        {createGanttCell({
                            task,
                            date,
                            isPlan: false,
                            editTarget,
                            ganttCellRenderer,
                        })}
                    </div>
                );
            })}
        </>
    );

    return {
        ganttCellWrapRenderer,
    };
};
