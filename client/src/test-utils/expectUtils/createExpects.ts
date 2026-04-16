import { handlers } from "./handler";
import { Ctx, ExpectDefine, ParamsOf, ReturnExpectFunctions, TestsDefine } from "./types";

export const createExpects = <
    E extends ExpectDefine,
    T extends readonly E[],
    R extends Record<string, unknown>,
    H extends Record<string, unknown> = Record<string, unknown>
>(
    defs: T,
    context?: unknown,
    helpers?: H
): ReturnExpectFunctions<T, R> => {
    const result = {} as ReturnExpectFunctions<T, R>;

    for (const def of defs) {
        const fn: (...args: ParamsOf<typeof def.params, R>) => Promise<void> =
            async (...args) => {
                for (const test of def.tests ?? []) {
                    await testReducer(test, createCtx(def, args, context, helpers));
                }
            };
        result[def.name] = fn as ReturnExpectFunctions<T, R>[typeof def.name];
    }
    return result;
};

const isObjectCall = (def: ExpectDefine, rawArgs: unknown[]) => {
    return (def.params?.length ?? 0) > 0 &&
        rawArgs.length === 1 &&
        typeof rawArgs[0] === "object" &&
        !Array.isArray(rawArgs[0]) &&
        (def.params ?? []).every(name => name in (rawArgs[0] as Record<string, unknown>));
}

const createCtx = (
    def: ExpectDefine,
    args: unknown[],
    context?: unknown,
    helpers?: Record<string, unknown>
) => {
    const rawArgs = args;

    const tupleArgs = isObjectCall(def, rawArgs)
        ? (def.params ?? []).map(name => (rawArgs[0] as unknown)[name])
        : rawArgs;

    const vars = Object.fromEntries(
        (def.params ?? []).map((name, i) => [name, tupleArgs[i]])
    );

    const ctx: Ctx = { context, helpers, args: rawArgs, vars };

    return ctx;
}

const testReducer = async (test: TestsDefine, ctx: Ctx) => {
    const handler = handlers[test.type];
    return !handler ? {} : handler(test, ctx);
}
