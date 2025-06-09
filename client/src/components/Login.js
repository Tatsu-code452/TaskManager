import React, { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
            credentials: "include",
        });
        if (res.ok) {
            // ログイン成功時の処理
            alert("ログイン成功");
        } else {
            alert("ログイン失敗");
        }
    };

    return (
        <div className="row justify-content-center">
            <span style={{ display: "none" }} id="screen-title-act">
                ログイン画面
            </span>
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
