import React, { useState } from "react";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (username: string, password: string) => {
      try {
        setIsLoading(true);
        // 認証API呼び出し
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Cookieを送信
                // 認証情報を含める
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("ログインに失敗しました");
            }

            const data = await response.json();
            console.log("ログイン成功:", data);
            // 状態更新 or リダイレクト
        } catch (error: unknown) {
            const message =
                error instanceof Error ? error.message : "不明なエラーです";
            setErrorMessage(message);
        } finally {
          // 成功時は遷移、失敗時はsetErrorMessage
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>ログイン</h2>
            <LoginForm
                onSubmit={handleLogin}
                errorMessage={errorMessage}
                isLoading={isLoading}
            />
        </div>
    );
};

export default LoginPage;
