import { jsx as _jsx } from "react/jsx-runtime";
const TaskFilterForm = ({ filters, onChange }) => {
    // TODO: フィルター項目のUI
    return (_jsx("form", { children: _jsx("button", { type: "button", onClick: () => onChange(filters), children: "\u691C\u7D22" }) }));
};
export default TaskFilterForm;
