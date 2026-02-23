import { useAsyncGuard } from "../../../utils/useAsyncGuard";
import { loginService } from "../domain/loginService";

export const useLoginHandler = ({
    onError,
    onSuccess,
}: {
    onError: (message: string) => void;
    onSuccess: () => void | Promise<void>;
}) => {

    const { run: handleSubmit, isRunning: loading } = useAsyncGuard(
        async (username: string, password: string): Promise<void> => {
            try {
                // ログイン実行
                const res = await loginService.loginUser(username, password);

                if (!res.success) {
                    onError(res.message);
                    return;
                }

                console.log("ログイン成功");
                onSuccess();
            } catch (err) {
                console.error("ログイン失敗", err);
                onError("サーバーエラーが発生しました");
            }
        }
    );

    return {
        loading,
        handleSubmit,
    }
}