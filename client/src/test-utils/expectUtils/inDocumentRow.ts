import { within } from "../typesTesting";
import { evalValue } from "./evalValue";
import { Ctx, TestsDefine } from "./types";

export const inDocumentRow = async (test: TestsDefine, ctx: Ctx) => {
    const key = evalValue(test.key, ctx);
    const value = evalValue(test.expected, ctx);
    const element = await ctx.context[test.method](key);
    console.debug(
        `[inDocumentRow] method=[${test.method}] key=[${key}] expected=[${value}] found=[${!!element}]`
    );

    expect(within(element).getByText(value)).toBeInTheDocument();
};

