import { ByRoleOptions, Matcher } from "@testing-library/react";
import { getDateByLabel } from "./getDateByLabel";
import { getInputByLabel } from "./getInputByLabel";
import { getOptionsByLabel } from "./getOptionsByLabel";
import { getSelectByLabel } from "./getSelectByLabel";
import { getSelectedOption } from "./getSelectedOption";
import { Functions } from "./types";

export type BaseOptions = ReturnType<typeof baseOptions>;
export const baseOptions = (target: Functions) => {
    return {
        button: (label: string) => target.getByRole("button", { name: label }),
        text: (text: Matcher) => target.getByText(text),
        input: (label: string) => getInputByLabel(target, label),
        date: (label: string) => getDateByLabel(target, label),
        select: (label: string) => getSelectByLabel(target, label),
        options: (label: string) => getOptionsByLabel(target, label),
        selectedOption: (label: string) => getSelectedOption(target, label),
        tableRow: (opts: ByRoleOptions) => target.getByRole("row", opts),
        tableRowByText: async (text: string) => await target.findByRole("row", { name: new RegExp(text) }),
    }
}
