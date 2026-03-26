import React from "react";
import styles from "./Table.module.css";

type HeaderCell = React.ThHTMLAttributes<HTMLTableCellElement> & {
    content: React.ReactNode;
};

export type BodyCell = {
    content: React.ReactNode;
    props?: React.TdHTMLAttributes<HTMLTableCellElement>;
};

export type BodyRow = {
    cells: BodyCell[];
    rowProps?: React.HTMLAttributes<HTMLTableRowElement>;
};

export interface TableProps {
    headerRows: HeaderCell[][];
    bodyRows: BodyRow[];
}

export const Table = ({ headerRows, bodyRows }: TableProps) => {
    return (
        <table className={styles.table}>
            <thead>
                {headerRows.map((headerCells, rowIndex) => (
                    <tr key={`header_${rowIndex}`}>
                        {headerCells.map((cell, colIndex) => {
                            const { content, ...thProps } = cell;
                            return (
                                <th
                                    key={`header_${rowIndex}_${colIndex}`}
                                    {...thProps}
                                >
                                    {content}
                                </th>
                            );
                        })}
                    </tr>
                ))}
            </thead>

            <tbody>
                {bodyRows.map((row, rowIndex) => (
                    <tr key={`body_${rowIndex}`} {...row.rowProps}>
                        {row.cells.map((cell, colIndex) => {
                            const { content, props } = cell;
                            return (
                                <td key={colIndex} {...props}>
                                    {content}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default React.memo(Table);
