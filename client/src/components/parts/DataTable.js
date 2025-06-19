import React, { useState } from "react";

/**
 * 汎用テーブルコンポーネント
 * @param {Array} columns - [{ key, label, format? }]
 * @param {Array} data - データ配列
 * @param {string} rowKey - 各行のユニークキー
 * @param {Function} onRowSelect - 行選択時のコールバック関数
 */
function DataTable({ columns, data, rowKey, onRowSelect }) {
    const [selectedRow, setSelectedRow] = useState(null);
    const visibleColumns = columns.filter((col) => !col.hidden);

    const handleRowClick = (row) => {
        setSelectedRow((prev) => (prev === row[rowKey] ? null : row[rowKey]));
        onRowSelect(row); // 選択した行のデータ全体を親コンポーネントに渡す
    };

    return (
        <table className="table table-striped table-bordered">
            <thead className="table-primary">
                <tr>
                    {visibleColumns.map((col) => (
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
                            onClick={() => handleRowClick(row)}
                        >
                            {visibleColumns.map((col) => (
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
