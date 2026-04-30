import { fireEvent, Functions, within } from "../typesTesting";
import { getSelectByLabel } from "./getSelectByLabel";

export const getSelectedOption = (target: Functions, label: string) => {
    const select = getSelectByLabel(target, label);
    fireEvent.mouseDown(select);
    const div = select.closest("div");
    return within(div!).getByRole("option", { selected: true });
};
