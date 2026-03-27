import React, { useState } from "react";
import { TagType } from "../types/db/common";
import Button from "./Button";
import Input from "./Input";
import styles from "./TagAddRow.module.css";

interface TagAddRowProps {
    tagTypeLabel: Record<TagType, string>;
    onAdd: (newTagType: TagType, newTagValue: string) => void;
}

export const TagAddRow = ({ tagTypeLabel, onAdd }: TagAddRowProps) => {
    const [newTagType, setNewTagType] = useState<TagType>(TagType.Domain);
    const [newTagValue, setNewTagValue] = useState<string>("");

    const handleAdd = () => {
        if (!newTagValue.trim()) return;
        onAdd(newTagType, newTagValue);
        setNewTagValue("");
    };

    return (
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
                    placeholder="タグ名を入力"
                />
            </div>
            <div>
                <Button variant="primary" onClick={handleAdd}>
                    追加
                </Button>
            </div>
        </div>
    );
};

export default React.memo(TagAddRow);
