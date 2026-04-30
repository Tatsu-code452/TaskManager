import { useMemo } from "react";
import { CellPos } from "../../../../../../components/grid-table/types";
import { TaskModel } from "../../../../components/cell";

export const useResolveUtils = ({ rendererProgress, ganttRowRenderer, monthEntries }: {
    rendererProgress?: (task: TaskModel) => JSX.Element;
    ganttRowRenderer?: (task: TaskModel, [ym, days]: [string, string[]]) => JSX.Element;
    monthEntries?: [string, string[]][];
}) => {

    const resolveTask = (pos: CellPos, tasks: TaskModel[]) => {
        const rowIndex = Math.floor(pos.row / 2);
        return tasks[rowIndex] ?? null;
    };

    const resolveCellTypeToWbs = (pos: CellPos) => {
        if (pos.row % 2 === 1) return "empty";
        if (pos.col === 0) return "phase";
        if (pos.col === 1) return "task";
        if (pos.col === 2) return "progress";
        return "empth";
    };

    const cellTypeMapToWbs = useMemo(
        () => ({
            empty: () => "",
            phase: (task: TaskModel) => task.phase,
            task: (task: TaskModel) => task.name,
            progress: (task: TaskModel) => rendererProgress(task),
        }),
        [rendererProgress],
    );


    const resolveCellTypeToGantt = (pos: CellPos) => {
        if (pos.row % 2 === 1) return "empty";
        return "gantt";
    };

    const cellTypeMapToGantt = useMemo(
        () => ({
            empty: () => "",
            gantt: (task: TaskModel, colIndex: number) =>
                ganttRowRenderer(task, monthEntries[colIndex]),
        }),
        [ganttRowRenderer, monthEntries],
    );


    return {
        resolveTask,
        resolveCellTypeToWbs,
        resolveCellTypeToGantt,
        cellTypeMapToWbs,
        cellTypeMapToGantt
    }
}