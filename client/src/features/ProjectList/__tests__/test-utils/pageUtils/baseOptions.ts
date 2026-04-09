import { getDateByLabel } from "./getDateByLabel";
import { getInputByLabel } from "./getInputByLabel";
import { getOptionsByLabel } from "./getOptionsByLabel";
import { getSelectByLabel } from "./getSelectByLabel";
import { getSelectedOption } from "./getSelectedOption";
import { Functions, HandlerArgMap, HandlerReturnMap } from "./types";

export type BaseOptions = {
    [K in keyof HandlerArgMap]: (arg: HandlerArgMap[K]) => HandlerReturnMap[K];
};

export const baseOptions = (target: Functions): BaseOptions => {
    return {
        button: (label) => target.getByRole("button", { name: label }),
        text: (text) => target.getByText(text),
        input: (label) => getInputByLabel(target, label),
        date: (label) => getDateByLabel(target, label),
        select: (label) => getSelectByLabel(target, label),
        options: (label) => Array.from(getOptionsByLabel(target, label)),
        selectedOption: (label) => getSelectedOption(target, label),
        tableRow: (opts) => target.getByRole("row", opts),
        tableRowByText: (matcer) => target.findByRole("row", { name: matcer }),
    }
}
