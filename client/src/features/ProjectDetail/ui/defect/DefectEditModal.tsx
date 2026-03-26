import { useState } from "react";
import commonStyle from "../../../../common.module.css";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import InputSelector from "../../../../components/InputSelector";
import { Modal } from "../../../../components/Modal";
import Tags from "../../../../components/Tags";
import { TagType } from "../../../../types/db/common";
import { DefectPayload } from "../../../../types/db/defect";
import { createInputs, TagTypeLabel } from "../../types/defect";
import styles from "./DefectTab.module.css";

interface DefectEditModalProps {
    form: DefectPayload;
    onChange: (target: string, value: unknown) => void;
    onClose: () => void;
    onSave: () => void;
    mode: "new" | "edit";
    addTag: (newTagType: TagType, newTagValue: string) => void;
    removeTag: (index: number) => void;
}

export const DefectEditModal = ({
    form,
    onChange,
    onClose,
    onSave,
    mode,
    addTag,
    removeTag,
}: DefectEditModalProps) => {
    const [newTagType, setNewTagType] = useState<TagType>(TagType.Domain);
    const [newTagValue, setNewTagValue] = useState("");

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

            <div className={styles.tag_add_row}>
                <div>
                    <Input
                        type="select"
                        value={newTagType}
                        options={Object.values(TagType)}
                        labelMap={TagTypeLabel}
                        onChange={(value: TagType) => setNewTagType(value)}
                    />
                </div>

                <div>
                    <Input
                        type="text"
                        value={newTagValue}
                        onChange={(v) => setNewTagValue(v)}
                        placeholder="タグ名を入力"
                    />
                </div>
                <div>
                    <Button
                        variant="primary"
                        onClick={() => addTag(newTagType, newTagValue)}
                    >
                        追加
                    </Button>
                </div>
            </div>
            <div>
                <Tags
                    tags={form.tags}
                    tagTypeLabel={TagTypeLabel}
                    onRemove={removeTag}
                />
            </div>
            <div className={commonStyle.detail_buttons}>
                <Button variant="primary" onClick={onSave}>
                    保存
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    キャンセル
                </Button>
            </div>
        </Modal>
    );
};
