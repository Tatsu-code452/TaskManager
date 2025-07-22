import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import LoginForm from '../components/LoginForm';
const LoginPage = () => {
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = async (userId, password) => {
        setIsLoading(true);
        // TODO: 認証API呼び出し
        setIsLoading(false);
        // 成功時は遷移、失敗時はsetErrorMessage
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "\u30ED\u30B0\u30A4\u30F3" }), _jsx(LoginForm, { onSubmit: handleLogin, errorMessage: errorMessage, isLoading: isLoading })] }));
};
export default LoginPage;
