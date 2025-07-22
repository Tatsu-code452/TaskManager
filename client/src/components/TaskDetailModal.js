import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TaskDetailModal = ({ task, open, onClose }) => {
    if (!open || !task)
        return null;
    return (_jsxs("div", { className: "modal", children: [_jsx("h3", { children: "\u30BF\u30B9\u30AF\u8A73\u7D30" }), _jsxs("div", { children: ["\u30BF\u30A4\u30C8\u30EB: ", task.title] }), _jsx("button", { onClick: onClose, children: "\u9589\u3058\u308B" })] }));
};
export default TaskDetailModal;
