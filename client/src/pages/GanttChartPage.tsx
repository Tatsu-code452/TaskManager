import React, { useState } from 'react';
import GanttFilter from '../components/GanttFilter';
import GanttChart from '../components/GanttChart';
import { Task } from '../types';

const GanttChartPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  // TODO: API連携

  const handleTaskDateChange = (taskId: number, start: Date, end: Date) => {
    // TODO: 期間変更処理
  };

  const handleTaskSelect = (taskId: number) => {
    // TODO: 選択処理
  };

  return (
    <div>
      <h2>ガントチャート</h2>
      <GanttFilter />
      <GanttChart tasks={tasks} onTaskDateChange={handleTaskDateChange} onTaskSelect={handleTaskSelect} />
    </div>
  );
};

export default GanttChartPage;
