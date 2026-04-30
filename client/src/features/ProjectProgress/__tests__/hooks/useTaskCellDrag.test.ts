import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useTaskCellDrag } from '../../hooks/handler/useTaskCellDrag';

vi.mock('../../../../api/tauri/taskApi', () => ({ taskApi: { update: vi.fn() } }));
vi.mock('../../../../api/tauri/taskPlanCellApi', () => ({ taskPlanCellApi: { update: vi.fn() } }));
vi.mock('../../../../api/tauri/taskActualCellApi', () => ({ taskActualCellApi: { update: vi.fn() } }));
vi.mock('../../../ProjectProgress/domain/service/regenerateCells', () => ({ regenerateCells: vi.fn() }));

describe('useTaskCellDrag', () => {
  const projectId = 'p1';
  const pageState = {
    tasks: [
      {
        id: 't1', plan: { start: '2024-01-01', end: '2024-01-10', totalHours: 10 }, actual: { start: '2024-01-01', end: '2024-01-10', totalHours: 10 }
      }
    ]
  };
  const loadTasks = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('フックが関数として定義されている', () => {
    expect(typeof useTaskCellDrag).toBe('function');
  });

  it('onDragMove: planCell/actualCellでAPIが呼ばれる', async () => {
    const { result } = renderHook(() => useTaskCellDrag(projectId, pageState, loadTasks));
    const { taskApi } = await import('../../../../api/tauri/taskApi');
    const { regenerateCells } = await import('../../../ProjectProgress/domain/service/regenerateCells');
    // planCell
    await act(async () => {
      await result.current.onDragMove({ taskId: 't1', fromDate: '2024-01-01', toDate: '2024-01-03', type: 'planCell' });
    });
    expect(taskApi.update).toHaveBeenCalled();
    expect(regenerateCells).toHaveBeenCalled();
    // actualCell
    await act(async () => {
      await result.current.onDragMove({ taskId: 't1', fromDate: '2024-01-01', toDate: '2024-01-03', type: 'actualCell' });
    });
    expect(taskApi.update).toHaveBeenCalled();
    expect(regenerateCells).toHaveBeenCalled();
  });

  it('onDragResize: planCell/actualCellでAPIが呼ばれる', async () => {
    const { result } = renderHook(() => useTaskCellDrag(projectId, pageState, loadTasks));
    const { taskApi } = await import('../../../../api/tauri/taskApi');
    const { regenerateCells } = await import('../../../ProjectProgress/domain/service/regenerateCells');
    // planCell
    await act(async () => {
      await result.current.onDragResize({ taskId: 't1', toDate: '2024-01-05', type: 'planCell', edge: 'start' });
    });
    expect(taskApi.update).toHaveBeenCalled();
    expect(regenerateCells).toHaveBeenCalled();
    // actualCell
    await act(async () => {
      await result.current.onDragResize({ taskId: 't1', toDate: '2024-01-05', type: 'actualCell', edge: 'end' });
    });
    expect(taskApi.update).toHaveBeenCalled();
    expect(regenerateCells).toHaveBeenCalled();
  });
});
