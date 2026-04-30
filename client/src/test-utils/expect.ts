import { createExpects } from "./expectUtils/createExpects";
import { ExpectDefines, Result } from "./expectUtils/types";

export const createExpect = async <
    P extends Record<string, unknown>,
    Define extends Record<string, ExpectDefines>,
    R extends Record<string, unknown>,
>(
    page: P,
    defines: Define,
    helpers: R
): Promise<Result<Define, R>> => {
    const result = {} as Result<Define, R>;

    for (const key of Object.keys(defines) as (keyof Define)[]) {
        const expectDefines = defines[key];

        const extractHelpers = Object.fromEntries(
            (expectDefines.helpers ?? []).map(name => [name, helpers[name]])
        );

        // --- page expect ---
        if (expectDefines.type === "page") {
            if (expectDefines.async) {
                result[key] = (async () => {
                    const fn = page[expectDefines.target];
                    const resolved = typeof fn === "function" ? await fn() : fn;
                    return createExpects(expectDefines.tests, resolved, extractHelpers);
                }) as Result<Define, R>[typeof key];
            } else {
                const resolved = page[expectDefines.target];
                result[key] = createExpects(expectDefines.tests, resolved, extractHelpers) as Result<Define, R>[typeof key];
            }
        }

        if (expectDefines.type === "none") {
            result[key] = createExpects(expectDefines.tests) as Result<Define, R>[typeof key];
        }
    }

    return result as Result<Define, R>;
};
