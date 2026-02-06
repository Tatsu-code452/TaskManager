import { toErrorMessage } from "../../../../utils/notify";
import { useEntityApi } from "../api/useEntityApi";
import { Entity, DataItem } from "../../const/const";
import { Result } from "../../utils/result";

export const useFetch = () => {
    const { fetchList } = useEntityApi();

    const onFetch = async (entity: Entity): Promise<Result<DataItem[]>> => {
        try {
            const res = await fetchList(entity);
            const list = res.data;

            // データが空の場合は empty を返す
            if (!Array.isArray(list) || list.length === 0) {
                return {
                    ok: true,
                    kind: "empty"
                } as const;
            }

            // データあり
            return {
                ok: true,
                kind: "data",
                data: list
            } as const;

        } catch (err) {
            return {
                ok: false,
                kind: "error",
                error: toErrorMessage(err)
            } as const;
        }
    };

    return { onFetch };
};