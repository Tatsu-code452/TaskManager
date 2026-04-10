
// --- 定義ファイル構造関連 ---
export type AllExpectDefines = Record<string, ExpectMeta>;

export type ExpectMeta = {
    type: string,
    target?: string;
    helpers?: readonly string[];
    async?: boolean;
    tests: readonly ExpectDefine[];
};

export type ExpectDefine<R extends Record<string, unknown> = Record<string, unknown>> = {
    name: string,
    params?: readonly (keyof R)[],
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

// --- 生成関連 ---
export type Ctx = {
    context: unknown;
    helpers?: Record<string, unknown>;
    vars?: Record<string, unknown>;
    args?: unknown[];
    targetRow?: HTMLElement;
};

export type ParamsOf<
    P extends readonly (keyof R)[] | undefined,
    R extends Record<string, unknown>
> =
    P extends readonly [...infer Keys]
    ? { [K in keyof Keys]:
        Keys[K] extends keyof R ? R[Keys[K]] : never
    }
    : [];

export type ExpectFunctionSet<
    T extends readonly ExpectDefine[],
    R extends Record<string, unknown>,
> = {
        [K in T[number]["name"]]:
        Extract<T[number], { name: K }> extends infer E extends ExpectDefine
        ? (...args: ParamsOf<E["params"], R>) => Promise<void>
        : never;
    };

// --- 返却関連 ---
export type CreateExpectResult<
    D extends Record<string, ExpectMeta>,
    R extends Record<string, unknown>,
> = {
        [K in keyof D]:
        D[K]["async"] extends true
        ? () => Promise<ExpectFunctionSet<D[K]["tests"], R>>
        : ExpectFunctionSet<D[K]["tests"], R>;
    };
// export type ExpectFunctionSet = Record<string, (...args: unknown[]) => Promise<void>>;
