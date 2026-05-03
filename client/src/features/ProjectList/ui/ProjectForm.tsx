import commonStyle from "../../../common.module.css";
import { Button, InputSelector, Modal } from "../../../components";
import { ModalState } from "../../../hooks/useModal";
import { ProjectPayload } from "../../../types/db/project";
import { createInputs } from "../types/model";

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
                {createInputs(state.data.form).map((input) => (
                    <InputSelector
                        key={input.key}
                        input={input}
                        onChange={onChange}
                    />
                ))}
            </div>

            <div className={commonStyle.detail_buttons}>
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
