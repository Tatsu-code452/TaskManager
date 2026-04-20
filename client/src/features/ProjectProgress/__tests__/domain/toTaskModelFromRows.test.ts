import { describe, expect, it } from 'vitest';
import { TaskRow, TaskStatus } from '../../../../types/db/task';
import { TaskActualRow } from '../../../../types/db/taskActual';
import { TaskPlanRow } from '../../../../types/db/taskPlan';
import { toTaskModelFromRows } from '../../domain/model/toTaskModelFromRows';

describe('toTaskModelFromRows', () => {
  it('正常系: 正しいTaskModelを返す', () => {
    const task: TaskRow = {
      id: '1',
      project_id: 'p1',
      phase_id: 'phase1',
      name: 'タスク名',
      planned_start: '2024-01-01',
      planned_end: '2024-01-10',
      planned_hours: 10,
      actual_start: '2024-01-02',
      actual_end: '2024-01-11',
      actual_hours: 12,
      progress_rate: 50,
      status: TaskStatus.InProgress,
      timestamps: { created_at: '', updated_at: '' }
    };
    const planCells: TaskPlanRow[] = [{ task_id: '1', date: '2024-01-01', hours: 5 }];
    const actualCells: TaskActualRow[] = [{ task_id: '1', date: '2024-01-02', hours: 6 }];

    const result = toTaskModelFromRows(task, planCells, actualCells);
    expect(result).toBeDefined();
    expect(result.id).toBe('1');
    expect(result.plan.cells['2024-01-01']).toBe(5);
    expect(result.actual.cells['2024-01-02']).toBe(6);
  });
});
