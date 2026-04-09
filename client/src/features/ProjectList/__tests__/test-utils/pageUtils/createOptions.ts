import { within } from "@testing-library/react";
import { baseOptions } from "./baseOptions";
import { handlers } from "./handler";
import { DefineItem } from "./types";

export const createOptions = <T extends readonly DefineItem[]>(
    target: HTMLElement,
    defines: T
) => defineOptions(target, defines);

const defineOptions = <T extends readonly DefineItem[]>(
    target: HTMLElement,
    defs: T
) => {
    const handler = handlers(target, baseOptions(within(target)));

    const result = {} as {
        [K in T[number]as K["name"]]:
        ReturnType<typeof handler[K["type"]]>;
    };

    defs.forEach(({ name, type, label }) => {
        result[name] = handler[type](label as string);
    });

    return result;
};
