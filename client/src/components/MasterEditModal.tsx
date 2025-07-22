import React from 'react';
import type { MasterEditFormProps } from '../types';

const MasterEditModal: React.FC<MasterEditFormProps & { open: boolean; onClose: () => void }> = ({ item, type, onSubmit, onCancel, open, onClose }) => {
  if (!open) return null;
  return (
    <div className="modal">
      <h3>マスタ編集</h3>
      {/* 編集フォームUI */}
      <button onClick={onClose}>閉じる</button>
    </div>
  );
};

export default MasterEditModal;
