import { EditTarget, GanttParams, TaskModel } from "../../types/type";
import { useResolveCellParams } from "../resolveCellParams";

export const useEditorHandler = (
    editor: (params: GanttParams, initialValue: number | null, isEditing: (params: GanttParams) => boolean, onCellKeyDown: (params: GanttParams, e: React.KeyboardEvent) => void, handleCellBlur: (e: React.FocusEvent<HTMLInputElement>) => void) => JSX.Element,
    handleCellBlur: (params: GanttParams, initialValue: number | null, e: React.FocusEvent<HTMLInputElement>) => void,
    isEditing: (editTarget: EditTarget | null, params: GanttParams) => boolean,
    onCellKeyDown: (params: GanttParams, initialValue: number | null, e: React.KeyboardEvent) => void,
    resolver: ReturnType<typeof useResolveCellParams>,
) => (
    params: GanttParams,
    task: TaskModel,
    editTarget: EditTarget | null,
) =>
        editor(
            params,
            resolver.initialValue({ ...params, task }),
            (p) => isEditing(editTarget, p),
            (p, e) =>
                onCellKeyDown(
                    p,
                    resolver.initialValue({ ...p, task }),
                    e,
                ),
            (e) =>
                handleCellBlur(
                    params,
                    resolver.initialValue({ ...params, task }),
                    e,
                ),
        )