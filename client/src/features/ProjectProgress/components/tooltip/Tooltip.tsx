import React from "react";

export const Tooltip = React.forwardRef<HTMLDivElement>((_, ref) => {
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

export default React.memo(Tooltip);
