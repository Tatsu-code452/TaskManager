import Button from "@components/Button/Button";
import { ColumnDef } from "@components/GridTable/types";
import styles from "./GridTableExtend.module.css";

export type DbRow = Record<string, unknown>;
export type TableDefinition = {
    columns: ColumnDef<DbRow>[];
    rowProps?: React.HTMLAttributes<HTMLDivElement>;
};

export type TableCreator = {
    add(col: ColumnDef<DbRow>): TableCreator;
    setRowProps(props: React.HTMLAttributes<HTMLDivElement>): TableCreator;
    build(): TableDefinition;
};

export const createTable = (): TableCreator => {
    const columns: ColumnDef<DbRow>[] = [];
    let rowProps: React.HTMLAttributes<HTMLDivElement> | undefined;

    return {
        add(col: ColumnDef<DbRow>) {
            columns.push(col);
            return this;
        },
        setRowProps(props: React.HTMLAttributes<HTMLDivElement>) {
            rowProps = props;
            return this;
        },
        build(): TableDefinition {
            return {
                columns,
                rowProps,
            };
        },
    };
};

export const col = <T extends Record<string, unknown>>() => ({
    text: (
        header: string,
        accessor: (d: T) => string,
        opts?: Partial<ColumnDef<T>>,
    ): ColumnDef<T> => ({
        header,
        cell: (d) => accessor(d) || "-",
        width: opts?.width ?? "auto",
        headerClass: opts?.headerClass ?? "",
    }),

    texts: (
        header: string,
        accessor: (d: T) => string[],
        opts?: Partial<ColumnDef<T>>,
    ): ColumnDef<T> => ({
        header,
        cell: (d) => (
            <div style={{ whiteSpace: "pre-wrap" }}>
                {accessor(d) ? accessor(d).join("\n") : "-"}
            </div>
        ),
        width: opts?.width ?? "auto",
        headerClass: opts?.headerClass ?? "",
    }),

    badge: (
        header: string,
        accessor: (d: T) => string,
        labelMap: Record<string, string>,
        opts?: Partial<ColumnDef<T>>,
    ): ColumnDef<T> => ({
        header,
        cell: (d) => (
            <span
                className={`${styles.badge} ${styles[`status_${accessor(d)}`]}`}
            >
                {labelMap[accessor(d)]}
            </span>
        ),
        width: opts?.width ?? "auto",
        headerClass: opts?.headerClass ?? "",
    }),

    date: (
        header: string,
        accessor: (d: T) => string | null,
        opts?: Partial<ColumnDef<T>>,
    ): ColumnDef<T> => ({
        header,
        cell: (d) => accessor(d) || "-",
        width: opts?.width ?? "auto",
        headerClass: opts?.headerClass ?? "",
    }),

    percent: (
        header: string,
        accessor: (d: T) => number | null,
        opts?: Partial<ColumnDef<T>>,
    ): ColumnDef<T> => ({
        header,
        cell: (d) => (accessor(d) ? `${accessor(d)}%` : "-"),
        width: opts?.width ?? "auto",
        headerClass: opts?.headerClass ?? "",
    }),

    tooltip: (
        header: string,
        accessor: (d: T) => string,
        opts?: Partial<ColumnDef<T>>,
    ): ColumnDef<T> => ({
        header,
        cell: (d) => (
            <span title={accessor(d)} className={styles.col_detail}>
                {accessor(d)}
            </span>
        ),
        width: opts?.width ?? "auto",
        headerClass: `${styles.col_detail} ${opts?.headerClass ?? ""}`,
    }),

    action: (
        header: string,
        onClick: (d: T) => void,
        icon: string,
        opts?: Partial<ColumnDef<T>>,
    ): ColumnDef<T> => ({
        header,
        cell: (d) => (
            <Button
                className={`${styles.actionBtn} ${opts?.cellClass || ""}`}
                icon
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(d);
                }}
            >
                {icon}
            </Button>
        ),
        width: opts?.width ?? "auto",
        headerClass: `${styles.col_actions} ${opts?.headerClass ?? ""}`,
    }),
});
