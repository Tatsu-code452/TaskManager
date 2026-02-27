import { isBlank } from "./isBlank";

export const toString = (
    v: string | number | boolean | null | undefined
): string => {
    if (isBlank(v)) return "";

    if (typeof v === "string") return v;

    if (typeof v === "number" || typeof v === "boolean") {
        return String(v);
    }

    throw new Error(`toString: invalid type: ${typeof v}`);
};