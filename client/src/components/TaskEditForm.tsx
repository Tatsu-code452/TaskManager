import React from 'react';
import type { TaskEditFormProps } from '../types';

const TaskEditForm: React.FC<TaskEditFormProps> = ({ task, onSubmit, onCancel }) => {
  // TODO: 編集フォームUI
  return (
    <form>
      <button type="button" onClick={onCancel}>キャンセル</button>
      <button type="button" onClick={() => onSubmit(task!)}>保存</button>
    </form>
  );
};

export default TaskEditForm;
