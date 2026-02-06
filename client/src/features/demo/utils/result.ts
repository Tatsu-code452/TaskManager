export type Result<T> =
    | { ok: true; kind: "data"; data: T }
    | { ok: true; kind: "empty" }
    | { ok: false; kind: "error"; error: string };
