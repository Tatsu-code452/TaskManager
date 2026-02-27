import { isBlank } from "./isBlank";

export const toDateInputValue = (
    v?: string | null
): string => {
    if (isBlank(v)) return "";
    return v.slice(0, 10);
};

export const formatDate = (
    v?: string | null
): string => {
    if (isBlank(v)) return "";
    return v.slice(0, 10).replaceAll("-", "/");
};

export const toDateSendValue = (
    v?: string | null
): string | null => {
    if (isBlank(v)) return null;
    return `${v}T00:00:00Z`;
};