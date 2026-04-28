import React from "react";
import styles from "./styles.module.css";

interface CellInteractionProps {
    date: string;
    onClick: () => void;
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerEnter: () => void;
}

export const CellInteraction = React.forwardRef<
    HTMLDivElement,
    CellInteractionProps
>(({ date, onPointerDown, onClick, onPointerEnter }, ref) => {
    return (
        <div
            data-testid="CellInteraction"
            data-date={date}
            ref={ref}
            className={styles.interaction_layer}
            tabIndex={0}
            onClick={onClick}
            onPointerEnter={onPointerEnter}
            onPointerDown={onPointerDown}
        />
    );
});

CellInteraction.displayName = "CellInteraction";
export default React.memo(CellInteraction);
