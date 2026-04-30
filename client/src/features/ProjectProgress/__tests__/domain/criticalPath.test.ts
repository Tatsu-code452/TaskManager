import { describe, expect, it } from 'vitest';
import { calcCriticalPath } from '../../domain/service/criticalPath';
import { TaskModel } from '../../types/model';

describe('calcCriticalPath', () => {
  it('タスク配列からクリティカルパスIDセットを返す', () => {
    const tasks: TaskModel[] = [
      { id: '1', phase: 'A', name: '', status: undefined as any, plan: { end: '2024-01-10', start: '', totalHours: 0, progress: 0, cells: {} }, actual: { end: '', start: '', totalHours: 0, progress: 0, cells: {} } },
      { id: '2', phase: 'A', name: '', status: undefined as any, plan: { end: '2024-01-15', start: '', totalHours: 0, progress: 0, cells: {} }, actual: { end: '', start: '', totalHours: 0, progress: 0, cells: {} } },
      { id: '3', phase: 'B', name: '', status: undefined as any, plan: { end: '2024-01-20', start: '', totalHours: 0, progress: 0, cells: {} }, actual: { end: '', start: '', totalHours: 0, progress: 0, cells: {} } },
    ];
    const result = calcCriticalPath(tasks);
    expect(result.has('2')).toBe(true);
    expect(result.has('3')).toBe(true);
    expect(result.has('1')).toBe(false);
  });
});
