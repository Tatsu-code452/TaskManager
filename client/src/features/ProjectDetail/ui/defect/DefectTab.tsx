import commonStyles from "../../../../common.module.css";
import Button from "../../../../components/Button";
import Tags from "../../../../components/Tags";
import { useDefectController } from "../../hooks/controller/useDefectController";
import { DefectStates } from "../../hooks/state/useDefectStates";
import {
    DefectSeverityLabel,
    DefectStatusLabel,
    TagTypeLabel,
} from "../../types/defect";
import { DefectEditModal } from "./DefectEditModal";
import styles from "./DefectTab.module.css";

interface DefectTabProps {
    projectId: string;
    states: DefectStates;
}

export const DefectTab = ({ projectId, states }: DefectTabProps) => {
    const { defects, showModal, setShowModal, mode, form } = states;

    const {
        create,
        update,
        remove,
        handleChange,
        handleShowModal,
        addTag,
        removeTag,
    } = useDefectController(projectId, states);

    return (
        <div className={commonStyles.container}>
            <div className={styles.section_card}>
                <div className={styles.section_title}>欠陥一覧</div>
                <Button
                    variant="primary"
                    onClick={() =>
                        handleShowModal({ mode: "new", defect: null })
                    }
                >
                    新規欠陥
                </Button>

                <div className={commonStyles.table_wrapper}>
                    <table className={commonStyles.table}>
                        <thead>
                            <tr>
                                <th className={styles.col_title}>タイトル</th>
                                <th className={styles.col_detail}>詳細</th>
                                <th className={styles.col_tags}>タグ</th>
                                <th className={styles.col_severity}>重大度</th>
                                <th className={styles.col_status}>
                                    ステータス
                                </th>
                                <th className={styles.col_owner}>担当者</th>
                                <th className={styles.col_reviewer}>確認者</th>
                                <th className={styles.col_date}>期日</th>
                                <th className={styles.col_date}>修正日</th>
                                <th className={styles.col_date}>確認日</th>
                                <th className={styles.col_actions}>編集</th>
                            </tr>
                        </thead>
                        <tbody>
                            {defects.map((d) => (
                                <tr key={d.id}>
                                    <td>{d.title}</td>
                                    <td>{d.description}</td>
                                    <td>
                                        <Tags
                                            tags={d.tags}
                                            tagTypeLabel={TagTypeLabel}
                                            onRemove={removeTag}
                                        />
                                    </td>
                                    <td>
                                        <span
                                            className={`${styles.badge} ${styles[`severity_${d.severity}`]}`}
                                        >
                                            {DefectSeverityLabel[d.severity]}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className={`${styles.badge} ${styles[`status_${d.status}`]}`}
                                        >
                                            {DefectStatusLabel[d.status]}
                                        </span>
                                    </td>
                                    <td>{d.owner || "-"}</td>
                                    <td>{d.reviewer || "-"}</td>
                                    <td>{d.due_date || "-"}</td>
                                    <td>{d.fixed_date || "-"}</td>
                                    <td>{d.verified_date || "-"}</td>
                                    <td>
                                        <Button
                                            icon={true}
                                            onClick={() =>
                                                handleShowModal({
                                                    mode: "edit",
                                                    defect: d,
                                                })
                                            }
                                        >
                                            ✎
                                        </Button>
                                        <Button
                                            icon={true}
                                            onClick={() => remove(d.id)}
                                        >
                                            🗑
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <DefectEditModal
                    form={form}
                    onChange={handleChange}
                    onClose={() => setShowModal(false)}
                    onSave={mode === "new" ? create : update}
                    mode={mode}
                    addTag={addTag}
                    removeTag={removeTag}
                />
            )}
        </div>
    );
};
