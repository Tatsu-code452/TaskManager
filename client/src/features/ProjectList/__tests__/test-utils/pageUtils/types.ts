import { BoundFunctions, ByRoleOptions, Matcher, queries } from "@testing-library/react";
import { createOptions } from "./createOptions";

// --- 定義ファイル構造関連 ---
export type PageDefines = Record<string, UiMeta>;

export type UiMeta = {
    type: string,
    target: string;
    elements: DefineItems;
    value?: unknown; // type(target, value)
    async?: boolean; // return async () => unknown
};

export type DefineItems = readonly [] | readonly DefineItem[];
export type DefineItem =
    {
        [K in keyof LabelMap]: {
            name: string;
            type: K;
            label: LabelMap[K];
        }
    }[keyof LabelMap];

type LabelMap = {
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

// --- 生成関連 ---
export type Options = ReturnType<typeof createOptions<DefineItem[]>>;

export type PageOptionsFromMeta<D extends Record<string, UiMeta>> = {
    [K in keyof D]:
    D[K]["elements"] extends readonly []
    ? (D[K] extends { async: true } ? () => Promise<HTMLElement> : HTMLElement)
    : (D[K] extends { async: true } ? () => Promise<Options> : Options);
};

// --- Options生成関連
export type Queries = typeof queries;
export type Functions = BoundFunctions<Queries>;

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
