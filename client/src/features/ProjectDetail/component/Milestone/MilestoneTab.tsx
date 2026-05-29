import Button from "@components/Button/Button";
import Form from "@components/Form/Form";
import { GridTableCreator } from "@components/GridTable/GridTableCreatorExtend";
import { useMilestoneController } from "@features/ProjectDetail/component/Milestone/hooks/controller/useMilestoneController";
import { sectionDefinitions } from "@features/ProjectDetail/component/Milestone/ui/creator/MilestoneFormCreator";
import { milestoneTable } from "@features/ProjectDetail/component/Milestone/ui/creator/MilestoneTableCreator";
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
                    <GridTableCreator
                        tableDefinition={milestoneTable(
                            pageDispatch.handleDelete,
                            modalDispatch.onOpenEdit,
                        )}
                        rows={pageDispatch.pageState}
                    />
                </div>

                {modalDispatch.isOpen && (
                    <Form
                        state={modalDispatch.state}
                        sectionDefinition={sectionDefinitions}
                        onChange={modalDispatch.onChangeForm}
                        onSubmit={modalDispatch.handleConfirm}
                        onClose={modalDispatch.handleClose}
                    />
                )}
            </div>
        </div>
    );
};
