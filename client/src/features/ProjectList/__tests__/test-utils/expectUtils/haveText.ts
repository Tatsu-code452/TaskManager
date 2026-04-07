import { assertElement } from "./assertElement";
import { Ctx, TestsDefine } from "./types";

export const haveText = async (test: TestsDefine, ctx: Ctx) => {
    assertElement(
        test,
        ctx,
        el => el.textContent,
        (actual, expected) => expect(actual).toContain(expected),
        "haveText"
    );
};
