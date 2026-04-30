import { Functions, within } from "../typesTesting";

export const getSelectByLabel = (target: Functions, label: string) => {
    const div = target.getByText(label).closest("div");
    return within(div!).getByRole("combobox");
};

