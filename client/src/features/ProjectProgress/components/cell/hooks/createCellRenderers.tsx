import { useCallback } from "react";
import GanttCell from "../GanttCell";
import { EditTarget, GanttDrag, GanttParams, TaskModel } from "../types/type";
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

export const CreateUseCellRenderers = ({
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
    onPointerDown: (params: GanttDrag, e: React.PointerEvent) => void;
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

    const gnttCellRenderer = useCallback(
        (
            params: GanttParams,
            task: TaskModel,
            editTarget: EditTarget | null,
        ) => (
            <GanttCell
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
        gnttCellRenderer,
    };
};
