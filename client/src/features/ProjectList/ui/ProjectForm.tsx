import { Button } from "@components/Button";
import { InputSelectors } from "@components/InputSelectors";
import { Modal } from "@components/Modal";
import { ProjectPayload } from "@comtypes/db/project";
import styles from "@features/ProjectList/index.module.css";
import { createInputs } from "@features/ProjectList/types/model";
import { ModalState } from "@hooks/useModal";
import { memo } from "react";

type ProjectFormProps = {
    state: ModalState<ProjectPayload, string>;
    onChange: <K extends keyof ProjectPayload>(
        key: K,
        value: ProjectPayload[K],
    ) => void;
    onSubmit: () => void;
    onClose: () => void;
};

const modeLabel: Record<"new" | "edit", { title: string; submit: string }> = {
    new: {
        title: "新規作成",
        submit: "作成",
    },
    edit: {
        title: "編集",
        submit: "更新",
    },
};

export const ProjectForm = ({
    state,
    onChange,
    onSubmit,
    onClose,
}: ProjectFormProps) => {
    return (
        <Modal title={modeLabel[state.data.mode].title} onClose={onClose}>
            <div>
                <InputSelectors
                    inputs={createInputs(state.data.form)}
                    onChange={onChange}
                />
            </div>

            <div className={styles.detail_buttons}>
                <Button variant="primary" onClick={onSubmit}>
                    {modeLabel[state.data.mode].submit}
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    キャンセル
                </Button>
            </div>
        </Modal>
    );
};

export default memo(ProjectForm);
