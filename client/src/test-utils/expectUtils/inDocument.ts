import { within } from "../typesTesting";
import { evalValue } from "./evalValue";
import { getElement } from "./getElement";
import { Ctx, TestsDefine } from "./types";

export const inDocument = async (test: TestsDefine, ctx: Ctx) => {
    const element = getElement(test, ctx);

    let evalKey = test.key;
    if (test.key !== undefined && test.key !== "") {
        evalKey = evalValue(test.key, ctx);
    }

    const targetElement = await within(element as HTMLElement).findByText(evalKey);

    console.debug(`elele` + (element as HTMLElement).textContent);

    console.debug(
        `[inDocument] method=[${test.method}] key=[${evalKey}] found=[${!!targetElement}]`
    );

    expect(targetElement).toBeInTheDocument();
};

