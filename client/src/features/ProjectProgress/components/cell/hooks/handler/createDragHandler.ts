import { CellDrag, CellParams, TaskModel } from "../../types/type";
import { useResolveCellParams } from "../resolveCellParams";

export const useDragHandler = (
    drag: (date: string, startDate: string, endDate: string, handlePointerDown: (edge: "start" | "end", e: React.PointerEvent<Element>) => void, handleUpdateCurrentData: () => void) => JSX.Element,
    handlePointerDown: (params: CellDrag, e: React.PointerEvent) => void,
    handleUpdateCurrentData: (date: string) => void,
    resolver: ReturnType<typeof useResolveCellParams>,
) => (params: CellParams, task: TaskModel) =>
        drag(
            params.date,
            resolver.startDate({ ...params, task }),
            resolver.endDate({ ...params, task }),
            (edge, e) =>
                handlePointerDown(
                    { ...params, mode: "resize", edge },
                    e,
                ),
            () => handleUpdateCurrentData(params.date),
        )
