export const evalExpression = (expr: string, ctx: Record<string, unknown>) => {
    const keys = Object.keys(ctx);
    const values = Object.values(ctx);

    if (expr.includes("${")) {
        const wrapped = `\`${expr}\``;
        return Function(...keys, `return ${wrapped};`)(...values);
    }
    try {
        return expr === "" ? ""
            : Function(...keys, `return ${expr};`)(...values);

    } catch (error) {
        console.debug("catch:" + error);
        console.debug("return:" + expr);
        return expr;
    }
};
