import React from "react";

export const CellVisual = ({
    value,
    className,
}: {
    value: number;
    className: string;
}) => <div className={className}>{value ?? ""}</div>;

export default React.memo(CellVisual);
