import { ApiState } from "../hooks/api/useApiState";

export const createApiResultProps = (api: ApiState) => ({
    apiResult: api.apiResult,
});
