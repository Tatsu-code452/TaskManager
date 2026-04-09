import { ByRoleOptions } from "@testing-library/react";
import { BaseOptions } from "./baseOptions";

export const handlers = (
    target: HTMLElement,
    base: BaseOptions
) => ({
    root: () => target,
    button: (label: string) => () => base.button(label),
    text: (label: string) => {
        if (label.includes("${text}")) {
            return (value: string) => {
                return base.text(label.replace("${text}", value));
            };
        } else if (label.startsWith("/") && label.endsWith("/")) {
            return () => base.text(new RegExp(label.slice(1, -1)));
        } else {
            return () => base.text(label);
        }
    },
    input: (label: string) => (value: string) => base.input(label.replace("${label}", value)),
    select: (label: string) => (value: string) => base.select(label.replace("${label}", value)),
    date: (label: string) => (value: string) => base.date(label.replace("${label}", value)),
    options: (label: string) => (value: string) => base.options(label.replace("${label}", value)),
    selectedOption: (label: string) => (value: string) => base.selectedOption(label.replace("${label}", value)),
    tableRow: () => (opts: ByRoleOptions) => base.tableRow(opts),
    tableRowByText: () => async (text: string) => await base.tableRowByText(new RegExp(text)),
}) as const;
