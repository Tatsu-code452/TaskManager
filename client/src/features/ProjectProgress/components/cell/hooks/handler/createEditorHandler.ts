import { CellParams, EditTarget, TaskModel } from "../../types/type";
import { useResolveCellParams } from "../resolveCellParams";

export const useEditorHandler = (
    editor: (params: CellParams, initialValue: number | null, isEditing: (params: CellParams) => boolean, onCellKeyDown: (params: CellParams, e: React.KeyboardEvent) => void, handleCellBlur: (e: React.FocusEvent<HTMLInputElement>) => void) => JSX.Element,
    handleCellBlur: (params: CellParams, initialValue: number | null, e: React.FocusEvent<HTMLInputElement>) => void,
    isEditing: (editTarget: EditTarget | null, params: CellParams) => boolean,
    onCellKeyDown: (params: CellParams, initialValue: number | null, e: React.KeyboardEvent) => void,
    resolver: ReturnType<typeof useResolveCellParams>,
) => (
    params: CellParams,
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