import { useState } from "react";
import styles from "./inlineEditor.module.css";

type Props<T extends string> = {
    value: T;
    options: readonly T[];
    labelMap: Record<T, string>;
    className?: string;
    onStartEdit: () => void;
    onChange: (v: T) => void;
    onCommit: () => void;
};

export const InlineSelectEditor = <T extends string>({
    value,
    options,
    labelMap,
    className,
    onChange,
    onStartEdit,
    onCommit,
}: Props<T>) => {
    const [editing, setEditing] = useState(false);

    return (
        <div
            className={styles.inline_container}
            onClick={(e) => {
                e.stopPropagation();
                onStartEdit();
                setEditing(true);
            }}
        >
            {!editing && <span className={className}>{labelMap[value]}</span>}

            {editing && (
                <select
                    autoFocus
                    className={styles.inline_select}
                    value={value}
                    onChange={(e) => onChange(e.target.value as T)}
                    onBlur={() => {
                        onCommit();
                        setEditing(false);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onCommit();
                            setEditing(false);
                        }
                        if (e.key === "Escape") setEditing(false);
                    }}
                >
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {labelMap[opt]}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};
