import { Functions } from "./types";

export const getDateByLabel = (target: Functions, label: string) => {
    const div = target.getByText(label).closest("div");
    return div!.querySelector('input[type="date"]') as HTMLInputElement;
};
