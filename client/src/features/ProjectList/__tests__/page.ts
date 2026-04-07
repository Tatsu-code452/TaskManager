import {
    Screen
} from "@testing-library/react";
import { defines } from "./pageDefines";
import { defineOptions } from "./test-utils/page";

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

const searchOptions = (screen: Screen) => {
    const area = screen.getByTestId("search-area");
    return {
        area,
        ...defineOptions(area, defines["search"])
    }
}

const tableOptions = (screen: Screen) => {
    const wrapper = screen.getByTestId("table_wrapper");
    return {
        wrapper,
        ...defineOptions(wrapper, defines["table"])
    }
}

const modalOptions = async (screen: Screen) => {
    const modal = await screen.findByRole("dialog");
    return {
        modal,
        ...defineOptions(modal, defines["modal"])
    }
}

const paginationOptions = (screen: Screen) => {
    const area = screen.getByTestId("pagination");
    return {
        area,
        ...defineOptions(area, defines["pagination"])
    }
}
