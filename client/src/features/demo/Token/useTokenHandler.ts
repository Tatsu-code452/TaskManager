import { error } from "../../../utils/notify";
import { useAsync } from "../../../utils/useAsync";
import { useTokenLogic } from "./useTokenLogic"

export const useTokenHandler = ({
    setCsrfToken,
}: {
    setCsrfToken: (value: string) => void;
}) => {
    const { onFetchToken } = useTokenLogic();
    const { execute, loading } = useAsync(onFetchToken);

    // UIのonClickに設定
    const handleFetchToken = async () => {
        const res = await execute();

        if (res.ok === false) {
            error(res.error);
            return;
        }
        switch (res.kind) {
            case "data":
                setCsrfToken(res.data.token);
                break;
            case "empty":
                break;
        }

    };

    return {
        onFetchToken,
        handleFetchToken,
        loading,
    };
};