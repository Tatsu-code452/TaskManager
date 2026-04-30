import { ColumnDef } from "../types";

export const flattenColumns = (cols: ColumnDef[]): ColumnDef[] => {
    const result: ColumnDef[] = [];

    const walk = (c: ColumnDef) => {
        if (c.children && c.children.length > 0) {
            c.children.forEach(walk);
        } else {
            result.push(c);
        }
    };

    cols.forEach(walk);
    return result;
};
