import commonStyles from "../../../../common.module.css";
import { Button } from "../../../../components";
import { useIssueController } from "../../hooks/controller/useIssueController";
import { IssueStates } from "../../hooks/state/useIssueStates";
import { IssueEditModal } from "./IssueEditModal";
import styles from "./IssueTab.module.css";
import IssueTable from "./IssueTable";

interface IssueTabProps {
    projectId: string;
    states: IssueStates;
}

export const IssueTab = ({ projectId, states }: IssueTabProps) => {
    const { issues, showModal, setShowModal, mode, form } = states;

    const {
        create,
        update,
        remove,
        handleChange,
        handleShowModal,
        addTag,
        removeTag,
    } = useIssueController(projectId, states);

    return (
        <div className={commonStyles.container}>
            <div className={styles.section_card}>
                <div className={styles.section_title}>課題一覧</div>

                <div className={styles.header_actions}>
                    <Button
                        variant="primary"
                        onClick={() =>
                            handleShowModal({ mode: "new", issue: null })
                        }
                    >
                        新規作成
                    </Button>
                </div>

                <div className={commonStyles.table_wrapper}>
                    <IssueTable
                        issues={issues}
                        remove={remove}
                        removeTag={removeTag}
                        handleShowModal={handleShowModal}
                    />
                </div>
            </div>

            {showModal && (
                <IssueEditModal
                    form={form}
                    onChange={handleChange}
                    onSubmit={mode === "new" ? create : update}
                    onClose={() => setShowModal(false)}
                    mode={mode}
                    addTag={addTag}
                    removeTag={removeTag}
                />
            )}
        </div>
    );
};
