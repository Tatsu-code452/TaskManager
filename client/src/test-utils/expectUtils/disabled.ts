import { Ctx, TestsDefine } from "./types";

export const disabled = async (test: TestsDefine, ctx: Ctx) => {
    const { context: target } = ctx;
    expect(target[test.method]() as HTMLElement).toBeDisabled();
}
