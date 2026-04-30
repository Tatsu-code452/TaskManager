import { Functions, fireEvent, within } from "../typesTesting";
import { getSelectByLabel } from "./getSelectByLabel";

export const getOptionsByLabel = (target: Functions, label: string) => {
    const select = getSelectByLabel(target, label);
    fireEvent.mouseDown(select);
    const div = select.closest("div");
    return within(div!).getAllByRole("option");
};
