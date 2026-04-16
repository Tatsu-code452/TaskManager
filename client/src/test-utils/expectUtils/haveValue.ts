import { assertElement } from "./assertElement";
import { Ctx, TestsDefine } from "./types";

export const haveValue = async (test: TestsDefine, ctx: Ctx) => {
    assertElement(
        test,
        ctx,
        el => (el as HTMLInputElement).value,
        (actual, expected) => expect(actual).toBe(expected),
        "haveValue"
    );
};
