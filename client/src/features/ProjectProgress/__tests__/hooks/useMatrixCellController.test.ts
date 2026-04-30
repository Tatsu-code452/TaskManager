import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useMatrixCellController } from '../../hooks/controller/useMatrixCellController';
import { EditTarget } from '../../types/types';

vi.mock('../../../../api/tauri/taskPlanCellApi', () => ({ taskPlanCellApi: { update: vi.fn(), delete: vi.fn() } }));
vi.mock('../../../../api/tauri/taskActualCellApi', () => ({ taskActualCellApi: { update: vi.fn(), delete: vi.fn() } }));

describe('useMatrixCellController', () => {
  let dispatch;
  const editTarget: EditTarget = null;
  const taskOrder: string[] = [];
  const dateList: string[] = [];

  beforeEach(() => {
    dispatch = {
      init: vi.fn(),
      setTasks: vi.fn(),
      setFrom: vi.fn(),
      setTo: vi.fn(),
      setBaseDate: vi.fn(),
      startEdit: vi.fn(),
      endEdit: vi.fn(),
    };
    vi.clearAllMocks();
  });

  it('フックが関数として定義されている', () => {
    expect(typeof useMatrixCellController).toBe('function');
  });

  it('初期化で必要なプロパティを返す', () => {
    const { result } = renderHook(() => useMatrixCellController(dispatch, editTarget, taskOrder, dateList));
    expect(result.current).toHaveProperty('onStartEdit');
    expect(result.current).toHaveProperty('onCancelEdit');
    expect(result.current).toHaveProperty('onCommit');
  });

  it('onStartEdit: dispatch.startEditが呼ばれる', () => {
    const { result } = renderHook(() => useMatrixCellController(dispatch, editTarget, taskOrder, dateList));
    const params = { taskId: 't1', date: '2024-01-01', isPlan: true };
    act(() => {
      result.current.onStartEdit(params);
    });
    expect(dispatch.startEdit).toHaveBeenCalled();
  });

  it('onCancelEdit: dispatch.endEditが呼ばれる', () => {
    const { result } = renderHook(() => useMatrixCellController(dispatch, editTarget, taskOrder, dateList));
    act(() => {
      result.current.onCancelEdit();
    });
    expect(dispatch.endEdit).toHaveBeenCalled();
  });

  it('onCommit: planCellでupdate, deleteが呼ばれる', async () => {
    const { result } = renderHook(() => useMatrixCellController(dispatch, editTarget, taskOrder, dateList));
    const { taskPlanCellApi } = await import('../../../../api/tauri/taskPlanCellApi');
    // update
    await act(async () => {
      await result.current.onCommit({ taskId: 't1', date: '2024-01-01', isPlan: true }, 10);
    });
    expect(taskPlanCellApi.update).toHaveBeenCalledWith('t1', '2024-01-01', 10);
    // delete
    await act(async () => {
      await result.current.onCommit({ taskId: 't1', date: '2024-01-01', isPlan: true }, null);
    });
    expect(taskPlanCellApi.delete).toHaveBeenCalledWith('t1', '2024-01-01');
  });

  it('onCommit: actualCellでupdate, deleteが呼ばれる', async () => {
    const { result } = renderHook(() => useMatrixCellController(dispatch, editTarget, taskOrder, dateList));
    const { taskActualCellApi } = await import('../../../../api/tauri/taskActualCellApi');
    // update
    await act(async () => {
      await result.current.onCommit({ taskId: 't2', date: '2024-01-02', isPlan: false }, 20);
    });
    expect(taskActualCellApi.update).toHaveBeenCalledWith('t2', '2024-01-02', 20);
    // delete
    await act(async () => {
      await result.current.onCommit({ taskId: 't2', date: '2024-01-02', isPlan: false }, null);
    });
    expect(taskActualCellApi.delete).toHaveBeenCalledWith('t2', '2024-01-02');
  });
});
