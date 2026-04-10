export const describeValue = (value: unknown): string => {
    if (value instanceof HTMLElement) {
        return `<${value.tagName.toLowerCase()} id="${value.id}" class="${value.className}">`;
    }

    if (typeof value === "function") {
        return value.constructor.name === "AsyncFunction"
            ? `async function ${value.name || "(anonymous)"}`
            : `function ${value.name || "(anonymous)"}`;
    }

    if (typeof value === "object" && value !== null) {
        return `{ ${Object.keys(value).join(", ")} }`;
    }

    return String(value);
};
