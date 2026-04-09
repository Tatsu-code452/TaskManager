import { createExpects } from "./expectUtils/createExpects";
import { ExpectFromMeta, ExpectMeta } from "./expectUtils/types";
import { PageOptionsFromMeta, UiMeta } from "./pageUtils/types";

export const createExpect = async<
    A extends Record<string, UiMeta>,
    D extends Record<string, ExpectMeta>,
>(
    page: PageOptionsFromMeta<A>,
    expectDefines: D,
    helpers: Record<string, unknown>
): Promise<ExpectFromMeta<D>> => {
    const result = {} as ExpectFromMeta<D>;

    for (const key of Object.keys(expectDefines) as (keyof D)[]) {
        const meta = expectDefines[key];

        const extractHelpers = Object.fromEntries(
            (meta.helpers ?? []).map(name => [name, helpers[name]])
        );

        if (meta.type === "page") {
            if (meta.async) {
                result[key] = (async () => {
                    const fn = page[meta.target] as unknown as () => Promise<HTMLElement>;
                    const resolved = await fn();
                    return createExpects(meta.tests, resolved, extractHelpers);
                }) as ExpectFromMeta<D>[typeof key];
            } else {
                const value = createExpects(meta.tests, page[meta.target], extractHelpers);
                result[key] = value as ExpectFromMeta<D>[typeof key];
            }
        }

        if (meta.type === "none") {
            const value = createExpects(meta.tests);
            result[key] = value as ExpectFromMeta<D>[typeof key];
            continue;
        }
    }

    return result;
};
