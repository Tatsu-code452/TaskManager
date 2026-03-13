import styles from "./table.module.css";

export const TableHeader = ({ dates, toggleAllPhases, allCollapsed }) => {
    const today = new Date().toISOString().slice(0, 10);

    return (
        <thead>
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
                <th colSpan={4}>計画</th>
                <th colSpan={dates.length}>日付</th>
            </tr>

            <tr className={styles.head_row_2}>
                <th>開始</th>
                <th>終了</th>
                <th>工数</th>
                <th>進捗</th>

                {dates.map((d) => (
                    <th
                        key={d}
                        className={`${styles.date_cell} ${
                            d === today ? styles.today : ""
                        }`}
                    >
                        {d.slice(5)}
                    </th>
                ))}
            </tr>
        </thead>
    );
};
