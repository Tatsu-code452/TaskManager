import { GridTable } from "@components/GridTable/GridTable";
import { TableDefinition } from "@components/GridTable/GridTableDefCreatorExtend";
import { RowCreator } from "@components/GridTable/Row/RowCreator";

type DbRow = Record<string, unknown>;
export type Props = {
    tableDefinition: TableDefinition;
    rows: DbRow[];
};

export const GridTableCreator = ({ tableDefinition, rows, ...rest }: Props) => {
    return (
        <GridTable
            columns={tableDefinition.columns
                .map((c) => c.width ?? "auto")
                .join(" ")}
            {...rest}
        >
            {RowCreator(
                { columnDefs: tableDefinition.columns, rows },
                tableDefinition.rowProps,
            )}
        </GridTable>
    );
};
