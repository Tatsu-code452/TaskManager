import React, { useMemo } from "react";
import { Table } from "../components";

export type TableColumn<T> = {
    headerContent: string;
    headerClassName?: string;
    bodyContent: (row: T) => React.ReactNode;
};

export type TableCreatorProps<T> = {
    tableDef: TableColumn<T>[];
    rows: T[];
    rowProps?: (row: T) => React.HTMLAttributes<HTMLTableRowElement>;
};

export const TableCreator = <T,>({
    tableDef,
    rows,
    rowProps,
}: TableCreatorProps<T>) => {
    const headerRows = useMemo(
        () => [
            tableDef.map((col) => ({
                content: col.headerContent,
                className: col.headerClassName,
            })),
        ],
        [tableDef],
    );

    const bodyRows = useMemo(
        () =>
            rows.map((row) => ({
                rowProps: rowProps ? rowProps(row) : undefined,
                cells: tableDef.map((col) => ({
                    content: col.bodyContent(row),
                })),
            })),
        [rows, tableDef, rowProps],
    );

    return <Table headerRows={headerRows} bodyRows={bodyRows} />;
};

export default React.memo(TableCreator);
