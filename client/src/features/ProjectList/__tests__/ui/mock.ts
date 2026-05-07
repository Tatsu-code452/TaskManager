export const InlineSelectEditorMock = {
    value: "value1",
    options: ["value1", "value2", "value3"],
    labelMap: { value1: "label1", value2: "label2", value3: "label3" },
    className: "className",
    onStartEdit: vi.fn(),
    onChange: vi.fn(),
    onCommit: vi.fn(),
}