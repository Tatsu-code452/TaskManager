import styles from "./OverviewTab.module.css";

export const OverviewTab = ({ project }) => {
    return (
        <div className={styles.container}>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <h3>案件進捗</h3>
                    <div className={styles.value}>{project.progress ?? 0}%</div>
                </div>

                <div className={styles.card}>
                    <h3>マイルストーン進捗</h3>
                    <div className={styles.value}>0 / 0</div>
                </div>
            </div>

            <div className={styles.recent}>
                <h3>最近の進捗レポート</h3>
                <div className={styles.empty}>まだ進捗はありません</div>
            </div>
        </div>
    );
};
