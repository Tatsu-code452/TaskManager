import Button from "@components/Button/Button";
import Form from "@components/Form/Form";
import { GridTableCreator } from "@components/GridTable/GridTableCreatorExtend";
import { useTaskController } from "@features/ProjectDetail/component/Task/hooks/controller/useTaskController";
import { sectionDefinitions } from "@features/ProjectDetail/component/Task/ui/creator/TaskFormCreator";
import { taskTable } from "@features/ProjectDetail/component/Task/ui/creator/TaskTableCreator";
import { useEffect } from "react";
import styles from "./TaskTab.module.css";

interface TaskTabProps {
    projectId: string;
}
export const TaskTab = ({ projectId }: TaskTabProps) => {
    const { pageDispatch, modalDispatch } = useTaskController(projectId);

    useEffect(() => {
        pageDispatch.handleLoad();
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.section_card}>
                <div className={styles.header_actions}>
                    <div className={styles.section_title}>タスク一覧</div>
                    <Button
                        variant="primary"
                        onClick={modalDispatch.onOpenCreate}
                    >
                        新規作成
                    </Button>
                </div>

                <div className={styles.table_wrapper}>
                    <GridTableCreator
                        tableDefinition={taskTable(
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
