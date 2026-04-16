import { evalExpression } from "./evalExpression";
import { Ctx } from "./types";

export const evalValue = (expr: string | readonly string[], ctx: Ctx) => {
    const targetCtx = {
        ...ctx.vars,
        ...ctx.helpers
    };
    if (typeof expr === "string") {
        return evalExpression(expr, targetCtx);
    }

    return expr.map(v => evalExpression(v, targetCtx));
};
