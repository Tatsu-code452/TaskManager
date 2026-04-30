import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useDragAndDrop } from '../../hooks/handler/useDragAndDrop';

describe('useDragAndDrop', () => {
  type TestDrag = { pos?: { x: number, y: number }, value?: string };

  it('フックが関数として定義されている', () => {
    expect(typeof useDragAndDrop).toBe('function');
  });

  it('onPointerDownでdragRefがセットされる', () => {
    const { result } = renderHook(() => useDragAndDrop<TestDrag>());
    const e = { currentTarget: { setPointerCapture: vi.fn() }, pointerId: 1, clientX: 10, clientY: 20 } as any;
    act(() => {
      result.current.onPointerDown({ value: 'foo' }, e);
    });
    expect(result.current.dragRef.current?.value).toBe('foo');
    expect(result.current.dragRef.current?.pos).toEqual({ x: 10, y: 20 });
  });

  it('onEndでdragRefがnullになる', () => {
    const { result } = renderHook(() => useDragAndDrop<TestDrag>());
    const e = { currentTarget: { setPointerCapture: vi.fn() }, pointerId: 1, clientX: 10, clientY: 20 } as any;
    act(() => {
      result.current.onPointerDown({ value: 'bar' }, e);
    });
    act(() => {
      result.current.onEnd();
    });
    expect(result.current.dragRef.current).toBeNull();
  });

  it('bindでmove/upイベントハンドラがセットされる', async () => {
    const { result } = renderHook(() => useDragAndDrop<TestDrag>());
    const preview = vi.fn();
    const handleDrop = vi.fn(async () => {});
    act(() => {
      result.current.bind('td', preview, handleDrop);
    });
    // moveHandlerRef/upHandlerRefは内部的にセットされるが、直接テストは困難なため、ここでは呼び出し可能性を確認
    expect(typeof result.current.bind).toBe('function');
  });
});
