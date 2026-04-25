import styles from "./table.module.css";

export const TableHeader = ({
    dates,
    toggleAllPhases,
    allCollapsed,
}: {
    dates: string[];
    toggleAllPhases: () => void;
    allCollapsed: boolean;
}) => {
    const today = new Date().toISOString().slice(0, 10);

    const groupDates = dates.reduce<Record<string, string[]>>(
        (result, current) => {
            const [year, yearMonth, day] = current.split("-");
            const key = `${year}-${yearMonth}`;
            if (!result[key]) result[key] = [];
            result[key].push(day);
            return result;
        },
        {},
    );
    const grouped = Object.entries(groupDates);

    return (
        <thead data-testid="table_header">
            <tr className={styles.head_row_1}>
                <th rowSpan={2}>
                    フェーズ
                    <div>
                        <button
                            className={styles.phase_toggle_btn}
                            onClick={toggleAllPhases}
                        >
                            {allCollapsed ? "▶ 全展開" : "▼ 全折りたたみ"}
                        </button>
                    </div>
                </th>

                <th rowSpan={2}>タスク名</th>
                <th colSpan={4}>計画/実績</th>
                {grouped.map(([key, value]) => (
                    <th key={`key-${key}`} colSpan={value.length}>
                        {key}
                    </th>
                ))}
            </tr>

            <tr className={styles.head_row_2}>
                <th>開始</th>
                <th>終了</th>
                <th>工数</th>
                <th>進捗</th>

                {grouped.map(([key, value]) =>
                    value.map((day) => {
                        return (
                            <th
                                key={`${key}-${day}`}
                                className={`${styles.date_cell} ${
                                    `${key}-${day}` === today
                                        ? styles.today
                                        : ""
                                }`}
                            >
                                {day}
                            </th>
                        );
                    }),
                )}
            </tr>
        </thead>
    );
};
