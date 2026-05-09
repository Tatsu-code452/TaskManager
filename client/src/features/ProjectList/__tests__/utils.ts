
export const resetAllMocksDeep = (obj: unknown) => {
    Object.values(obj).forEach(v => {
        if (typeof v === "function" && "mockReset" in v) {
            v.mockReset();
        } else if (typeof v === "object" && v !== null) {
            resetAllMocksDeep(v);
        }
    });
};

export const resetMocks = (...mocks: unknown[]) => {
    mocks.forEach(m => resetAllMocksDeep(m));
};

export const setMocks = <K, T extends { target: (...args: unknown[]) => K, mock: K }>(target: T[]) => {
    target.forEach(t => vi.mocked(t.target).mockReturnValue(t.mock));
}

export const setupMocks = <K, T extends { target: (...args: unknown[]) => K, mock: K }>(target: T[]) => {
    setMocks(target);
    resetMocks(...target.map(v => v.mock));
};
