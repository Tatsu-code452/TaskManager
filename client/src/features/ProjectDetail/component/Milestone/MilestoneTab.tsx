import Button from "@components/Button";
import { useMilestoneController } from "@features/ProjectDetail/component/Milestone/hooks/controller/useMilestoneController";
import MilestoneForm from "@features/ProjectDetail/component/Milestone/ui/MilestoneForm";
import MilestoneTable from "@features/ProjectDetail/component/Milestone/ui/MilestoneTable";
import { useEffect } from "react";
import styles from "./MilestoneTab.module.css";

interface MilestoneTabProps {
    projectId: string;
}
export const MilestoneTab = ({ projectId }: MilestoneTabProps) => {
    const { pageDispatch, modalDispatch } = useMilestoneController(projectId);

    useEffect(() => {
        pageDispatch.handleLoad();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.section_card}>
                <div className={styles.header_actions}>
                    <div className={styles.section_title}>
                        マイルストーン一覧
                    </div>
                    <Button
                        variant="primary"
                        onClick={modalDispatch.onOpenCreate}
                    >
                        新規作成
                    </Button>
                </div>

                <div className={styles.table_wrapper}>
                    <MilestoneTable
                        milestones={pageDispatch.pageState}
                        onRemove={pageDispatch.handleDelete}
                        openEditModal={modalDispatch.onOpenEdit}
                    />
                </div>

                {modalDispatch.isOpen && (
                    <MilestoneForm
                        state={modalDispatch.state}
                        onChange={modalDispatch.onChangeForm}
                        onSubmit={modalDispatch.handleConfirm}
                        onClose={modalDispatch.handleClose}
                    />
                )}
            </div>
        </div>
    );
};
