import React from 'react';
import type { UserEditFormProps } from '../types';

const UserEditForm: React.FC<UserEditFormProps> = ({ user, onSubmit, onCancel }) => {
  // TODO: 編集フォームUI
  return (
    <form>
      <button type="button" onClick={onCancel}>キャンセル</button>
      <button type="button" onClick={() => onSubmit(user!)}>保存</button>
    </form>
  );
};

export default UserEditForm;
