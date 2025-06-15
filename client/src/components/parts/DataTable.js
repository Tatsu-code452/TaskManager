import React, { useState } from "react";

/**
 * 汎用テーブルコンポーネント
 * @param {Array} columns - [{ key, label, format? }]
 * @param {Array} data - データ配列
 * @param {string} rowKey - 各行のユニークキー
 */
function DataTable({ columns, data, rowKey }) {
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (rowId) => {
        setSelectedRow(rowId === selectedRow ? null : rowId); // トグル選択        
    };

    return (
        <table className="table table-striped table-bordered">
            <thead className="table-primary">
                <tr>
                    {columns
                        .filter((col) => col.hidden === false)
                        .map((col) => (
                            <th key={col.key}>{col.label}</th>
                        ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row) => {
                    const isSelected = row[rowKey] === selectedRow;

                    return (
                        <tr
                            key={row[rowKey]}
                            className={isSelected ? "selected" : ""}
                            onClick={() => handleRowClick(row[rowKey])}
                        >
                            {columns
                                .filter((col) => col.hidden === false)
                                .map((col) => (
                                    <td key={col.key}>
                                        {col.format
                                            ? col.format(row[col.key])
                                            : row[col.key]}
                                    </td>
                                ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default DataTable;
