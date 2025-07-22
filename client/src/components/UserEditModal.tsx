import React from 'react';
import type { UserEditFormProps } from '../types';

const UserEditModal: React.FC<UserEditFormProps & { open: boolean; onClose: () => void }> = ({ user, onSubmit, onCancel, open, onClose }) => {
  if (!open) return null;
  return (
    <div className="modal">
      <h3>ユーザ編集</h3>
      {/* 編集フォームUI */}
      <button onClick={onClose}>閉じる</button>
    </div>
  );
};

export default UserEditModal;
