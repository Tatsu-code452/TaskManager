import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useScreenTitle from "./useScreenTitle";

function Login() {
    useScreenTitle("ログイン画面");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "ネットワークエラー: " + response.statusText
                    );
                }
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    navigate("/menu"); // React Routerでメニュー画面へ遷移
                } else {
                    alert("ユーザー名またはパスワードが間違っています");
                }
            })
            .catch((error) => {
                console.error(
                    "ログインリクエスト中にエラーが発生しました:",
                    error
                );
                alert("ログインリクエスト中にエラーが発生しました");
            });
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
