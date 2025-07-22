import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import GanttFilter from '../components/GanttFilter';
import GanttChart from '../components/GanttChart';
const GanttChartPage = () => {
    const [tasks, setTasks] = useState([]);
    // TODO: API連携
    const handleTaskDateChange = (taskId, start, end) => {
        // TODO: 期間変更処理
    };
    const handleTaskSelect = (taskId) => {
        // TODO: 選択処理
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "\u30AC\u30F3\u30C8\u30C1\u30E3\u30FC\u30C8" }), _jsx(GanttFilter, {}), _jsx(GanttChart, { tasks: tasks, onTaskDateChange: handleTaskDateChange, onTaskSelect: handleTaskSelect })] }));
};
export default GanttChartPage;
