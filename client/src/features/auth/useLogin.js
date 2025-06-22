import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApiWithLock } from "../../module/fetchModule";

const initialFormState = {
    username: "",
    password: "",
};

const useLogin = () => {
    const [form, setForm] = useState(initialFormState);
    const navigate = useNavigate();

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }, []);

    const loginUser = useCallback(async (credentials) => {
        return await fetchApiWithLock("POST", "/login", credentials);
    }, []);

    const handleLogin = useCallback(
        async (e) => {
            e.preventDefault();
            const { username, password } = form;

            if (!username || !password) {
                alert("ユーザー名とパスワードは必須です");
                return;
            }

            try {
                const data = await loginUser({ username, password });
                if (data.success) {
                    navigate("/menu");
                } else {
                    alert("ユーザー名またはパスワードが間違っています");
                }
            } catch (error) {
                console.error("ログイン中にエラー:", error);
                alert("ログインリクエスト中にエラーが発生しました");
            }
        },
        [form, loginUser, navigate]
    );

    return {
        form,
        handleInputChange,
        handleLogin,
    };
};

export default useLogin;
