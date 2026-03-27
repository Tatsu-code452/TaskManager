import commonStyles from "../../../../common.module.css";
import { Button } from "../../../../components";
import { usePhaseController } from "../../hooks/controller/usePhaseController";
import { PhaseStates } from "../../hooks/state/usePhaseStates";
import { PhaseEditModal } from "./PhaseEditModal";
import styles from "./PhaseTab.module.css";
import PhaseTable from "./PhaseTable";

interface PhaseTabProps {
    projectId: string;
    states: PhaseStates;
}

export const PhaseTab = ({ projectId, states }: PhaseTabProps) => {
    const { phases, showModal, setShowModal, mode, form } = states;

    const { create, update, remove, handleChange, handleShowModal } =
        usePhaseController(projectId, states);

    return (
        <div className={commonStyles.container}>
            <div className={styles.section_card}>
                <div className={styles.section_title}>フェーズ一覧</div>

                <div className={styles.header_actions}>
                    <Button
                        variant="primary"
                        onClick={() =>
                            handleShowModal({ mode: "new", phase: null })
                        }
                    >
                        新規作成
                    </Button>
                </div>

                <div className={commonStyles.table_wrapper}>
                    <PhaseTable
                        phases={phases}
                        remove={remove}
                        handleShowModal={handleShowModal}
                    />
                </div>

                {showModal && (
                    <PhaseEditModal
                        form={form}
                        onChange={handleChange}
                        onSubmit={mode === "new" ? create : update}
                        onClose={() => setShowModal(false)}
                        mode={mode}
                    />
                )}
            </div>
        </div>
    );
};
