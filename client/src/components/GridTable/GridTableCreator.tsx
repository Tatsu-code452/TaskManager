import { GridTable } from "@components/GridTable/GridTable";
import { RowCreator } from "@components/GridTable/Row/RowCreator";
import { ColumnDef } from "@components/GridTable/types";

export type Props<T> = React.HTMLAttributes<HTMLDivElement> & {
    columnDefs: readonly ColumnDef<T>[];
    rows: T[];
    rowProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const GridTableCreator = <T extends object>({
    columnDefs,
    rows,
    rowProps,
    ...rest
}: Props<T>) => {
    return (
        <GridTable
            columns={columnDefs.map((c) => c.width ?? "auto").join(" ")}
            {...rest}
        >
            {RowCreator<T>({ columnDefs, rows }, rowProps)}
        </GridTable>
    );
};
