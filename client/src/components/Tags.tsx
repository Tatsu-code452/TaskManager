import React from "react";
import { Tag, TagType } from "../types/db/common";
import styles from "./Tags.module.css";

interface TagsProps {
    tags: Tag[];
    tagTypeLabel: Record<TagType, string>;
    onRemove: (index: number) => void;
}

export const Tags = ({ tags, tagTypeLabel, onRemove }: TagsProps) => {
    if (tags.length === 0) {
        return <div className={styles.tag_empty}>タグなし</div>;
    }

    return (
        <>
            {tags.map((tag, index) => (
                <span
                    key={`${tag.tag_type}-${tag.value}`}
                    className={`${styles.tag} ${styles[`tag_${tag.tag_type}`]}`}
                >
                    {tagTypeLabel[tag.tag_type]}: {tag.value}
                    <button
                        className={styles.tag_remove}
                        onClick={() => onRemove(index)}
                    >
                        ×
                    </button>
                </span>
            ))}
        </>
    );
};

export default React.memo(Tags);
