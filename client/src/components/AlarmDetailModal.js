import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const AlarmDetailModal = ({ alarm, open, onClose }) => {
    if (!open || !alarm)
        return null;
    return (_jsxs("div", { className: "modal", children: [_jsx("h3", { children: "\u30A2\u30E9\u30FC\u30E0\u8A73\u7D30" }), _jsxs("div", { children: ["\u30BF\u30A4\u30C8\u30EB: ", alarm.title] }), _jsx("button", { onClick: onClose, children: "\u9589\u3058\u308B" })] }));
};
export default AlarmDetailModal;
