import React from 'react';
import type { TaskListProps } from '../types';

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onDetail }) => (
  <table>
    <thead>
      <tr>
        <th>タイトル</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      {tasks.map(task => (
        <tr key={task.id}>
          <td>{task.title}</td>
          <td>
            <button onClick={() => onEdit(task.id)}>編集</button>
            <button onClick={() => onDelete(task.id)}>削除</button>
            <button onClick={() => onDetail(task.id)}>詳細</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TaskList;
