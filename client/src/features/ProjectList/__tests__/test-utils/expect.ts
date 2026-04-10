import { createExpects } from "./expectUtils/createExpects";
import { AllExpectDefines, CreateExpectResult } from "./expectUtils/types";
import { PageDefines, PageOptionsFromMeta } from "./pageUtils/types";

export const createExpect = async <
    D extends AllExpectDefines,
    R extends Record<string, unknown>,
>(
    page: PageOptionsFromMeta<PageDefines>,
    expectDefines: D,
    helpers: Record<string, unknown>
): Promise<CreateExpectResult<D, R>> => {
    const result: Partial<CreateExpectResult<D, R>> = {};

    for (const key of Object.keys(expectDefines) as (keyof D)[]) {
        const meta = expectDefines[key];

        const extractHelpers = Object.fromEntries(
            (meta.helpers ?? []).map(name => [name, helpers[name]])
        );

        // --- page expect ---
        if (meta.type === "page") {
            if (meta.async) {
                // async page → () => Promise<ExpectFunctionSet>
                result[key] = (async () => {
                    const fn = page[meta.target];
                    const resolved = typeof fn === "function" ? await fn() : fn;
                    return createExpects(meta.tests, resolved, extractHelpers);
                }) as CreateExpectResult<D, R>[typeof key];
            } else {
                // sync page → ExpectFunctionSet
                const resolved = page[meta.target];
                result[key] = createExpects(meta.tests, resolved, extractHelpers) as CreateExpectResult<D, R>[typeof key];
            }
        }

        // --- none expect ---
        if (meta.type === "none") {
            result[key] = createExpects(meta.tests) as CreateExpectResult<D, R>[typeof key];
        }
    }

    return result as CreateExpectResult<D, R>;
};
