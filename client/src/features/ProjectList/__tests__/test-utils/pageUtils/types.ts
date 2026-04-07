import { BoundFunctions, queries } from "@testing-library/react";

export type Queries = typeof queries;
export type Functions = BoundFunctions<Queries>;

export type DefineItem =
    | { name: string; type: "button"; label: string }
    | { name: string; type: "text"; label: `${string}\${text}${string}` | `/${string}/` | string }
    | { name: string; type: "input" | "select" | "date" | "options" | "selectedOption"; label: `${string}\${label}${string}` }
    | { name: string; type: "tableRow"; label: string }
    | { name: string; type: "tableRowByText"; label: `${string}\${text}${string}` };

export type ResultType<T extends readonly DefineItem[]> = T;
