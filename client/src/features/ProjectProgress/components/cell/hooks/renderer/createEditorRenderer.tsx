import React, { useCallback } from "react";
import { CellParams } from "../../types/type";
import CellEditor from "../../ui/CellEditor";

export const useEditorRenderer = () =>
    useCallback(
        (
            params: CellParams,
            initialValue: number | null,
            isEditing: (params: CellParams) => boolean,
            onCellKeyDown: (
                params: CellParams,
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
