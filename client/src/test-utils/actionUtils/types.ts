export type ActionDefine<P extends readonly string[] = readonly string[]> = {
    type: string;
    name: string;
    async?: boolean;
    method?: string;
    params?: P;
};

export type ActionDefines<A extends ActionDefine> = {
    target?: string;
    async?: boolean;
    actions: readonly A[];
}

type DotPathValue<
    Obj,
    Path extends string
> =
    Path extends `${infer Key}.${infer Rest}`
    ? Key extends keyof Obj
    ? DotPathValue<Obj[Key], Rest>
    : unknown
    : Path extends keyof Obj
    ? Obj[Path]
    : unknown;

export type ParamsToArgs<
    P extends readonly string[] | undefined,
    R extends Record<string, unknown>
> =
    P extends readonly string[]
    ? { [I in keyof P]: DotPathValue<R, P[I]> }
    : [];

type ReturnActionAsyncFn<
    A extends ActionDefine,
    R extends Record<string, unknown>
> =
    A["params"] extends readonly string[]
    ? (...args: ParamsToArgs<A["params"], R>) => Promise<void>
    : () => Promise<void>

type ReturnActionFn<
    A extends ActionDefine,
    R extends Record<string, unknown>
> =
    A["params"] extends readonly string[]
    ? (...args: ParamsToArgs<A["params"], R>) => void
    : () => void

export type RetunAction<
    A extends ActionDefine,
    R extends Record<string, unknown>
> =
    A extends { async: true }
    ? ReturnActionAsyncFn<A, R>
    : ReturnActionFn<A, R>;


export type ReturnActions<
    ADS extends ActionDefines<ActionDefine>,
    R extends Record<string, unknown>
> = {
        [A in ADS["actions"][number]as A["name"]]: RetunAction<A, R>;
    };

export type Return<
    Define extends Record<string, ActionDefines<ActionDefine>>,
    R extends Record<string, unknown>
> = {
        [K in keyof Define]:
        Define[K] extends { async: true }
        ? () => Promise<ReturnActions<Define[K], R>>
        : () => ReturnActions<Define[K], R>;
    };
