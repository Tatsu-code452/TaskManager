import commonStyle from "../../../common.module.css";
import Button from "../../../components/Button";
import InputSelector from "../../../components/InputSelector";
import { Modal } from "../../../components/Modal";
import { ProjectPayload } from "../../../types/db/project";
import { ModalMode } from "../hooks/state/useProjectFormStates";
import { createInputs } from "../types/model";

type ProjectFormProps = {
    form: ProjectPayload;
    onChange: (key: keyof ProjectPayload, value: string | number) => void;
    onSubmit: () => void;
    onCancel: () => void;
    mode: ModalMode;
};

export const ProjectForm = ({
    form,
    onChange,
    onSubmit,
    onCancel,
    mode,
}: ProjectFormProps) => {
    return (
        <Modal title={mode === "new" ? "新規作成" : "編集"} onClose={onCancel}>
            <div>
                {createInputs(form).map((input) => (
                    <InputSelector
                        key={input.key}
                        input={input}
                        onChange={onChange}
                    />
                ))}
            </div>
            <div className={commonStyle.detail_buttons}>
                <Button variant="primary" onClick={onSubmit}>
                    {mode === "new" ? "作成" : "更新"}
                </Button>
                <Button variant="secondary" onClick={onCancel}>
                    キャンセル
                </Button>
            </div>
        </Modal>
    );
};
