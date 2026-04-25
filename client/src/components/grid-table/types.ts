export type ColumnDef = {
    id: string;
    width?: number;
    header?: string | React.ReactNode;
    children?: ColumnDef[];

    headerCellStyle?: Style;
    bodyCellStyle?: Style | ((pos: CellPos) => Style);
};

export type Style = {
    className?: string;
    style?: React.CSSProperties;
}

export type CellPos = {
    row: number; // 0-based
    col: number; // 0-based
};

export type CellRenderer = (pos: CellPos) => React.ReactNode;
export type HeaderRenderer = (col: number) => React.ReactNode;

export type GridTableProps = {
    columns: ColumnDef[];
    rowCount: number;
    cellRenderer: CellRenderer;
    onKeyDown?: (pos: CellPos, e: React.KeyboardEvent) => void;
    onPointerDown?: (pos: CellPos, e: React.PointerEvent) => void;

    tableStyle?: Style;
    headerRowStyle?: Style;
    bodyRowStyle?: Style | ((row: number) => Style);
};