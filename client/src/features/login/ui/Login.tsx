import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { useLoginHandler } from "../hooks/useLoginHandler";
import { useLoginState } from "../hooks/useLoginState";
import styles from "../styles/styles.module.css";

// ログイン画面
export const Login = () => {
    const navigate = useNavigate();

    const { username, setUsername, password, setPassword, error, setError } =
        useLoginState();

    const { loading, handleSubmit } = useLoginHandler({
        onError: setError,
        onSuccess: () => navigate("/tasks"),
    });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleSubmit(username, password);
    };

    return (
        <div className={styles["login-container"]}>
            <div className={styles["login-box"]}>
                <h1 className="login-title">ログイン</h1>

                <form onSubmit={onSubmit}>
                    <Input
                        id="username-input"
                        placeholder="ユーザー名"
                        value={username}
                        onChange={setUsername}
                    />
                    <Input
                        id="password-input"
                        placeholder="パスワード"
                        type="password"
                        value={password}
                        onChange={setPassword}
                    />

                    {error && <p className={styles.error}>{error}</p>}

                    <Button type="submit" variant="primary" loading={loading}>
                        ログイン
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
