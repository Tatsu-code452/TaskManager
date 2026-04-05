import { within } from "@testing-library/react";
import { Mock } from "vitest";
import { PageOptions } from "./page";

type TestsDefine = {
    type: string;
    target?: string;
    key?: string;
    params: readonly string[],
}

export type ExpectDefine = {
    name: string;
    params?: readonly string[],
    tests?: readonly TestsDefine[];
};

type UnionToIntersection<U> =
    (U extends unknown ? (k: U) => void : never) extends
    (k: infer I) => void ? I : never;

type ExpectResult<T extends readonly ExpectDefine[]> =
    UnionToIntersection<
        T[number] extends infer U
        ? U extends { type: "mockCalled", name: infer N extends string }
        ? { [K in N]: (mockFn: Mock, times: number) => Promise<void> }

        : U extends { type: "notInDocument", name: infer N extends string }
        ? { [K in N]: (page: PageOptions) => Promise<void> }

        : U extends { type: "modalCheck", name: infer N extends string }
        ? { [K in N]: () => Promise<void> }

        : U extends { type: "paginationCheck", name: infer N extends string }
        ? { [K in N]: (...args: number[]) => void }

        : U extends { type: "searchRow", name: infer N extends string }
        ? { [K in N]: (project: unknown) => Promise<void> }

        : U extends { type: "navigate", name: infer N extends string }
        ? { [K in N]: (mockFn: Mock, param: string) => void }

        : U extends { type: "search", name: infer N extends string }
        ? { [K in N]: () => void }

        : U extends { type: "optionLabel", name: infer N extends string }
        ? { [K in N]: () => void }

        : U extends { type: "calledTimes", name: infer N extends string }
        ? { [K in N]: (mockFn: Mock, times: number) => Promise<void> }
        : never
        : never
    >;

// export const defineExpect = <Q extends typeof queries>
// (target: BoundFunctions<Q>, defs: DefineItem) => {
export const defineExpect = <T extends readonly ExpectDefine[], H extends Record<string, unknown> = Record<string, unknown>>(defs: T, target?: unknown, helpers?: H): ExpectResult<T> => {
    const result: Record<string, unknown> = {};

    for (const def of defs) {
        if (!def.tests) return;

        result[def.name] = (...args) => {
            const vars = Object.fromEntries(
                (def.params ?? []).map((name, i) => [name, args[i]])
            );

            const ctx = { target, helpers, args, vars };

            return Promise.all(
                def.tests.map(test => testReducer(test, ctx))
            );
        };
        // for (const test of def.tests) {
        //     if (def.type === "searchRow") {
        //         result[def.name] = (async (project: Record<string, unknown>) => {
        //             const row_ = await target["rowByText"](project["id"] as string);
        //             if (test.type === "inDocument" && test.target === "textGet") {
        //                 const row = (): HTMLElement => (row_ as HTMLElement);
        //                 const vars = { project };
        //                 const workTarget = { ...target as Record<string, unknown>, row };
        //                 const ctx = { target: workTarget, vars, helpers, isExpr: true };
        //                 testReducer(test, ctx);
        //             }
        //         });
        //     }

        //     if (["search", "optionLabel"].includes(def.type)) {
        //         result[def.name] = (() => {
        //             const ctx = { target, helpers };
        //             testReducer(test, ctx);
        //         });
        //     }
        //     if (["navigate"].includes(def.type)) {
        //         result[def.name] = ((mockFn: Mock, param: string) => {
        //             const ctx = { mockFn, param };
        //             return () => testReducer(test, ctx);
        //         });
        //     }
        //     if (def.type === "modalCheck") {
        //         result[def.name] = (async () => {
        //             const ctx = { target, helpers };
        //             testReducer(test, ctx);
        //         });
        //     }
        //     if (def.type === "notInDocument") {
        //         result[def.name] = (async (page: unknown) => {
        //             const element = page[def.params[0]];
        //             const ctx = { element };
        //             if (test.type === "notInDocument") {
        //                 await waitFor(() => {
        //                     testReducer(test, ctx);
        //                 });
        //             }
        //         });
        //     }
        //     if (def.type === "calledTimes") {
        //         result[def.name] = (async (mockFn: Mock, times: number) => {
        //             const ctx = { mockFn, times };
        //             await waitFor(() =>
        //                 () => testReducer(test, ctx)
        //             )
        //         });
        //     }
        //     if (def.type === "paginationCheck") {
        //         result[def.name] = ((...args: string[]) => {
        //             if (test.type === "inDocument") {
        //                 const vars = Object.fromEntries(
        //                     def.params.map((name, i) => [name, args[i]])
        //                 );
        //                 const ctx = { target, helpers, args, vars };
        //                 testReducer(test, ctx);

        //             }
        //             if (test.type === "disabled") {
        //                 const ctx = { target };
        //                 testReducer(test, ctx);
        //             }
        //         });
        //     }
        // }
    }
    return result as ExpectResult<T>;
};
type Helpers = Record<string, unknown>;

