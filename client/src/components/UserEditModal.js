import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const UserEditModal = ({ user, onSubmit, onCancel, open, onClose }) => {
    if (!open)
        return null;
    return (_jsxs("div", { className: "modal", children: [_jsx("h3", { children: "\u30E6\u30FC\u30B6\u7DE8\u96C6" }), _jsx("button", { onClick: onClose, children: "\u9589\u3058\u308B" })] }));
};
export default UserEditModal;
