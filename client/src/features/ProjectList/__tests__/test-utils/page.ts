import { ByRoleOptions, Screen, waitFor } from "@testing-library/react";
import { createOptions } from "./pageUtils/createOptions";
import { GeneratedPageOption, PageDefines, PageOptionsFromMeta, UiMeta } from "./pageUtils/types";

export const pageOptions = async <
    D extends PageDefines
>(
    screen: Screen,
    pageDefines: D
): Promise<PageOptionsFromMeta<D>> => {
    await waitFor(() => {
        expect(screen.getByTestId("container")).toBeInTheDocument();
    });

    const result: Partial<PageOptionsFromMeta<D>> = {};

    for (const key of Object.keys(pageDefines) as (keyof D)[]) {
        result[key] = await assignForKey(screen, pageDefines[key]) as PageOptionsFromMeta<D>[typeof key];
    }

    return result as PageOptionsFromMeta<D>;
};

const assignForKey = async <
    M extends UiMeta
>(
    screen: Screen,
    meta: M
): Promise<GeneratedPageOption<M>> => {

    const noElements =
        meta.elements === undefined ||
        (Array.isArray(meta.elements) && meta.elements.length === 0);

    if (noElements) {
        // --- 単一 HTMLElement ---
        if (meta.async === true) {
            return (async () => {
                const el = await resolveElement(screen, meta);
                return el as HTMLElement;
            }) as GeneratedPageOption<M>;
        } else {
            const el = await resolveElement(screen, meta);
            return el as GeneratedPageOption<M>;
        }
    }

    // --- Options ---
    if (meta.async === true) {
        return (async () => {
            const el = await resolveElement(screen, meta);
            return createOptions(el, meta.elements!);
        }) as GeneratedPageOption<M>;
    } else {
        const el = await resolveElement(screen, meta);
        return createOptions(el, meta.elements!) as GeneratedPageOption<M>;
    }
};

const resolveElement = async (screen: Screen, meta: UiMeta): Promise<HTMLElement> => {
    if (meta.type === "testId") {
        return await screen.findByTestId(meta.target);
    }

    if (meta.type === "role") {
        return meta.value
            ? await screen.findByRole(meta.target, meta.value as ByRoleOptions)
            : await screen.findByRole(meta.target);
    }

    throw new Error(`Unknown meta type: ${meta.type}`);
};
