import { handlers } from "./handler";
import { Ctx, ExpectDefine, ExpectResult, TestsDefine } from "./types";

export const createExpects = <
    T extends readonly ExpectDefine[],
    H extends Record<string, unknown> = Record<string, unknown>
>(
    defs: T,
    context?: unknown,
    helpers?: H
): ExpectResult<T> => {
    const result: Record<string, (...args: unknown[]) => Promise<void>> = {};

    for (const def of defs) {
        if (!def.tests) return;

        result[def.name] = async (...args) => {
            const vars = Object.fromEntries(
                (def.params ?? []).map((name, i) => [name, args[i]])
            );

            const ctx: Ctx = { context, helpers, args, vars };

            for (const test of def.tests) {
                await testReducer(test, ctx);
            }
        };
    }
    return result as ExpectResult<T>;
};

const testReducer = async (test: TestsDefine, ctx: Ctx) => {
    const handler = handlers[test.type];
    return !handler ? true : handler(test, ctx);
}
