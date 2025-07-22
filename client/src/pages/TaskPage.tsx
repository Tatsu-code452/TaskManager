import React, { useState } from 'react';
import TaskFilterForm from '../components/TaskFilterForm';
import TaskList from '../components/TaskList';
import TaskDetailModal from '../components/TaskDetailModal';
import TaskEditForm from '../components/TaskEditForm';
import { Task } from '../types';

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState({});
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editTask, setEditTask] = useState<Task | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState(false);

  // TODO: API連携

  return (
    <div>
      <h2>タスク管理</h2>
      <TaskFilterForm filters={filters} onChange={setFilters} />
      <button onClick={() => setEditTask(undefined)}>新規登録</button>
      <TaskList tasks={tasks} onEdit={id => setEditTask(tasks.find(t => t.id === id))} onDelete={id => {}} onDetail={id => { setSelectedTask(tasks.find(t => t.id === id) || null); setModalOpen(true); }} />
      <TaskDetailModal task={selectedTask} open={modalOpen} onClose={() => setModalOpen(false)} />
      {editTask !== undefined && <TaskEditForm task={editTask} onSubmit={task => {}} onCancel={() => setEditTask(undefined)} />}
    </div>
  );
};

export default TaskPage;
