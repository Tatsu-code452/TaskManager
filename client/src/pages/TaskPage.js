import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import TaskFilterForm from '../components/TaskFilterForm';
import TaskList from '../components/TaskList';
import TaskDetailModal from '../components/TaskDetailModal';
import TaskEditForm from '../components/TaskEditForm';
const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [filters, setFilters] = useState({});
    const [selectedTask, setSelectedTask] = useState(null);
    const [editTask, setEditTask] = useState(undefined);
    const [modalOpen, setModalOpen] = useState(false);
    // TODO: API連携
    return (_jsxs("div", { children: [_jsx("h2", { children: "\u30BF\u30B9\u30AF\u7BA1\u7406" }), _jsx(TaskFilterForm, { filters: filters, onChange: setFilters }), _jsx("button", { onClick: () => setEditTask(undefined), children: "\u65B0\u898F\u767B\u9332" }), _jsx(TaskList, { tasks: tasks, onEdit: id => setEditTask(tasks.find(t => t.id === id)), onDelete: id => { }, onDetail: id => { setSelectedTask(tasks.find(t => t.id === id) || null); setModalOpen(true); } }), _jsx(TaskDetailModal, { task: selectedTask, open: modalOpen, onClose: () => setModalOpen(false) }), editTask !== undefined && _jsx(TaskEditForm, { task: editTask, onSubmit: task => { }, onCancel: () => setEditTask(undefined) })] }));
};
export default TaskPage;
