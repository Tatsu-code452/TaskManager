import { within } from "@testing-library/react";
import { Functions } from "./types";

export const getSelectByLabel = (target: Functions, label: string) => {
    const div = target.getByText(label).closest("div");
    return within(div!).getByRole("combobox");
};

