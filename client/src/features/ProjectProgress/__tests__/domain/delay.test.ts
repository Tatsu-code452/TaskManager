import { describe, expect, it } from 'vitest';
import { getDelayStatus, isCellDelayed, isEndDelayed, isStartDelayed, isWorkloadDelayed } from '../../domain/service/delay';
import { TaskModel } from '../../types/model';

describe('delay', () => {
  const baseTask: TaskModel = {
    id: '1',
    phase: 'p1',
    name: 'n',
    status: undefined as any,
    plan: { start: '2024-01-01', end: '2024-01-10', totalHours: 10, progress: 0, cells: {} },
    actual: { start: '2024-01-02', end: '2024-01-11', totalHours: 12, progress: 0, cells: {} },
  };

  it('isCellDelayed: 実績のみ存在でtrue', () => {
    const task: TaskModel = { ...baseTask, plan: { ...baseTask.plan, cells: {} }, actual: { ...baseTask.actual, cells: { '2024-01-02': 1 } } };
    expect(isCellDelayed(task, '2024-01-02')).toBe(true);
  });

  it('isStartDelayed: 実績開始が遅い場合true', () => {
    expect(isStartDelayed(baseTask)).toBe(true);
  });

  it('isWorkloadDelayed: 実績工数が多い場合true', () => {
    expect(isWorkloadDelayed(baseTask)).toBe(true);
  });

  it('isEndDelayed: 実績終了が遅い場合true', () => {
    expect(isEndDelayed(baseTask)).toBe(true);
  });

  it('getDelayStatus: 遅延情報を返す', () => {
    const status = getDelayStatus(baseTask);
    expect(status.startDelayed).toBe(true);
    expect(status.workloadDelayed).toBe(true);
    expect(status.endDelayed).toBe(true);
  });
});
