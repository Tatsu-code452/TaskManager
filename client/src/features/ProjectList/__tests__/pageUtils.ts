import { BoundFunctions, ByRoleOptions, fireEvent, Matcher, queries, within } from "@testing-library/react";

export type BaseOptions = ReturnType<typeof baseOptions>;
export const baseOptions = <Q extends typeof queries>
    (target: BoundFunctions<Q>) => {
    return {
        button: (label: string) => target.getByRole("button", { name: label }),
        text: (text: Matcher) => target.getByText(text),
        input: (label: string) => getInputByLabel(target, label),
        date: (label: string) => getDateByLabel(target, label),
        select: (label: string) => getSelectByLabel(target, label),
        options: (label: string) => getOptionsByLabel(target, label),
        selectedOption: (label: string) => getSelectedOption(target, label),
        tableRow: (opts: ByRoleOptions) => target.getByRole("row", opts),
        tableRowByText: (text: string) => target.getByRole("row", { name: new RegExp(text) }),
    }
}

// export const baseExpect = {
//     exists: (el: HTMLElement) => expect(el).toBeInTheDocument(),
//     disabled: (el: HTMLElement) => expect(el).toBeDisabled(),
//     text: (el: HTMLElement, text: string) =>
//         expect(within(el).getByText(text)).toBeInTheDocument(),
//     regex: (el: HTMLElement, regex: RegExp) =>
//         expect(within(el).getByText(regex)).toBeInTheDocument(),
// };

export const getInputByLabel = <Q extends typeof queries>
    (target: BoundFunctions<Q>, label: string) => {
    const container = target.getByText(label).closest("div");
    return within(container!).getByRole("textbox");
};

export const getSelectByLabel = <Q extends typeof queries>
    (target: BoundFunctions<Q>, label: string) => {
    const div = target.getByText(label).closest("div");
    return within(div!).getByRole("combobox");
};

export const getOptionsByLabel = <Q extends typeof queries>
    (target: BoundFunctions<Q>, label: string) => {
    const select = getSelectByLabel(target, label);
    fireEvent.mouseDown(select);
    const div = select.closest("div");
    return within(div!).getAllByRole("option");
};

export const getSelectedOption = <Q extends typeof queries>
    (target: BoundFunctions<Q>, label: string) => {
    const select = getSelectByLabel(target, label);
    fireEvent.mouseDown(select);
    const div = select.closest("div");
    return within(div!).getByRole("option", { selected: true });
};

export const getDateByLabel = <Q extends typeof queries>
    (target: BoundFunctions<Q>, label: string) => {
    const div = target.getByText(label).closest("div");
    return div!.querySelector('input[type="date"]') as HTMLInputElement;
};

type DefineItem =
    | { name: string; type: "button"; label: string }
    | { name: string; type: "text"; label: `${string}\${text}${string}` | `/${string}/` | string }
    | { name: string; type: "input" | "select" | "date" | "options" | "selectedOption"; label: `${string}\${label}${string}` }
    | { name: string; type: "tableRow"; label: string }
    | { name: string; type: "tableRowByText"; label: `${string}\${text}${string}` };

export const defineOptions = <T extends readonly DefineItem[]>(
    base: ReturnType<typeof baseOptions>,
    defs: T
) => {
    const result = {} as {
        [K in T[number]as K["name"]]:
        K["type"] extends "button" ? () => HTMLElement :
        K["type"] extends "text"
        ? (K["label"] extends `${string}\${text}${string}` ? (value: string) => HTMLElement : () => HTMLElement) :
        K["type"] extends "input" | "select" | "date" | "selectedOption"
        ? (label: string) => HTMLElement :
        K["type"] extends "options"
        ? (label: string) => HTMLElement[] :
        K["type"] extends "tableRow" ? (opts: ByRoleOptions) => HTMLElement :
        K["type"] extends "tableRowByText" ? (text: string) => HTMLElement :
        never;
    };
    defs.forEach(({ name, type, label }) => {
        if (type === "button") {
            result[name] = () => base[type](label);
            return;
        }

        if (type === "text") {
            if (label.includes("${text}")) {
                result[name] = (value: string) => {
                    const evaluated = label.replace("${text}", value);
                    return base[type](evaluated);
                };
            } else if (label.startsWith("/") && label.endsWith("/")) {
                const regex = new RegExp(label.slice(1, -1));
                result[name] = () => base[type](regex);
            } else {
                result[name] = () => base[type](label);
            }
            return;
        }

        if (["input", "select", "date", "options", "selectedOption"].includes(type)) {
            result[name] = (value: string) => {
                const evaluated = label.replace("${label}", value);
                return base[type](evaluated);
            };
            return;
        }

        if (type === "tableRow") {
            result[name] = (opts: ByRoleOptions) => base[type](opts);
            return;
        }

        if (type === "tableRowByText") {
            result[name] = (text: string) => base[type](text);
            return;
        }
    });

    return result;
};
