import commonStyle from "../../../../common.module.css";
import {
    Button,
    InputSelector,
    Modal,
    TagAddRow,
    Tags,
} from "../../../../components";
import { TagType, TagTypeLabel } from "../../../../types/db/common";
import { IssuePayload } from "../../../../types/db/issue";
import { FormProps } from "../../../common/ui/props";
import { createInputs } from "../../types/issue";

type IssueEditModalProps = FormProps<IssuePayload> & {
    mode: "new" | "edit";
    addTag: (newTagType: TagType, newTagValue: string) => void;
    removeTag: (index: number) => void;
};

export const IssueEditModal = ({
    form,
    onChange,
    onSubmit,
    onClose,
    mode,
    addTag,
    removeTag,
}: IssueEditModalProps) => {
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

            <div>
                <TagAddRow tagTypeLabel={TagTypeLabel} onAdd={addTag} />
            </div>

            <div>
                <Tags
                    tags={form.tags}
                    tagTypeLabel={TagTypeLabel}
                    onRemove={removeTag}
                />
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
