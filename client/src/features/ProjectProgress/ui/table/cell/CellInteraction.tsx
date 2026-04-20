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
}

export const CellInteraction = React.forwardRef<
    HTMLDivElement,
    CellInteractionProps
>(({ params, onPointerDown, onKeyDown }, ref) => {
    return (
        <div
            data-testid="CellInteraction"
            ref={ref}
            className={styles.interaction_layer}
            tabIndex={0}
            onPointerDown={(e) => onPointerDown({ ...params, mode: "move" }, e)}
            onKeyDown={(e) => onKeyDown(params, e)}
        />
    );
});

export default React.memo(CellInteraction);
