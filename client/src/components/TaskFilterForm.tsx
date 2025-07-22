import React from 'react';
import type { TaskFilterFormProps } from '../types';

const TaskFilterForm: React.FC<TaskFilterFormProps> = ({ filters, onChange }) => {
  // TODO: フィルター項目のUI
  return (
    <form>
      {/* フィルター項目をここに配置 */}
      <button type="button" onClick={() => onChange(filters)}>検索</button>
    </form>
  );
};

export default TaskFilterForm;
