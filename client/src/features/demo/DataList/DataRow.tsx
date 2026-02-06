import React from "react";
import { DataRowProps } from "./types";

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
            role="row"
            tabIndex={0}
            aria-pressed={selected}
        >
            <td className="cell">
                <button
                    type="button"
                    className="button warn"
                    tabIndex={-1}
                    onClick={(e) => {
                        // select発火抑止
                        e.stopPropagation();
                        onDelete();
                    }}
                    style={{ marginLeft: 6 }}
                >
                    削除
                </button>
            </td>

            {columns.map((k) => {
                const value = item[k];
                const display =
                    value === null
                        ? ""
                        : typeof value === "object"
                          ? JSON.stringify(value, null, 2)
                          : String(value ?? "");
                return (
                    <td key={k} className="cell">
                        {display}
                    </td>
                );
            })}
        </tr>
    );
};

export default React.memo(DataRow);
