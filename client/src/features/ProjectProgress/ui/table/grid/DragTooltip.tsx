import React from "react";
// import { TooltipState } from "../../../types/uiApi";

// export const DragTooltip = ({ tooltip }: { tooltip: TooltipState }) => {
//     const style = React.useMemo(
//         () => ({
//             top: tooltip.y,
//             left: tooltip.x,
//             position: "fixed" as const,
//             background: "rgba(0,0,0,0.75)",
//             color: "white",
//             padding: "4px 8px",
//             borderRadius: 4,
//             fontSize: "12px",
//             pointerEvents: "none" as const,
//             zIndex: 9999,
//         }),
//         [tooltip.x, tooltip.y],
//     );

//     if (!tooltip || !style) return null;

//     const prefixResize =
//         tooltip.mode === "move"
//             ? ""
//             : tooltip.edge === "start"
//               ? "開始:"
//               : "終了:";
//     const text = `${prefixResize}${tooltip.from} → ${tooltip.to}`;

//     return (
//         <div style={style}>
//             <div>{text}</div>
//         </div>
//     );
// };

export const DragTooltip = React.forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div
            ref={ref}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                transform: "translate(-9999px, -9999px)",
                background: "rgba(0,0,0,0.75)",
                color: "white",
                padding: "4px 8px",
                borderRadius: 4,
                fontSize: "12px",
                pointerEvents: "none",
                zIndex: 9999,
                display: "none",
            }}
        />
    );
});

export default React.memo(DragTooltip);
