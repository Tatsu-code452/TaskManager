import { Ctx, TestsDefine } from "./types";

export const equalOptions = async (test: TestsDefine, ctx: Ctx) => {
    const { context: target } = ctx;

    const options = target[test.method](test.key) as HTMLElement[];
    const expected = test.expected as string[];

    const labels = options.map(o => o.textContent ?? "");

    console.debug(`[equalOptions] key=[${test.key}] expected=[${expected}] actual=[${labels}]`);

    expect(labels).toEqual(expected);
};
