import { ByRoleOptions, Functions, Matcher } from "../typesTesting";
import { getDateByLabel } from "./getDateByLabel";
import { getInputByLabel } from "./getInputByLabel";
import { getOptionsByLabel } from "./getOptionsByLabel";
import { getSelectByLabel } from "./getSelectByLabel";
import { getSelectedOption } from "./getSelectedOption";

export type HandlerArgMap = {
    button: string;
    text: Matcher;
    input: string;
    select: string;
    date: string;
    options: string;
    selectedOption: string;
    tableRow: ByRoleOptions;
    tableRowByText: RegExp;
};

export type HandlerReturnMap = {
    button: HTMLElement;
    text: HTMLElement;
    input: HTMLElement;
    select: HTMLElement;
    date: HTMLElement;
    options: HTMLElement[];
    selectedOption: HTMLElement;
    tableRow: HTMLElement;
    tableRowByText: Promise<HTMLElement>;
};

export type LabelMap = {
    button: string;
    text: `${string}\${text}${string}` | `/${string}/` | string;
    input: `${string}\${label}${string}`;
    select: `${string}\${label}${string}`;
    date: `${string}\${label}${string}`;
    options: `${string}\${label}${string}`;
    selectedOption: `${string}\${label}${string}`;
    tableRow: string;
    tableRowByText: `${string}\${text}${string}`;
};

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
