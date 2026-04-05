import {
    Screen,
    within
} from "@testing-library/react";
import { baseOptions, defineOptions } from "./pageUtils";

export type PageOptions = ReturnType<typeof pageOptions>;
export const pageOptions = (screen: Screen) => {
    return {
        all: screen.getByTestId("container"),
        search: searchOptions(screen),
        table: tableOptions(screen),
        modal: modalOptions(screen),
        pagination: paginationOptions(screen),
        createButton: screen.getByRole("button", { name: "新規作成" }),
    };
};

const defines = {
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

const searchOptions = (screen: Screen) => {
    const area = screen.getByTestId("search-area");
    return {
        area,
        ...defineOptions(baseOptions(within(area)), defines["search"])
    }
}

const tableOptions = (screen: Screen) => {
    const wrapper = screen.getByTestId("table_wrapper");
    return {
        wrapper,
        ...defineOptions(baseOptions(within(wrapper)), defines["table"])
    }
}

const modalOptions = async (screen: Screen) => {
    const modal = await screen.findByRole("dialog");
    return {
        modal,
        ...defineOptions(baseOptions(within(modal)), defines["modal"])
    }
}

const paginationOptions = (screen: Screen) => {
    const area = screen.getByTestId("pagination");
    return {
        area,
        ...defineOptions(baseOptions(within(area)), defines["pagination"])
    }
}
