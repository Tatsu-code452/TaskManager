import commonStyles from "../../../../common.module.css";
import { Button } from "../../../../components";
import { useMilestoneController } from "../../hooks/controller/useMilestoneController";
import { MilestoneStates } from "../../hooks/state/useMilestoneStates";
import { MilestoneEditModal } from "./MilestoneEditModal";
import styles from "./MilestoneTab.module.css";
import MilestoneTable from "./MilestoneTable";

interface MilestoneTabProps {
    projectId: string;
    states: MilestoneStates;
}
export const MilestoneTab = ({ projectId, states }: MilestoneTabProps) => {
    const { milestones, showModal, setShowModal, mode, form } = states;

    const { create, update, remove, handleChange, handleShowModal } =
        useMilestoneController(projectId, states);

    return (
        <div className={commonStyles.container}>
            <div className={styles.section_card}>
                <div className={styles.section_title}>マイルストーン一覧</div>

                <div className={styles.header_actions}>
                    <Button
                        variant="primary"
                        onClick={() =>
                            handleShowModal({ mode: "new", milestone: null })
                        }
                    >
                        新規作成
                    </Button>
                </div>

                <div className={commonStyles.table_wrapper}>
                    <MilestoneTable
                        milestones={milestones}
                        remove={remove}
                        handleShowModal={handleShowModal}
                    />
                </div>

                {showModal && (
                    <MilestoneEditModal
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
