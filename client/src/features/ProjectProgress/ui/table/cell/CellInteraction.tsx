import React from "react";
import { GanttParams } from "../../../types/contract";
import {
    GanttDragController,
    MatrixCellController,
} from "../../../types/uiApi";
import styles from "./styles.module.css";

interface CellInteractionProps {
    params: GanttParams;
    onPointerDown: GanttDragController["onPointerDown"];
    onKeyDown: MatrixCellController["onCellKeyDown"];
    onStartEdit: MatrixCellController["onStartEdit"];
    updateCurrentDate: (date: string) => void; // ★ dragData を更新する関数
}

export const CellInteraction = React.forwardRef<
    HTMLDivElement,
    CellInteractionProps
>(
    (
        { params, onPointerDown, onKeyDown, onStartEdit, updateCurrentDate },
        ref,
    ) => {
        return (
            <div
                data-testid="CellInteraction"
                ref={ref}
                className={styles.interaction_layer}
                tabIndex={0}
                onClick={() => onStartEdit(params)}
                data-date={params.date}
                onPointerEnter={() => {
                    updateCurrentDate(params.date);
                }}
                onPointerDown={(e) =>
                    onPointerDown(
                        {
                            ...params,
                            mode: "move",
                        },
                        e,
                    )
                }
                onKeyDown={(e) => onKeyDown(params, e)}
            />
        );
    },
);

export default React.memo(CellInteraction);
