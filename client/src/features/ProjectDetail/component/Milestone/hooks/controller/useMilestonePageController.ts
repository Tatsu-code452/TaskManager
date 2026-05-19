import { Api, PageState } from "@features/ProjectDetail/component/Milestone/types/milestone";
import { useMemo } from "react";

export const useMilestonePageController = (
    pageState: PageState,
    api: Api,
) => {
    const handleLoad = async () => {
        const result = await api.handleList();
        if (result) pageState.setState(result);
    }

    const handleDelete = async (id: string) => {
        if (!confirm("削除しますか？")) return;

        await api.handleDelete(id);
        await handleLoad();
    }

    return useMemo(() => ({
        pageState: pageState.state,
        handleLoad,
        handleDelete,
    }), [pageState.state]);
}