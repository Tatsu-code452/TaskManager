import React from "react";
import { TaskFilter } from "../../../types/types";
import styles from "./filter.module.css";
import FilterItem from "./FilterItem";

interface FilterPanelProps {
    filter: TaskFilter;
    onChange: (key: keyof TaskFilter, value: string) => void;
}

export const FilterPanel = ({ filter, onChange }: FilterPanelProps) => {
    return (
        <div className={styles.filterPanel}>
            <FilterItem
                filterId={"projectId"}
                label={"プロジェクト"}
                value={filter.projectId}
                onChange={onChange}
            />
            <FilterItem
                filterId={"phaseId"}
                label={"フェーズ"}
                value={filter.phaseId}
                onChange={onChange}
            />
            <FilterItem
                filterId={"userId"}
                label={"担当者"}
                value={filter.userId}
                onChange={onChange}
            />
        </div>
    );
};

export default React.memo(FilterPanel);
