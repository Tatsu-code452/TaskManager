import {
    BoundFunctions,
    ByRoleOptions as _ByRoleOptions,
    Matcher as _Matcher,
    Screen as _Screen,
    fireEvent as _fireEvent,
    waitFor as _waitFor,
    within as _within,
    queries,
} from "@testing-library/react";
import {
    Mock as _Mock,
    MockedFunction as _MockedFunction,
} from "vitest";

export type Functions = BoundFunctions<typeof queries>;
export type Matcher = _Matcher;
export type ByRoleOptions = _ByRoleOptions;
export const within = _within;
export const fireEvent = _fireEvent;
export const waitFor = _waitFor;
export type Screen = _Screen;
export type MockedFunction<T extends (...args: unknown[]) => unknown> = _MockedFunction<T>;
export type Mock = _Mock;