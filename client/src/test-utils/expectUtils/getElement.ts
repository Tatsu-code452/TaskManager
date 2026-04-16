import { Ctx, TestsDefine } from "./types";

export const getElement = (test: TestsDefine, ctx: Ctx) => {
    console.debug(`[getElement] target=[${ctx.context}] key=[${test.key}]  method=[${test.method}]`)
    const fn = ctx.context[test.method];

    if (typeof fn !== "function") return fn;

    // 引数が必要なら key を渡す
    if (test.key !== undefined && test.key !== "" && fn.length >= 1) {
        return fn(test.key);
    }

    // 引数なし
    return fn();
};
