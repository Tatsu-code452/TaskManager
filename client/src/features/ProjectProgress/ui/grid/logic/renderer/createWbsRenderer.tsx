import { useCallback } from "react";
import { CellPos } from "../../../../../../components/grid-table/types";
import { TaskModel } from "../../../../components/cell";
import { useProgressRenderer } from "./body/createProgressRenderer";
import { useResolveUtils } from "./resolveUtils";

export const useWbsRenderer = ({ tasks }: { tasks: TaskModel[] }) => {
    const { rendererProgress } = useProgressRenderer();
    const { resolveTask, resolveCellTypeToWbs, cellTypeMapToWbs } =
        useResolveUtils({
            rendererProgress,
        });

    const cellRenderer = useCallback(
        (pos: CellPos) => {
            const type = resolveCellTypeToWbs(pos);
            const task = resolveTask(pos, tasks);
            if (!task) return "";

            const colIndex = pos.col;
            return cellTypeMapToWbs[type](task, colIndex);
        },
        [tasks, cellTypeMapToWbs, resolveTask, resolveCellTypeToWbs],
    );

    return {
        cellRenderer,
    };
};
