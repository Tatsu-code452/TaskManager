import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useProjectProgressController } from '../../hooks/controller/useProjectProgressController';

// API モック
vi.mock('../../../../api/tauri/taskPlanCellApi', () => ({ taskPlanCellApi: { update: vi.fn() } }));
vi.mock('../../../../api/tauri/taskActualCellApi', () => ({ taskActualCellApi: { update: vi.fn() } }));
vi.mock('../../../../api/tauri/taskApi', () => ({ taskApi: { update: vi.fn() } }));
vi.mock('../../domain/repository/taskRepository', () => ({
  fetchTaskModelList: vi.fn(() => Promise.resolve([])),
}));

describe('useProjectProgressController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('フックが関数として定義されている', () => {
    expect(typeof useProjectProgressController).toBe('function');
  });

  it('初期化で必要なプロパティを返す', () => {
    const { result } = renderHook(() => useProjectProgressController('p1'));

    expect(result.current).toHaveProperty('pageState');
    expect(result.current).toHaveProperty('dates');
    expect(result.current).toHaveProperty('pageStateDispatch');
    expect(result.current).toHaveProperty('editDispatch');
    expect(result.current).toHaveProperty('collapseDispatch');
    expect(result.current).toHaveProperty('selectors');
    expect(result.current).toHaveProperty('loadTasks');
  });

  it('dates: 日付レンジが正しく生成される', () => {
    const { result } = renderHook(() => useProjectProgressController('p1'));

    expect(Array.isArray(result.current.dates)).toBe(true);
    expect(result.current.dates.length).toBeGreaterThan(0);
    expect(result.current.dates[0]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('loadTasks が fetchTaskModelList を呼ぶ', async () => {
    const { result } = renderHook(() => useProjectProgressController('p1'));
    const { fetchTaskModelList } = await import('../../domain/repository/taskRepository');

    await act(async () => {
      await result.current.loadTasks();
    });

    expect(fetchTaskModelList).toHaveBeenCalledWith('p1');
  });
});
