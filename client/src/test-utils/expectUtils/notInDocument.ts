import { waitFor, within } from "../typesTesting";
import { Ctx, TestsDefine } from "./types";

export const notInDocument = async (test: TestsDefine, ctx: Ctx) => {
    const { args } = ctx;
    waitFor(
        () => expect(within(args[0][test.method] as HTMLElement).queryByRole(test.key))
            .not.toBeInTheDocument()
    );
}
