import React from 'react';
import type { UserListProps } from '../types';

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => (
  <table>
    <thead>
      <tr>
        <th>氏名</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>
            <button onClick={() => onEdit(user.id)}>編集</button>
            <button onClick={() => onDelete(user.id)}>削除</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserList;
