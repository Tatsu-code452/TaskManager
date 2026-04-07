export type TestsDefine = {
    type: string;
    method?: string,
    target?: string;
    key?: string;
    expected?: readonly string[] | string,
    params?: readonly string[],
}

export type ExpectDefine = {
    name: string,
    key?: string,
    params?: readonly string[],
    tests?: readonly TestsDefine[];
};

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
