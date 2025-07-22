import React from 'react';
import type { TaskDetailModalProps } from '../types';

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ task, open, onClose }) => {
  if (!open || !task) return null;
  return (
    <div className="modal">
      <h3>タスク詳細</h3>
      <div>タイトル: {task.title}</div>
      <button onClick={onClose}>閉じる</button>
    </div>
  );
};

export default TaskDetailModal;
