export type ExpectFromMeta<D extends Record<string, ExpectMeta>> = {
    [K in keyof D]:
    D[K] extends { async: true }
    ? () => Promise<ExpectResult<D[K]["tests"]>>
    : ExpectResult<D[K]["tests"]>;
};

export type ExpectMeta = {
    type: string,
    target: string;
    helpers: readonly string[];
    value?: unknown;
    async?: boolean;
    tests: readonly ExpectDefine[];
};

export type ExpectDefine = {
    name: string,
    params?: readonly string[],
    tests?: readonly TestsDefine[];
};


export type TestsDefine = {
    type: string;
    method?: string,
    target?: string;
    key?: string;
    expected?: readonly string[] | string,
    params?: readonly string[],
}

export type Ctx = {
    context: unknown;
    helpers?: Record<string, unknown>;
    vars?: Record<string, unknown>;
    args?: unknown[];
    targetRow?: HTMLElement;
};

export type UnionToIntersection<U> =
    (U extends unknown ? (k: U) => void : never) extends
    (k: infer I) => void ? I : never;

export type ExpectResult<T extends readonly ExpectDefine[]> =
    UnionToIntersection<
        T[number] extends infer U
        ? U extends { name: infer N extends string }
        ? { [K in N]: (...args: unknown[]) => Promise<void> }

        : never
        : never
    >;
