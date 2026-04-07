import { within } from "@testing-library/react";
import { Functions } from "./types";

export const getInputByLabel = (target: Functions, label: string) => {
    const container = target.getByText(label).closest("div");
    return within(container!).getByRole("textbox");
};

