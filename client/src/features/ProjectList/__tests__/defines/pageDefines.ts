export const pageDefines = {
    all: {
        type: "testId",
        target: "container",
    },
    search: {
        type: "testId",
        target: "search-area",
        elements: [
            { name: "searchButton", type: "button", label: "検索" },
            { name: "clearButton", type: "button", label: "クリア" },
            { name: "input", type: "input", label: "${label}" },
            { name: "select", type: "select", label: "${label}" },
            { name: "options", type: "options", label: "${label}" },
            { name: "selectedOption", type: "selectedOption", label: "${label}" },
        ],
    },
    table: {
        type: "testId",
        target: "table_wrapper",
        elements: [
            { name: "row", type: "tableRow", label: "${opts}" },
            { name: "rowByText", type: "tableRowByText", label: "${text}" },
            { name: "editButton", type: "button", label: "✏️" },
        ],
    },
    modal: {
        type: "role",
        target: "dialog",
        async: true,
        elements: [
            { name: "createButton", type: "button", label: "作成" },
            { name: "updateButton", type: "button", label: "更新" },
            { name: "cancelButton", type: "button", label: "キャンセル" },
            { name: "input", type: "input", label: "${label}" },
            { name: "date", type: "date", label: "${label}" },
            { name: "select", type: "select", label: "${label}" },
            { name: "text", type: "text", label: "${text}" },
        ],
    },
    pagination: {
        type: "testId",
        target: "pagination",
        elements: [
            { name: "prev", type: "button", label: "《" },
            { name: "next", type: "button", label: "》" },
            { name: "text", type: "text", label: "${text} 件の結果" },
            { name: "info", type: "text", label: "/\\d+ \\/ \\d+/" }
        ],
    },
    createButton: {
        type: "role",
        target: "button",
        value: { name: "新規作成" },
    },
} as const;