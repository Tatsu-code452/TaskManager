import React from "react";
import styles from "./styles.module.css";

interface CellVisualProps {
    value: number;
    isPlan: boolean;
    isToday: boolean;
    isDelayed: boolean;
}

export const CellVisual = ({
    value,
    isPlan,
    isToday,
    isDelayed,
}: CellVisualProps) => {
    const classList = [
        styles.bar_base,
        value ? (isPlan ? styles.plan_bar : styles.actual_bar) : "",
        isToday ? styles.today : "",
        isDelayed ? styles.delay_bar : "",
    ]
        .filter(Boolean)
        .join(" ");

    return <div className={classList}>{value ?? ""}</div>;
};

export default React.memo(CellVisual);
