import React from 'react';
import type { AlarmDetailModalProps } from '../types';

const AlarmDetailModal: React.FC<AlarmDetailModalProps> = ({ alarm, open, onClose }) => {
  if (!open || !alarm) return null;
  return (
    <div className="modal">
      <h3>アラーム詳細</h3>
      <div>タイトル: {alarm.title}</div>
      <button onClick={onClose}>閉じる</button>
    </div>
  );
};

export default AlarmDetailModal;
