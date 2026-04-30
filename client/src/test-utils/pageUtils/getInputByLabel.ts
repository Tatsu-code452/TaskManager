import { Functions, within } from "../typesTesting";

export const getInputByLabel = (target: Functions, label: string) => {
    const container = target.getByText(label).closest("div");
    return within(container!).getByRole("textbox");
};

