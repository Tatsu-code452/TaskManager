import React from "react";
import { getDayLabel, getMonthLabel } from "../../../domain/dateUtils";
import styles from "./table.module.css";

interface TableHeaderProps {
    dates: string[];
    baseDate: string;
}

export const TableHeader = ({ dates, baseDate }: TableHeaderProps) => {
    return (
        <thead className={styles.none}>
            <tr>
                <th rowSpan={2}>フェーズ</th>
                <th rowSpan={2}>タスク</th>
                <th colSpan={4}>計画/実績</th>
                <th colSpan={dates.length}>スケジュール</th>
            </tr>
            <tr>
                <th>開始</th>
                <th>終了</th>
                <th>工数</th>
                <th>進捗率</th>

                {dates.map((d, idx) => (
                    <th
                        key={d}
                        className={
                            d === baseDate
                                ? styles.target_date
                                : idx === 0
                                  ? styles.start_date
                                  : ""
                        }
                    >
                        <div>{idx === 0 ? getMonthLabel(d) : ""}</div>
                        <div>{getDayLabel(d)}</div>
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default React.memo(TableHeader);
