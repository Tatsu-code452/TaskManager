import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const LoginForm = ({ onSubmit, errorMessage, isLoading }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(userId, password);
    };
    return (_jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("label", { children: "\u30E6\u30FC\u30B6ID" }), _jsx("input", { type: "text", value: userId, onChange: e => setUserId(e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { children: "\u30D1\u30B9\u30EF\u30FC\u30C9" }), _jsx("input", { type: "password", value: password, onChange: e => setPassword(e.target.value) })] }), errorMessage && _jsx("div", { style: { color: 'red' }, children: errorMessage }), _jsx("button", { type: "submit", disabled: isLoading, children: "\u30ED\u30B0\u30A4\u30F3" })] }));
};
export default LoginForm;
