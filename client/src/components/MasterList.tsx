import React from 'react';
import type { MasterListProps } from '../types';

const MasterList: React.FC<MasterListProps> = ({ items, type, onEdit, onDelete }) => (
  <table>
    <thead>
      <tr>
        <th>項目名</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      {items.map(item => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>
            <button onClick={() => onEdit(item.id)}>編集</button>
            <button onClick={() => onDelete(item.id)}>削除</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default MasterList;
