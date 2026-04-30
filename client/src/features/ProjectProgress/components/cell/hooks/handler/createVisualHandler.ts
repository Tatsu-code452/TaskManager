import { CellParams, TaskModel } from "../../types/type";
import { useResolveCellParams } from "../resolveCellParams";

export const useVisualHandler = (
    visual: (initialValue: number, className: string) => JSX.Element,
    resolver: ReturnType<typeof useResolveCellParams>,
) => (params: CellParams, task: TaskModel) =>
        visual(
            resolver.initialValue({ ...params, task }),
            resolver.className({ ...params, task }),
        );
