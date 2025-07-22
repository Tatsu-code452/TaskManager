import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const AlarmList = ({ alarms, onDetail }) => (_jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u30BF\u30A4\u30C8\u30EB" }), _jsx("th", { children: "\u64CD\u4F5C" })] }) }), _jsx("tbody", { children: alarms.map(alarm => (_jsxs("tr", { children: [_jsx("td", { children: alarm.title }), _jsx("td", { children: _jsx("button", { onClick: () => onDetail(alarm.id), children: "\u8A73\u7D30" }) })] }, alarm.id))) })] }));
export default AlarmList;
