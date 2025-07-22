import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MenuButton from '../components/MenuButton';
const MenuPage = () => {
    const handleClick = (path) => {
        // TODO: 画面遷移処理
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "\u30E1\u30CB\u30E5\u30FC" }), _jsx(MenuButton, { label: "\u30BF\u30B9\u30AF\u7BA1\u7406", onClick: () => handleClick('/tasks') }), _jsx(MenuButton, { label: "\u30AC\u30F3\u30C8\u30C1\u30E3\u30FC\u30C8", onClick: () => handleClick('/gantt') }), _jsx(MenuButton, { label: "\u30E6\u30FC\u30B6\u7BA1\u7406", onClick: () => handleClick('/users') }), _jsx(MenuButton, { label: "\u30DE\u30B9\u30BF\u7BA1\u7406", onClick: () => handleClick('/master') }), _jsx(MenuButton, { label: "\u30A2\u30E9\u30FC\u30E0\u5C65\u6B74", onClick: () => handleClick('/alarms') })] }));
};
export default MenuPage;
