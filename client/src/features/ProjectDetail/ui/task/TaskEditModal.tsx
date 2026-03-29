import commonStyle from "../../../../common.module.css";
import { Button, InputSelector, Modal } from "../../../../components";
import { TaskPayload } from "../../../../types/db/task";
import { FormProps } from "../../../common/ui/props";
import { createInputs } from "../../types/task";

type TaskEditModalProps = FormProps<TaskPayload> & {
    mode: "new" | "edit";
};

export const TaskEditModal = ({
    form,
    onChange,
    onSubmit,
    onClose,
    mode,
}: TaskEditModalProps) => {
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
                    保存
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    キャンセル
                </Button>
            </div>
        </Modal>
    );
};
