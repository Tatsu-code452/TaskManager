import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const MenuButton = ({ label, icon, onClick }) => (_jsxs("button", { onClick: onClick, children: [icon && _jsx("span", { children: icon }), label] }));
export default MenuButton;