const testReducer = (test: TestsDefine, ctx: Record<string, unknown>) => {
    if (test.type === "inDocument") return inDocument(test, ctx);
    if (test.type === "inDocumentRow") return () => inDocumentRow(test, ctx);
    if (test.type === "equal" && test.target === "labels") return equalOptions(test, ctx);
    if (test.type === "haveValue") return haveValue(test, ctx);
    if (test.type === "haveText") return haveText(test, ctx);
    if (test.type === "notInDocument") return notInDocument(test, ctx);
    if (test.type === "calledTimes") return calledTimes(test, ctx);
    if (test.type === "mockCalled") return calledWith(test, ctx);
    if (test.type === "disabled") disabled(test, ctx);
}

const getValue = (valueExpr: string, helpers?: Helpers) => {
    return valueExpr === ""
        ? ""
        : evalExpression(valueExpr, helpers ?? {});
}

const haveValue = (test: TestsDefine, ctx: Record<string, unknown>) => {
    const { target, helpers } = ctx;
    const [label, valueExpr] = test.params;
    expect(target[test.target](label)).toHaveValue(getValue(valueExpr, helpers as Record<string, unknown>));
}

const haveText = (test: TestsDefine, ctx: Record<string, unknown>) => {
    const { target, helpers } = ctx;
    const [label, valueExpr] = test.params;
    expect(target[test.target](label)).toHaveTextContent(getValue(valueExpr, helpers as Record<string, unknown>));
}

const equalOptions = (test: TestsDefine, ctx: Record<string, unknown>) => {
    const { target } = ctx;
    const [label, ...expected] = test.params;
    const options = target["options"](label);
    const labels = options.map((o: HTMLElement) => o.textContent);
    expect(labels).toEqual(expected);
}

const inDocument = (test: TestsDefine, ctx: Record<string, unknown>) => {
    const { target, vars, helpers } = ctx;

    if (test.target === "textGet") {
        const [key, expr] = test.params;

        let value: string;

        if (expr.includes("${") || expr.includes(".")) {
            console.log(`evalExpression:${expr},${value}`);
            value = evalExpression(
                expr,
                {
                    ...vars as Record<string, unknown>,
                    ...helpers as Record<string, unknown>
                }
            );
            console.log(`evalExpression:${expr},${value}`);
        }
        else {
            value = expr;
            for (const [name, val] of Object.entries(vars ?? {})) {
                value = value.replaceAll(name, String(val));
            }
        }

        const fn = target[key];
        let element: HTMLElement;
        if (typeof fn !== "function") {
            element = fn as HTMLElement;
            console.log(`element:${key},${target[key]},${value}`);
        } else {
            if (fn.length === 0) {
                // 引数なし
                element = fn();
                console.log(`fn():${key},${target[key]()},${value}`);
            } else {
                // 引数あり → vars の最初の値を渡す
                // 例: rowByText(project.id)
                element = fn(value);
                console.log(`fn(value):${key},${target[key]()},${value}`);
            }
        }

        expect(
            within(element).getByText(value)
        ).toBeInTheDocument();
    }
};

const inDocumentRow = async (test: TestsDefine, ctx: Record<string, unknown>) => {
    const { target, vars, helpers } = ctx;

    // row がまだ取得されていなければ取得する
    if (!ctx.targetRow) {
        const [key, expr] = test.params;

        const id = evalExpression(test.key, {
            ...vars as Record<string, unknown>,
            ...helpers as Record<string, unknown>,
        });

        // rowByText(id) を 1 回だけ呼ぶ
        const targetRow = await target[key](id);
        ctx.targetRow = targetRow;
        console.log(`${Object.keys(ctx.target)}`)
        // row() を target に注入
        ctx.target = {
            ...ctx.target as Record<string, unknown>,
            fixedTarget: targetRow,
        };
        console.log(`${Object.keys(ctx.target)}`)
    }

    // row が取れたので、通常の inDocument(textGet) に変換して実行
    const fixedTest = {
        ...test,
        params: ["fixedTarget", test.params[1]],
        type: "inDocument",
    };

    return inDocument(fixedTest, ctx);
};

const calledWith = (test: TestsDefine, ctx: Record<string, unknown>) => {
    const { args } = ctx;
    expect(args[0] as Mock).toHaveBeenCalledWith(args[1]);
}

const calledTimes = (test: TestsDefine, ctx: Record<string, unknown>) => {
    const { args } = ctx;
    expect(args[0] as Mock).toHaveBeenCalledTimes(args[1]);
}

const notInDocument = (test: TestsDefine, ctx: Record<string, unknown>) => {
    const { args } = ctx;
    expect(within(args[0][test.params[0]] as HTMLElement).queryByRole(test.params[1]))
        .not.toBeInTheDocument();
}

const disabled = (test: TestsDefine, ctx: Record<string, unknown>) => {
    const { target } = ctx;
    expect(target[test.params[0]]()).toBeDisabled();

}
// const evalExpression = (expr: string, ctx: Record<string, unknown>) => {
//     return Function(...Object.keys(ctx), `return ${expr};`)(...Object.values(ctx));
// };
const evalExpression = (expr: string, ctx: Record<string, unknown>) => {
    const keys = Object.keys(ctx);
    const values = Object.values(ctx);

    // ① テンプレート式（${...} を含む）
    if (expr.includes("${")) {
        const wrapped = `\`${expr}\``;
        return Function(...keys, `return ${wrapped};`)(...values);
    }

    // ② 通常の式（ProjectStatus.All など）
    return Function(...keys, `return ${expr};`)(...values);
};
