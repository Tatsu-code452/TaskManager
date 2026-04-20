import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { usePointerDrag } from '../../hooks/handler/usePointerDrag';

describe('usePointerDrag', () => {
  type TestData = { value: string };

  it('フックが関数として定義されている', () => {
    expect(typeof usePointerDrag).toBe('function');
  });

  it('onPointerDownでstateがdragging/dataになる', () => {
    const { result } = renderHook(() => usePointerDrag<TestData>());
    const e = { target: { setPointerCapture: vi.fn() }, pointerId: 1, clientX: 10, clientY: 20 } as any;
    act(() => {
      result.current.onPointerDown({ value: 'foo' }, e);
    });
    // stateはrefなので直接アクセス不可、onPointerMoveで副作用を確認
    const handler = vi.fn();
    act(() => {
      result.current.onPointerMove(handler, e);
    });
    expect(handler).toHaveBeenCalledWith({ value: 'foo' }, e);
  });

  it('onPointerUpでstateがリセットされる', () => {
    const { result } = renderHook(() => usePointerDrag<TestData>());
    const e = { target: { setPointerCapture: vi.fn(), releasePointerCapture: vi.fn() }, pointerId: 1, clientX: 10, clientY: 20 } as any;
    act(() => {
      result.current.onPointerDown({ value: 'bar' }, e);
    });
    const handler = vi.fn();
    act(() => {
      result.current.onPointerUp(handler, e);
    });
    expect(handler).toHaveBeenCalledWith({ value: 'bar' }, e);
    // 再度onPointerMoveしても呼ばれない
    handler.mockClear();
    act(() => {
      result.current.onPointerMove(handler, e);
    });
    expect(handler).not.toHaveBeenCalled();
  });
});
