import { Mock } from "../typesTesting";
import { Ctx, TestsDefine } from "./types";

export const calledTimes = async (test: TestsDefine, ctx: Ctx) => {
    const { args } = ctx;
    expect(args[0] as Mock).toHaveBeenCalledTimes(args[1] as number);

    console.debug(`[calledTimes] expected=[${args[1]}]`);
}
