import React from "react";
import { Entity, DataItem } from "../../const/const";

interface DataRowProps {
    item: DataItem;
    columns: string[];
    selected: boolean;
    onSelect: () => void;
    onDelete: () => void;
}

const DataRow = (props: DataRowProps) => {
    const { item, columns, selected, onSelect, onDelete } = props;

    return (
        <tr
            className={selected ? "selected" : ""}
            onClick={onSelect}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect();
                }
            }}
            role="button"
            tabIndex={0}
            aria-pressed={selected}
        >
            <td className="cell">
                <button
                    type="button"
                    className="button warn"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    style={{ marginLeft: 6 }}
                >
                    削除
                </button>
            </td>

            {columns.map((k) => (
                <td key={k} className="cell">
                    {typeof item[k] === "object"
                        ? JSON.stringify(item[k])
                        : String(item[k] ?? "")}
                </td>
            ))}
        </tr>
    );
};

export default React.memo(DataRow);
