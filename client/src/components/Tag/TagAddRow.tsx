import Tags from "@components/Tag/Tags";
import React, { useState } from "react";
import { Tag, TagType } from "../../types/db/common";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./TagAddRow.module.css";

interface TagAddRowProps {
    tags: Tag[];
    tagTypeLabel: Record<TagType, string>;
    onRemove: (tag: Tag) => void;
    onAdd: (tag: Tag) => void;
}

export const TagAddRow = ({
    tags,
    tagTypeLabel,
    onRemove,
    onAdd,
}: TagAddRowProps) => {
    const [newTagType, setNewTagType] = useState<TagType>(TagType.Domain);
    const [newTagValue, setNewTagValue] = useState<string>("");

    const handleAdd = () => {
        if (!newTagValue.trim()) return;
        onAdd({ tag_type: newTagType, value: newTagValue });
        setNewTagValue("");
    };

    return (
        <div>
            <div className={styles.tag_add_row}>
                <div>
                    <Input
                        type="select"
                        value={newTagType}
                        options={Object.values(TagType)}
                        labelMap={tagTypeLabel}
                        onChange={(value: TagType) => setNewTagType(value)}
                    />
                </div>

                <div>
                    <Input
                        type="text"
                        value={newTagValue}
                        onChange={(v) => setNewTagValue(v)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleAdd();
                        }}
                        placeholder={"タグ名を入力"}
                    />
                </div>
                <div>
                    <Button variant="primary" onClick={handleAdd}>
                        追加
                    </Button>
                </div>
            </div>
            <div className={styles.tag_add_row}>
                <Tags
                    tags={tags}
                    tagTypeLabel={tagTypeLabel}
                    onRemove={onRemove}
                />
            </div>
        </div>
    );
};

export default React.memo(TagAddRow);
