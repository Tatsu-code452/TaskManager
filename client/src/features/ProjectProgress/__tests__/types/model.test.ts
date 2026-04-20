import { describe, expect, it } from 'vitest';
import { TaskPlanRow } from '../../../../types/db/taskPlan';
import { toMap } from '../../types/model';

describe('model', () => {
  it('toMap: 配列をマップに変換できる', () => {
    const rows: TaskPlanRow[] = [
      { task_id: 't1', date: '2024-01-01', hours: 5 },
      { task_id: 't2', date: '2024-01-02', hours: 3 },
    ];
    const result = toMap(rows);
    expect(result['2024-01-01']).toBe(5);
    expect(result['2024-01-02']).toBe(3);
  });
});
