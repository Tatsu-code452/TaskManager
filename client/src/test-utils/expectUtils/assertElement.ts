import { evalValue } from "./evalValue";
import { getElement } from "./getElement";
import { Ctx, TestsDefine } from "./types";

export const assertElement = (
    test: TestsDefine,
    ctx: Ctx,
    getActual: (el: HTMLElement) => unknown,
    matcher: (actual: unknown, expected: unknown) => void,
    label: string
) => {
    const element = getElement(test, ctx);
    const expected = evalValue(test.expected, ctx);
    const actual = getActual(element);

    console.debug(`[${label}] key=[${test.key}] expected=[${expected}] actual=[${actual}]`);

    matcher(actual, expected);
};
