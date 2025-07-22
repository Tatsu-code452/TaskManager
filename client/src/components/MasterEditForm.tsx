import React from 'react';
import type { MasterEditFormProps } from '../types';

const MasterEditForm: React.FC<MasterEditFormProps> = ({ item, type, onSubmit, onCancel }) => {
  // TODO: 編集フォームUI
  return (
    <form>
      <button type="button" onClick={onCancel}>キャンセル</button>
      <button type="button" onClick={() => onSubmit(item!)}>保存</button>
    </form>
  );
};

export default MasterEditForm;
