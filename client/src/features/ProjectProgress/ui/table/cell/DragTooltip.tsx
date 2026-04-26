import React from "react";
import { TooltipState } from "../../../types/uiApi";

export const DragTooltip = ({ tooltip }: { tooltip: TooltipState }) => {
    if (!tooltip) return null;
    const prefixResize =
        tooltip.mode === "move"
            ? ""
            : tooltip.edge === "start"
              ? "開始:"
              : "終了:";
    const text = `${prefixResize}${tooltip.from} → ${tooltip.to}`;

    return (
        <div
            style={{
                top: tooltip.y,
                left: tooltip.x,
                position: "fixed",
                background: "rgba(0,0,0,0.75)",
                color: "white",
                padding: "4px 8px",
                borderRadius: 4,
                fontSize: "12px",
                pointerEvents: "none",
                zIndex: 9999,
            }}
        >
            <div>{text}</div>
        </div>
    );
};

export default React.memo(DragTooltip);
