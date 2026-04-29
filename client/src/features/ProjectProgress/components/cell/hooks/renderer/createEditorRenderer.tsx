import React, { useCallback } from "react";
import { GanttParams } from "../../types/type";
import CellEditor from "../../ui/CellEditor";

export const useEditorRenderer = () =>
    useCallback(
        (
            params: GanttParams,
            initialValue: number | null,
            isEditing: (params: GanttParams) => boolean,
            onCellKeyDown: (
                params: GanttParams,
                e: React.KeyboardEvent,
            ) => void,
            handleCellBlur: (e: React.FocusEvent<HTMLInputElement>) => void,
        ) =>
            isEditing(params) && (
                <CellEditor
                    initialValue={initialValue}
                    onCellKeyDown={(e) => onCellKeyDown(params, e)}
                    onBlur={handleCellBlur}
                />
            ),
        [],
    );
