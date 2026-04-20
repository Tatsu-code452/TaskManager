import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useTooltip } from '../../hooks/handler/useTooltip';

describe('useTooltip', () => {
  it('フックが関数として定義されている', () => {
    expect(typeof useTooltip).toBe('function');
  });

  it('previewでtooltipが表示状態になる', () => {
    const { result } = renderHook(() => useTooltip());
    // elementFromPointをモック
    global.document.elementFromPoint = vi.fn(() => ({ closest: () => ({ dataset: { date: '2024-01-01' } }) }));
    const drag = { date: '2024-01-01', mode: 'move', x: 0, y: 0 };
    const e = { clientX: 10, clientY: 20 } as any;
    act(() => {
      result.current.preview(drag, e);
    });
    expect(result.current.state?.visible).toBe(true);
    expect(result.current.state?.from).toBe('2024-01-01');
  });

  it('hideでtooltip.visibleがfalseになる', () => {
    const { result } = renderHook(() => useTooltip());

    // elementFromPoint をモック
    global.document.elementFromPoint = vi.fn(() => ({
      closest: () => ({ dataset: { date: '2024-01-01' } })
    }));

    const drag = { startDate: '2024-01-01', mode: 'move', x: 0, y: 0 };
    const e = { clientX: 10, clientY: 20 } as any;

    // まず preview で visible: true にする
    act(() => {
      result.current.preview(drag, e);
    });

    expect(result.current.state.visible).toBe(true);

    // hide を呼ぶ
    act(() => {
      result.current.hide();
    });

    expect(result.current.state.visible).toBe(false);
  });
});
