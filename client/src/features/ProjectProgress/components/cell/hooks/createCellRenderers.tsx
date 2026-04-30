import { useCallback } from "react";
import Cell from "../Cell";
import { CellDrag, CellParams, EditTarget, TaskModel } from "../types/type";
import { useCellController } from "./controller/useCellController";
import { useCellKeyboard } from "./controller/useCellKeyboard";
import { useCellUIFactories } from "./createCellUIFactories";
import {
    useCellInteractionHandler,
    useDragHandler,
    useEditorHandler,
    useVisualHandler,
} from "./handler";
import { useResolveCellParams } from "./resolveCellParams";

export const useCellRenderers = ({
    baseDate,
    dates,
    startEdit,
    endEdit,
    onPointerDown,
    onUpdateCurrentDate,
    onLoadTasks,
}: {
    baseDate: string;
    dates: string[];
    startEdit: (editTarget: EditTarget) => void;
    endEdit: () => void;
    onPointerDown: (params: CellDrag, e: React.PointerEvent) => void;
    onUpdateCurrentDate: (date: string) => void;
    onLoadTasks: () => void;
}) => {
    const controller = useCellController({
        startEdit,
        endEdit,
        onLoadTasks,
        onPointerDown,
        onUpdateCurrentDate,
    });

    const keyboard = useCellKeyboard(
        controller.onCommit,
        controller.focusCell,
        dates,
    );

    const resolver = useResolveCellParams(baseDate);
    const ui = useCellUIFactories();

    const visualHandler = useVisualHandler(ui.visual, resolver);
    const dragHandler = useDragHandler(
        ui.drag,
        controller.handlePointerDown,
        controller.handleUpdateCurrentData,
        resolver,
    );
    const editorHandler = useEditorHandler(
        ui.editor,
        controller.handleCellBlur,
        controller.isEditing,
        keyboard.onCellKeyDown,
        resolver,
    );
    const interactionHandler = useCellInteractionHandler(
        ui.interaction,
        controller.createRef,
        controller.handlePointerDown,
        controller.handleUpdateCurrentData,
        controller.handleStartEdit,
    );

    const cellRenderer = useCallback(
        (
            params: CellParams,
            task: TaskModel,
            editTarget: EditTarget | null,
        ) => (
            <Cell
                params={params}
                CellVisualRenderer={() => visualHandler(params, task)}
                CellDragHandleRenderer={() => dragHandler(params, task)}
                CellEditorRenderer={() =>
                    editorHandler(params, task, editTarget)
                }
                CellInteractionRenderer={() => interactionHandler(params)}
            />
        ),
        [visualHandler, dragHandler, editorHandler, interactionHandler],
    );

    return {
        cellRenderer,
    };
};
