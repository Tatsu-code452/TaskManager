import { handlers } from "./handler";
import { Ctx, ExpectDefine, ExpectFunctionSet, ParamsOf, TestsDefine } from "./types";

// export const createExpects = <
//     E extends {
//         name: string,
//         params?: readonly string[],
//         tests?: readonly TestsDefine[];
//     },
//     D extends readonly E[],
// >(
//     defs: D,
//     context?: unknown,
//     helpers?: Record<string, unknown>
// ) => {
export const createExpects = <
    E extends ExpectDefine,
    T extends readonly E[],
    R extends Record<string, unknown>,
    H extends Record<string, unknown> = Record<string, unknown>
>(
    defs: T,
    context?: unknown,
    helpers?: H
): ExpectFunctionSet<T, R> => {
    const result = {} as ExpectFunctionSet<T, R>;

    for (const def of defs) {
        const fn: (...args: ParamsOf<typeof def.params, R>) => Promise<void> =
            async (...args) => {

                const rawArgs = args;

                const isObjectCall =
                    (def.params?.length ?? 0) > 0 &&
                    rawArgs.length === 1 &&
                    typeof rawArgs[0] === "object" &&
                    !Array.isArray(rawArgs[0]) &&
                    (def.params ?? []).every(name => name in (rawArgs[0] as Record<string, unknown>));

                const tupleArgs = isObjectCall
                    ? (def.params ?? []).map(name => (rawArgs[0] as unknown)[name])
                    : rawArgs;

                const vars = Object.fromEntries(
                    (def.params ?? []).map((name, i) => [name, tupleArgs[i]])
                );

                const ctx: Ctx = { context, helpers, args: rawArgs, vars };

                for (const test of def.tests ?? []) {
                    await testReducer(test, ctx);
                }
            };
        result[def.name] = fn as ExpectFunctionSet<T, R>[typeof def.name];
    }
    return result;
};

const testReducer = async (test: TestsDefine, ctx: Ctx) => {
    const handler = handlers[test.type];
    return !handler ? {} : handler(test, ctx);
}
