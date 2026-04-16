import { baseOptions } from "./pageUtils/baseOptions";
import { handlers } from "./pageUtils/handler";
import { ElementDefines, Option, PageDefines, Return, ReturnCreateOptions } from "./pageUtils/types";
import { ByRoleOptions, Screen, waitFor, within } from "./typesTesting";

export const createPageOptions = async <
    Define extends Record<string, PageDefines>
>(
    screen: Screen,
    defines: Define
): Promise<Return<Define>> => {
    await waitFor(() => {
        expect(screen.getByTestId("container")).toBeInTheDocument();
    });

    const result = {} as Return<Define>;

    for (const key of Object.keys(defines) as (keyof Define)[]) {
        const pageDefine = defines[key];
        console.debug("start");
        if (pageDefine.async) {
            result[key] = (async () => {
                return await createPageOption<typeof pageDefine>(screen, pageDefine);
            }) as Return<Define>[keyof Define];
        } else {
            result[key] =
                await createPageOption<typeof pageDefine>(screen, pageDefine) as Return<Define>[keyof Define];
        }
        console.debug("end");
    }

    Object.entries(result).forEach(([key, value]) =>
        console.debug(`[page][defines]: ${key} => ${value}`)
    );

    return result;
};

const createPageOption = async <
    P extends PageDefines,
>(
    screen: Screen,
    pageDefines: P
): Promise<Option<P>> => {
    return createOption<P>(screen, pageDefines);
};

const createOption = async<
    P extends PageDefines,
>(
    screen: Screen,
    pageDefines: P
): Promise<Option<P>> => {
    const target = await getPageTarget<P>(screen, pageDefines);

    if (pageDefines.elements) {
        const handler = handlers(target, baseOptions(within(target)));
        return await createOptionsFromHandler<
            typeof pageDefines.elements, typeof handler
        >(pageDefines.elements, handler) as Option<P>;
    } else {
        console.debug(`[page]: ${pageDefines.target} => ${target}`);
        return target as Option<P>;
    }
}

const getPageTarget = async <
    P extends PageDefines
>(
    screen: Screen,
    pageDefines: P
): Promise<HTMLElement> => {
    if (pageDefines.type === "testId") {
        return await screen.findByTestId(pageDefines.target);
    } else if (pageDefines.type === "role") {
        return pageDefines.value
            ? await screen.findByRole(pageDefines.target, pageDefines.value as ByRoleOptions)
            : await screen.findByRole(pageDefines.target);
    }
}

const createOptionsFromHandler = async <
    E extends ElementDefines,
    H extends ReturnType<typeof handlers>
>(
    elementDefines: E,
    handler: H
): Promise<ReturnCreateOptions<E, H>> => {

    const result = {} as ReturnCreateOptions<E, typeof handler>;

    for (const element of elementDefines) {
        result[element.name] = handler[element.type](element.label as string);
    }

    Object.entries(result).forEach(([key, value]) =>
        console.debug(`[page][methods]: ${key} => ${value}`)
    );

    return result;
};