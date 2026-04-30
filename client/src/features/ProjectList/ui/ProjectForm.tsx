import commonStyle from "../../../common.module.css";
import { Button, InputSelector, Modal } from "../../../components";
import { ProjectPayload } from "../../../types/db/project";
import { FormProps } from "../../common/ui/props";
import { createInputs } from "../types/model";

type ProjectFormProps = FormProps<ProjectPayload> & {
    mode: string;
};

export const ProjectForm = ({
    mode,
    form,
    onChange,
    onSubmit,
    onClose,
}: ProjectFormProps) => {
    return (
        <Modal title={mode === "new" ? "新規作成" : "編集"} onClose={onClose}>
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
                <Button variant="secondary" onClick={onClose}>
                    キャンセル
                </Button>
            </div>
        </Modal>
    );
};
