import { TooltipState } from "../../../types/uiApi";

export const DragTooltip = ({ tooltip }: { tooltip: TooltipState }) => {
    if (!tooltip) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: tooltip.y,
                left: tooltip.x,
                background: "rgba(0,0,0,0.75)",
                color: "white",
                padding: "4px 8px",
                borderRadius: 4,
                fontSize: "12px",
                pointerEvents: "none",
                zIndex: 9999,
            }}
        >
            {tooltip.mode === "move" && (
                <div>
                    {tooltip.from} → {tooltip.to}
                </div>
            )}
            {tooltip.mode === "resize" && (
                <div>
                    {tooltip.edge === "start" ? "開始" : "終了"}:{tooltip.from}{" "}
                    → {tooltip.to}
                </div>
            )}
        </div>
    );
};
