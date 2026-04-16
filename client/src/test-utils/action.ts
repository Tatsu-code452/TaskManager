import { ActionDefine, ActionDefines, ParamsToArgs, RetunAction, Return, ReturnActions } from "./actionUtils/types";
import { fireEvent, MockedFunction } from "./typesTesting";
export type FlowMode = "run" | "generate";

export const createAction = <
    Define extends Record<string, ActionDefines<ActionDefine>>,
    R extends Record<string, unknown>
>(
    page: Record<string, unknown | Record<string, unknown>>,
    defines: Define,
): Return<Define, R> => {

    const result = {} as Return<Define, R>;

    for (const groupKey of Object.keys(defines) as (keyof Define)[]) {
        const group = defines[groupKey];
        if (group.async) {
            // ★ async グループ
            result[groupKey] = (async () => {
                const rawTarget = group.target ? page[group.target] : page;

                // ★ target が関数なら呼んで await、それ以外はそのまま
                const pageTarget =
                    typeof rawTarget === "function"
                        ? await rawTarget()
                        : rawTarget;

                return createActionsFromDef(pageTarget, group);
            }) as Return<Define, R>[typeof groupKey];
        } else {
            // ★ sync グループ（今のままで OK）
            const pageTarget = group.target ? page[group.target] : page;
            result[groupKey] = (() => {
                return createActionsFromDef(pageTarget, group);
            }) as Return<Define, R>[typeof groupKey];
        }
    }

    return result as Return<Define, R>;
};

export const createActionsFromDef = <
    AD extends ActionDefine,
    R extends Record<string, unknown>
>(
    pageTarget: Record<string, unknown> | unknown,
    group: ActionDefines<AD>,
): ReturnActions<typeof group, R> => {
    const result = {} as ReturnActions<typeof group, R>;

    for (const action of group.actions) {
        result[action.name] =
            createActionFromDef<AD, R>(pageTarget, action);
    }

    return result;
};

export const createActionFromDef = <
    A extends ActionDefine,
    R extends Record<string, unknown>
>(
    pageTarget: Record<string, unknown> | unknown,
    actionDefine: A,
): RetunAction<A, R> => {
    const pageMethod =
        actionDefine.method && typeof pageTarget === "object" && pageTarget !== null
            ? (pageTarget as Record<string, unknown>)[actionDefine.method]
            : pageTarget;
    // const args = actionDefine.params?.map(key => paramRegistry[key]) ?? [];

    let fn: (...runtimeArgs: unknown[]) => unknown;
    // mockOnce
    if (actionDefine.type === "mockOnce") {
        fn = (...runtimeArgs: unknown[]) => {
            const [mockedFn, ...rest] = runtimeArgs;
            const params: SetMockParams<typeof rest> = {
                mockedFn: mockedFn as MockedFn<typeof rest>,
                result: rest,
            };
            mockOnce(params);
        };
    }

    // DOM 操作
    if (["click", "input", "mouseDown"].includes(actionDefine.type)) {
        if (["click", "input", "mouseDown"].includes(actionDefine.type)) {
            if (actionDefine.async) {
                // ★ async アクション（table, modal）
                fn = async (...runtimeArgs: unknown[]) => {
                    const element = await resolvePageMethod(pageMethod, runtimeArgs);
                    const resolvedType = actionDefine.type === "mouseDown" ? "click" : actionDefine.type;

                    if (resolvedType === "input" && runtimeArgs.length >= 2) {
                        event(resolvedType, { element, value: runtimeArgs[1] as string });
                    } else {
                        event(resolvedType, { element });
                    }
                };
            } else {
                // ★ sync アクション（page, search, pagination）
                fn = (...runtimeArgs: unknown[]) => {
                    let element: HTMLElement;

                    if (typeof pageMethod === "function") {
                        if (!actionDefine.params || actionDefine.params.length === 0) {
                            element = pageMethod();
                        } else {
                            element = pageMethod(...runtimeArgs);
                        }
                    } else {
                        element = pageMethod as HTMLElement;
                    }

                    const resolvedType = actionDefine.type === "mouseDown" ? "click" : actionDefine.type;

                    if (resolvedType === "input" && runtimeArgs.length >= 2) {
                        event(resolvedType, { element, value: runtimeArgs[1] as string });
                    } else {
                        event(resolvedType, { element });
                    }
                };
            }
        }
    }

    if (!fn) {
        if (actionDefine.async) {
            fn = async (...runtimeArgs: unknown[]) => {
                if (typeof pageMethod === "function") {
                    const result = pageMethod(...runtimeArgs);
                    if (result instanceof Promise) {
                        await result;
                    }
                }
            };
        } else {
            fn = (...runtimeArgs: unknown[]) => {
                if (typeof pageMethod === "function") {
                    pageMethod(...runtimeArgs);
                }
            };
        }
    }
    const result = actionDefine.async
        ? (actionDefine.params
            ? async (...runtimeArgs: ParamsToArgs<A["params"], R>) => fn(...runtimeArgs)
            : async () => fn())
        : (actionDefine.params
            ? (...runtimeArgs: ParamsToArgs<A["params"], R>) => fn(...runtimeArgs)
            : () => fn());

    return result as RetunAction<A, R>;
};

const resolvePageMethod = async (
    pageMethod: unknown, runtimeArgs: unknown[]
) => {
    let fn = pageMethod;

    // ① Promise なら await
    if (fn instanceof Promise) {
        fn = await fn;
    }

    // ② 関数を返す関数なら展開
    while (typeof fn === "function" && fn.length === 0) {
        const next = fn();
        if (next instanceof Promise) {
            fn = await next;
        } else {
            fn = next;
        }
    }

    // ③ 引数あり関数なら実行
    if (typeof fn === "function") {
        const result = fn(...runtimeArgs);
        return result instanceof Promise ? await result : result;
    }

    // ④ HTMLElement の場合
    return fn;
}

export type FireEventParams = {
    element: HTMLElement,
    value?: string,
};

type MockedFn<T> = MockedFunction<(...args: unknown[]) => Promise<T>>;
export type SetMockParams<T> = {
    mockedFn: MockedFn<T>,
    result: Awaited<T>,
};

export const mockOnce = <T>(params: SetMockParams<T>): void => {
    const { mockedFn, result } = params;
    mockedFn.mockResolvedValueOnce(result);
};

export const event = (type: string, params: FireEventParams): void => {
    const { element, value } = params;
    if (value !== undefined) {
        fireEvent[type](element, {
            target: { value },
        });
    } else {
        fireEvent[type](element);
    }
};
