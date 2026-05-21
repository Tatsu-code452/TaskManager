import { Cell } from "@components/GridTable/Cell/Cell";
import { Row } from "@components/GridTable/Row/Row";
import { ColumnDef } from "@components/GridTable/types";

export type Props<T> = React.HTMLAttributes<HTMLDivElement> & {
    columnDefs: readonly ColumnDef<T>[];
    rows: T[];
};

export const RowCreator = <T extends object>(
    { columnDefs, rows, ...rest }: Props<T>,
    rowProps?: React.HTMLAttributes<HTMLDivElement>,
): JSX.Element => {
    return (
        <>
            {/* Header */}
            <Row {...rest}>
                {columnDefs.map((col, i) => (
                    <Cell
                        key={`header-${i}`}
                        type="header"
                        className={`${col.headerClass ?? ""}`}
                    >
                        {col.header}
                    </Cell>
                ))}
            </Row>

            {/* Body */}
            {rows.map((row, rowIndex) => (
                <Row key={`row-${rowIndex}`} {...rowProps}>
                    {columnDefs.map((col, colIndex) => (
                        <Cell
                            key={`cell-${rowIndex}-${colIndex}`}
                            className={`body ${col.cellClass ?? ""}`}
                            {...col.cellProps}
                        >
                            {col.cell(row)}
                        </Cell>
                    ))}
                </Row>
            ))}
        </>
    );
};
