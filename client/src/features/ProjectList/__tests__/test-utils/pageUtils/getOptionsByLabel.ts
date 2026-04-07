import { fireEvent, within } from "@testing-library/react";
import { getSelectByLabel } from "./getSelectByLabel";
import { Functions } from "./types";

export const getOptionsByLabel = (target: Functions, label: string) => {
    const select = getSelectByLabel(target, label);
    fireEvent.mouseDown(select);
    const div = select.closest("div");
    return within(div!).getAllByRole("option");
};
