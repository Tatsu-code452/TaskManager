import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const UserEditForm = ({ user, onSubmit, onCancel }) => {
    // TODO: 編集フォームUI
    return (_jsxs("form", { children: [_jsx("button", { type: "button", onClick: onCancel, children: "\u30AD\u30E3\u30F3\u30BB\u30EB" }), _jsx("button", { type: "button", onClick: () => onSubmit(user), children: "\u4FDD\u5B58" })] }));
};
export default UserEditForm;
