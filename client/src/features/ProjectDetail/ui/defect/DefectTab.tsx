import commonStyles from "../../../../common.module.css";
import { Button } from "../../../../components";
import { useDefectController } from "../../hooks/controller/useDefectController";
import { DefectStates } from "../../hooks/state/useDefectStates";
import { DefectEditModal } from "./DefectEditModal";
import styles from "./DefectTab.module.css";
import DefectTable from "./DefectTable";

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

                <div className={styles.header_actions}>
                    <Button
                        variant="primary"
                        onClick={() =>
                            handleShowModal({ mode: "new", defect: null })
                        }
                    >
                        新規作成
                    </Button>
                </div>

                <div className={commonStyles.table_wrapper}>
                    <DefectTable
                        defects={defects}
                        remove={remove}
                        removeTag={removeTag}
                        handleShowModal={handleShowModal}
                    />
                </div>
            </div>

            {showModal && (
                <DefectEditModal
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
