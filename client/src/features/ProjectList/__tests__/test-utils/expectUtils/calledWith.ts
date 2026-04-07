import { Mock } from "vitest";
import { Ctx, TestsDefine } from "./types";

export const calledWith = async (test: TestsDefine, ctx: Ctx) => {
    const { args } = ctx;
    expect(args[0] as Mock).toHaveBeenCalledWith(args[1]);

    console.debug(`[calledTimes] expected=[${args[1]}]`);
}
