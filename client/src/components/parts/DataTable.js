import React, { useState } from "react";

/**
 * 汎用テーブルコンポーネント
 * @param {Array} columns - [{ key, label, format? }]
 * @param {Array} data - データ配列
 * @param {string} rowKey - 各行のユニークキー
 * @param {Function} onRowSelect - 行選択時のコールバック関数
 */
const DataTable = ({ columns, data, rowKey, onRowSelect }) => {
    const [selectedRow, setSelectedRow] = useState(null);
    const visibleColumns = columns.filter((col) => !col.hidden);

    const handleRowClick = (e, row) => {
        setSelectedRow((prev) => (prev === row[rowKey] ? null : row[rowKey]));
        onRowSelect(e, row); // 選択した行のデータ全体を親コンポーネントに渡す
    };

    return (
        <table className="table table-striped table-bordered">
            <thead className="table-primary">
                <tr>
                    {visibleColumns.map(({ key, label }) => (
                        <th key={key}>{label}</th>
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
                            onClick={(e) => handleRowClick(e, row)}
                        >
                            {visibleColumns.map(({ key, format }) => (
                                <td key={key}>
                                    {format ? format(row[key]) : row[key]}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default DataTable;
