import { ProjectRow } from "@comtypes/db/project";
import { Api, SearchCondition, States } from "@features/ProjectList/types/types";
import { useMemo } from "react";

export const useSearchController = (
    search: States["search"],
    pagination: States["pagination"],
    onSearch: Api["handleSearch"]
) => {

    const handleSearch = async (
        condition: SearchCondition = search.state,
        page: number = pagination.state.page,
        limit: number = pagination.state.limit,
    ): Promise<ProjectRow[]> => {
        search.setAll(condition);
        const result = await onSearch(condition, page, limit);
        if (!result) return;
        pagination.updateTotal(result.total_num);
        return result.items;
    };

    const handleSearchByPage = async (page: number): Promise<ProjectRow[]> => {
        const result = await handleSearch(search.state, page, pagination.state.limit);
        if (!result) return;
        pagination.setPage(page);
        return result;
    };

    const handleSearchByOption = async (options?: {
        condition?: SearchCondition,
        mode?: "next" | "prev",
    }) => {
        if (options?.mode === "next") return await handleSearchByPage(pagination.next());
        if (options?.mode === "prev") return await handleSearchByPage(pagination.prev());
        if (options?.condition) return await handleSearch(options.condition);
        return await handleSearch();
    }

    return useMemo(() => ({
        search: search.state,
        pagination: pagination.state,
        onChangeCondition: search.setField,
        handleSearch,
        handleSearchByPage,
        handleSearchByOption,
    }), [search.state, pagination.state]);
}