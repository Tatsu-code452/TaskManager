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
    const styleList = [styles.bar_base];

    if (value) {
        styleList.push(isPlan ? styles.plan_bar : styles.actual_bar);
    }
    if (isToday) styleList.push(styles.today);
    if (isDelayed) styleList.push(styles.delay_bar);

    return (
        <div className={styleList.join(" ")}>
            {value !== undefined && value !== null ? value : ""}
        </div>
    );
};

export default React.memo(CellVisual);
