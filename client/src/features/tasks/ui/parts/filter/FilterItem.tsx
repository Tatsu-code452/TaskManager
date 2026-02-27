import React from "react";
import { TaskFilter } from "../../../types/types";
import styles from "./filter.module.css";

interface FilterItemProps {
    filterId: keyof TaskFilter;
    label: string;
    value: string;
    onChange: (key: keyof TaskFilter, value: string) => void;
}

export const FilterItem = ({
    filterId,
    label,
    value,
    onChange,
}: FilterItemProps) => {
    return (
        <div className={styles.filterItem}>
            <label className={styles.filterLabel}>{label}</label>
            <input
                className={styles.filterInput}
                value={value}
                onChange={(e) => onChange(filterId, e.target.value)}
            />
        </div>
    );
};

export default React.memo(FilterItem);
