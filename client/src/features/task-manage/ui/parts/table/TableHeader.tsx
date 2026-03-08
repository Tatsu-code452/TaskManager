import React from "react";
import { getDayLabel, getMonthLabel } from "../../../domain/dateUtils";
import styles from "./table.module.css";

interface TableHeaderProps {
    dates: string[];
    baseDate: string;
}

export const TableHeader = ({ dates, baseDate }: TableHeaderProps) => {
    return (
        <thead className={styles.head_row}>
            <tr className={styles.head_row_1}>
                <th rowSpan={2}>フェーズ</th>
                <th rowSpan={2}>タスク</th>
                <th colSpan={4}>計画/実績</th>
                <th colSpan={dates.length}>スケジュール</th>
            </tr>
            <tr className={styles.head_row_2}>
                <th>開始</th>
                <th>終了</th>
                <th>工数</th>
                <th>進捗率</th>

                {dates.map((d) => (
                    <th
                        key={d}
                        className={
                            d === baseDate
                                ? styles.target_date
                                : d.endsWith("01")
                                  ? styles.start_date
                                  : ""
                        }
                    >
                        <div>{d.endsWith("01") ? getMonthLabel(d) : ""}</div>
                        <div>{getDayLabel(d)}</div>
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default React.memo(TableHeader);
