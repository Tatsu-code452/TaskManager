import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useScreenTitle from "./useScreenTitle";

function Login() {
    useScreenTitle("ログイン画面");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // ログインAPI呼び出し
    const login = async (username, password) => {
        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("ネットワークエラー: " + response.statusText);
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    };

    // フォーム送信時の処理
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(username, password);
            if (data.success) {
                navigate("/menu");
            } else {
                alert("ユーザー名またはパスワードが間違っています");
            }
        } catch (error) {
            console.error("ログインリクエスト中にエラーが発生しました:", error);
            alert("ログインリクエスト中にエラーが発生しました");
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-4">
                <h2 className="mb-4 text-center">ログイン</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            ユーザー名
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            パスワード
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        ログイン
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
