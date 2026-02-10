import { useDataCreateFormHandler } from "./DataCreateForm/useDataCreateFormHandler";
import { useDataEditHandler } from "./DataEdit/useDataEditHandler";
import { DataFetchHandler } from "./DataFetch/types";
import { useDataListHandler } from "./DataList/useDataListHandler";
import { useApiState } from "./hooks/api/useApiState";
import { useAuthState } from "./hooks/auth/useAuthState";
import { useEntityState } from "./hooks/entity/useEntityState";
import { useFetchStateHandler } from "./hooks/entity/useFetchStateHandler";
import { useLoginHandler } from "./Login/useLoginHandler";
import { useTokenHandler } from "./Token/useTokenHandler";

export const useSimpleApiDemo = () => {
    const auth = useAuthState();
    const api = useApiState();
    const crud = useEntityState();

    const fetchHandler = useFetchStateHandler({
        entity: crud.entity,
        isFetching: api.isFetching,
        onChangeSelectedId: crud.setSelectedId,
        onChangeItems: crud.setItems,
        onChangeIsFetching: api.setIsFetching,
    });

    const dataCreateFormHandler = useDataCreateFormHandler({
        newId: crud.newId,
        newName: crud.newName,
        payloadJson: crud.payloadJson,
        entity: crud.entity,
        onRefresh: fetchHandler.handleFetch,
    });

    const tokenHandler = useTokenHandler({
        setCsrfToken: auth.setCsrfToken,
    });

    const loginHandler = useLoginHandler({
        username: auth.username,
        password: auth.password,
        setLoginResult: auth.setLoginResult,
        onFetchToken: tokenHandler.onFetchToken,
    });

    const dataFetchHandler: DataFetchHandler = {
        onChangeEntity: crud.setEntity,
        onReset: crud.onReset,
        onFetch: fetchHandler.handleFetch,
    };

    const dataListHandler = useDataListHandler({
        entity: crud.entity,
        onRefresh: fetchHandler.handleFetch,
    });

    const dataEditHandler = useDataEditHandler({
        selectedId: crud.selectedId,
        newName: crud.newName,
        payloadJson: crud.payloadJson,
        entity: crud.entity,
        onChangeSelectedId: crud.setSelectedId,
        onRefresh: fetchHandler.handleFetch,
    });

    return {
        props: {
            auth,
            api,
            crud,
            dataCreateFormHandler,
            loginHandler,
            tokenHandler,
            dataFetchHandler,
            dataListHandler,
            dataEditHandler,
        }
    }
}