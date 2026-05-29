import { GridTable } from "@components/GridTable/GridTable";
import { RowCreator } from "@components/GridTable/Row/RowCreator";
import { ColumnDef } from "@components/GridTable/types";

type DbRow = Record<string, unknown>;
export type Props = React.HTMLAttributes<HTMLDivElement> & {
    columnDefs: readonly ColumnDef<DbRow>[];
    rowProps?: React.HTMLAttributes<HTMLDivElement>;
    rows: DbRow[];
};

export const GridTableCreator = ({
    columnDefs,
    rows,
    rowProps,
    ...rest
}: Props) => {
    return (
        <GridTable
            columns={columnDefs.map((c) => c.width ?? "auto").join(" ")}
            {...rest}
        >
            {RowCreator({ columnDefs, rows }, rowProps)}
        </GridTable>
    );
};
