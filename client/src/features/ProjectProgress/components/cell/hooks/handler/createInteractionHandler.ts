import { CellDrag, CellParams } from "../../types/type";

export const useCellInteractionHandler = (
    interaction: (date: string, createRef: (el: HTMLElement | null) => void, handlePointerDown: (e: React.PointerEvent) => void, handleStartEdit: () => void, handleUpdateCurrentData: () => void) => JSX.Element,
    createRef: (params: CellParams, el: HTMLDivElement) => void,
    handlePointerDown: (params: CellDrag, e: React.PointerEvent) => void,
    handleUpdateCurrentData: (date: string) => void,
    handleStartEdit: (params: CellParams) => void,
) => (params: CellParams) =>
        interaction(
            params.date,
            (el: HTMLDivElement) => createRef(params, el),
            (e) =>
                handlePointerDown(
                    { ...params, mode: "move", edge: null },
                    e,
                ),
            () => handleStartEdit(params),
            () => handleUpdateCurrentData(params.date),
        )