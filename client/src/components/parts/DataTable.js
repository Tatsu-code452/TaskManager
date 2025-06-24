import React, { useState } from "react";

/**
 * 汎用テーブルコンポーネント
 * @param {Object} props
 * @param {Array} props.columns - 列定義: [{ key, label, format?, hidden? }]
 * @param {Array} props.data - 行データ配列
 * @param {string} props.rowKey - 各行の一意なキー
 * @param {Function} props.onRowSelect - 行クリック時のコールバック
 * @returns {JSX.Element}
 */
const DataTable = ({
    columns = [],
    data = [],
    rowKey,
    onRowSelect = () => {},
}) => {
    const [selectedRowKey, setSelectedRowKey] = useState(null);

    const visibleColumns = columns.filter((col) => !col.hidden);

    const handleRowClick = (e, row) => {
        const currentKey = row[rowKey];
        setSelectedRowKey((prev) => (prev === currentKey ? null : currentKey));
        onRowSelect(e, row);
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
                    const rowId = row[rowKey];
                    const isSelected = rowId === selectedRowKey;

                    return (
                        <tr
                            key={rowId}
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
