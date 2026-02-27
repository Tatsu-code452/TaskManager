import { isBlank } from "./isBlank";

export const toNumber = (
    v: string | number | null | undefined
): number | null => {
    if (isBlank(v)) return null;

    if (typeof v === "number") return v;

    if (typeof v === "string") {
        const n = Number(v);
        return Number.isNaN(n) ? null : n;
    }

    throw new Error(`toNumber: invalid type: ${typeof v}`);
};