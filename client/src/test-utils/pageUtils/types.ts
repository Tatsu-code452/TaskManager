import { LabelMap } from "./baseOptions";
import { handlers } from "./handler";

export type PageDefines = {
    type: string,
    target: string;
    elements?: ElementDefines;
    value?: unknown; // type(target, value)
    async?: boolean; // return async () => unknown
};

export type ElementDefines = readonly ElementDefine[];
export type ElementDefine =
    {
        [K in keyof LabelMap]: {
            name: string;
            type: K;
            label: LabelMap[K];
        }
    }[keyof LabelMap];

export type Return<
    Define extends Record<string, PageDefines>
> = {
        [K in keyof Define]: ReturnCreatePageOption<Define[K]>
    };

export type ReturnCreatePageOption<
    P extends PageDefines
> = P extends { async: true }
    ? (() => Promise<Option<P>>)
    : Option<P>

export type ReturnCreateOptions<
    E extends ElementDefines,
    H extends ReturnType<typeof handlers>
> = {
        [A in E[number]as A["name"]]: ReturnType<H[A["type"]]>;
    };

export type Option<
    P extends PageDefines,
> =
    P extends { elements: ElementDefines }
    ? ReturnCreateOptions<P["elements"], ReturnType<typeof handlers>>
    : HTMLElement;
