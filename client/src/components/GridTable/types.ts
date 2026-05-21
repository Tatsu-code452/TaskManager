import { ReactNode } from "react";


export type ColumnDef<T> = {
    header: string;
    headerClass?: string;
    headerStyles?: React.CSSProperties;
    cell: (row: T) => ReactNode;
    cellProps?: React.HTMLAttributes<HTMLDivElement>;
    cellClass?: string;
    cellStyles?: React.CSSProperties;
    width?: string;
};
