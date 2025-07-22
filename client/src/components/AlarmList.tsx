import React from 'react';
import type { AlarmListProps } from '../types';

const AlarmList: React.FC<AlarmListProps> = ({ alarms, onDetail }) => (
  <table>
    <thead>
      <tr>
        <th>タイトル</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      {alarms.map(alarm => (
        <tr key={alarm.id}>
          <td>{alarm.title}</td>
          <td>
            <button onClick={() => onDetail(alarm.id)}>詳細</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default AlarmList;
