export const actionDefines = {
    page: {
        actions: [
            { type: "mockOnce", name: "setListMock", params: ["listMock", "items", "total_num"] },
            { type: "click", name: "clickCreate", method: "createButton" },
        ],
    },
    search: {
        target: "search",
        actions: [
            { type: "click", name: "clickSearch", method: "searchButton" },
            { type: "click", name: "clickClear", method: "clearButton" },
            { type: "input", name: "inputSearch", method: "input", params: ["label", "value"] },
            { type: "mouseDown", name: "openSelect", method: "select", params: ["label"] },
        ],
    },
    table: {
        target: "table",
        actions: [
            { type: "click", name: "clickRow", async: true, method: "rowByText", params: ["project.id"] },
            { type: "click", name: "clickEdit", async: true, method: "editButton" }
        ],
    },
    modal: {
        target: "modal",
        async: true,
        actions: [
            { type: "input", name: "input", async: true, method: "input", params: ["label", "value"] },
            { type: "input", name: "inputDate", async: true, method: "input", params: ["label", "value"] },
            { type: "click", name: "clickCreate", async: true, method: "createButton" },
            { type: "click", name: "clickUpdate", async: true, method: "updateButton" },
            { type: "click", name: "clickClose", async: true, method: "cancelButton" },
        ],
    },
    pagination: {
        target: "pagination",
        async: true,
        actions: [
            { type: "click", name: "clickNext", method: "next" },
            { type: "click", name: "clickPrev", method: "prev" },
        ],
    }
} as const;
