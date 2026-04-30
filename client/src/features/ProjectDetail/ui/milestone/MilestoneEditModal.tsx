import commonStyle from "../../../../common.module.css";
import { Button, InputSelector, Modal } from "../../../../components";
import { MilestonePayload } from "../../../../types/db/milestone";
import { FormProps } from "../../../common/ui/props";
import { createInputs } from "../../types/milestone";

type MilestoneEditModalProps = FormProps<MilestonePayload> & {
    mode: "new" | "edit";
};

export const MilestoneEditModal = ({
    form,
    onChange,
    onSubmit,
    onClose,
    mode,
}: MilestoneEditModalProps) => {
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
