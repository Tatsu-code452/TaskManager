export const defines = {
    search: [
        { name: "searchButton", type: "button", label: "検索" },
        { name: "clearButton", type: "button", label: "クリア" },
        { name: "input", type: "input", label: "${label}" },
        { name: "select", type: "select", label: "${label}" },
        { name: "options", type: "options", label: "${label}" },
        { name: "selectedOption", type: "selectedOption", label: "${label}" },
    ],
    table: [
        { name: "row", type: "tableRow", label: "${opts}" },
        { name: "rowByText", type: "tableRowByText", label: "${text}" },
        { name: "editButton", type: "button", label: "✏️" },
    ],
    modal: [
        { name: "createButton", type: "button", label: "作成" },
        { name: "updateButton", type: "button", label: "更新" },
        { name: "cancelButton", type: "button", label: "キャンセル" },
        { name: "input", type: "input", label: "${label}" },
        { name: "date", type: "date", label: "${label}" },
        { name: "select", type: "select", label: "${label}" },
        { name: "text", type: "text", label: "${text}" },
    ],
    pagination: [
        { name: "prev", type: "button", label: "《" },
        { name: "next", type: "button", label: "》" },
        { name: "text", type: "text", label: "${text} 件の結果" },
        { name: "info", type: "text", label: "/\\d+ \\/ \\d+/" }
    ],
} as const;

